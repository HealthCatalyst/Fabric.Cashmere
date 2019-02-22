/* Copyright 2017 PSanetra <code@psanetra.de>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */

import {ReplaySubject} from 'rxjs';
import {BindObservableOpts, isBindObservableOpts} from './bind-observable-options';

type SubjectByProp = Map<string, ReplaySubject<any>>;

const subjects: WeakMap<Object, SubjectByProp> = new WeakMap();

type ValueByProp = Map<string, any>;

const values: WeakMap<Object, ValueByProp> = new WeakMap();

function subject(instance: any, key: string): ReplaySubject<any> {
    let subjectByProp = subjects.get(instance);

    if (!subjectByProp) {
        subjectByProp = new Map<string, ReplaySubject<any>>();
        subjects.set(instance, subjectByProp);
    }

    let _subject = subjectByProp.get(key);

    if (!_subject) {
        _subject = new ReplaySubject<any>(1);
        subjectByProp.set(key, _subject);
    }

    return _subject;
}

function valueMap(instance: any): ValueByProp {
    let _valueMap = values.get(instance);

    if (!_valueMap) {
        _valueMap = new Map<string, any>();
        values.set(instance, _valueMap);
    }

    return _valueMap;
}

function defineObservableProperty(target: Object, observableKey: string): void {
    Object.defineProperty(target, observableKey, {
        configurable: true,
        enumerable: false,
        get() {
            return subject(this, observableKey);
        }
    });
}

function redefineSimpleProperty(target: any, propertyKey: string, observableKey: string): void {
    Object.defineProperty(target, propertyKey, {
        configurable: true,
        enumerable: true,
        set(value) {
            valueMap(this).set(propertyKey, value);
            subject(this, observableKey).next(value);
        },
        get() {
            return valueMap(this).get(propertyKey);
        }
    });
}

function redefineAccessorProperty(
    target: Object,
    propertyKey: string,
    observableKey: string,
    emitRawSetterValue: boolean,
    descriptor: PropertyDescriptor
): void {
    Object.defineProperty(target, propertyKey, {
        configurable: descriptor.configurable,
        enumerable: descriptor.enumerable,
        set(value) {
            if (!descriptor.set) {
                throw new Error(`Property ${propertyKey} doesn't have a setter and cannot be written`);
            }

            descriptor.set.call(this, value);

            const companionProp = subject(this, observableKey);

            if (emitRawSetterValue || !descriptor.get) {
                companionProp.next(value);
            } else {
                companionProp.next(descriptor.get());
            }
        },
        get(): any {
            if (!descriptor.get) {
                throw new Error(`Property ${propertyKey} doesn't have a getter and cannot be read`);
            }

            return descriptor.get.call(this);
        }
    });
}

/**
 * Binds a property to an observable companion property.
 * The observable companion property will emit on all assignments (including initialization),
 * but will not emit undefined if undefined is not explicitly assigned on initialization.
 */
export function BindObservable(observableKeyOrOpts?: string | BindObservableOpts) {
    return (target: any, propertyKey: string) => {
        const opts: BindObservableOpts = isBindObservableOpts(observableKeyOrOpts) ? observableKeyOrOpts : {};

        if (typeof observableKeyOrOpts === 'string') {
            opts.key = observableKeyOrOpts;
        }

        const observableKey: string = opts.key || propertyKey + '$';

        // The third parameter of this function (descriptor) is passed only if the decorated property
        // is an accessor, but it won't be passed if another decorator has replaced the descriptor.
        // See Property Decorators at https://www.typescriptlang.org/docs/handbook/decorators.html
        // Because of this, we are forced to retrieve the current descriptor with Reflection API
        const descriptor = Reflect.getOwnPropertyDescriptor(target, propertyKey);

        delete target[propertyKey];
        delete target[observableKey];

        defineObservableProperty(target, observableKey);

        if (descriptor !== undefined) {
            redefineAccessorProperty(target, propertyKey, observableKey, !!opts.emitRawSetterValue, descriptor);
        } else {
            redefineSimpleProperty(target, propertyKey, observableKey);
        }
    };
}
