/* Copyright 2017 PSanetra <code@psanetra.de>

Open Source typescript decorator which binds class properties to observable companion properties.
https://github.com/PSanetra/bind-observable

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */

import {BindObservable} from './bind-observable';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

function WrappingDecorator(): PropertyDecorator {
    return (target: any, propertyName: string | symbol) => {
        const descriptor = Reflect.getOwnPropertyDescriptor(target, propertyName);

        delete target[propertyName];

        if (descriptor) {
            Object.defineProperty(target, propertyName, {
                configurable: descriptor.configurable,
                enumerable: descriptor.enumerable,
                get() {
                    if (descriptor.get) {
                        return `wrapGet(${descriptor.get.call(this)})`;
                    }
                },
                set(value) {
                    if (descriptor.set) {
                        descriptor.set.call(this, `wrapSet(${value})`);
                    }
                }
            });
        } else {
            Object.defineProperty(target, propertyName, {
                configurable: true,
                enumerable: true,
                get() {
                    return `wrapGet(${target['@WrappingDecorator.value']})`;
                },
                set(value) {
                    target['@WrappingDecorator.value'] = `wrapSet(${value})`;
                }
            });
        }
    };
}

describe('BindObservable', () => {
    it('lets observable emit on property assignment (simple property)', async () => {
        class TestClass {
            @BindObservable()
            public myProp: string | undefined;
            public myProp$!: Observable<string | undefined>;
        }

        const instance = new TestClass();

        instance.myProp = 'myValue';

        expect(await instance.myProp$.pipe(take(1)).toPromise()).toEqual('myValue');
    });

    // TODO: Fix excluded tests if possible
    // These tests run into a timeout because myProp$ does never emit
    // The class accessors seem to overwrite the accessors of @BindObservable again

    xit('lets observable emit getter value on property assignment (accessor property)', async () => {
        class TestClass {
            private _myProp: string | undefined = 'a';

            @BindObservable()
            public get myProp(): string | undefined {
                return `getter(${this._myProp})`;
            }

            public set myProp(value: string | undefined) {
                this._myProp = `setter(${value})`;
            }

            public myProp$!: Observable<string | undefined>;
        }

        const instance = new TestClass();

        instance.myProp = 'myValue';

        expect(await instance.myProp$.pipe(take(1)).toPromise()).toEqual('getter(setter(myValue))');
    });

    xit('lets observable emit raw setter value on property assignment if emitRawSetterValue is true (accessor property)', async () => {
        class TestClass {
            private _myProp: string | undefined;

            public get myProp(): string | undefined {
                return this._myProp;
            }

            @BindObservable({emitRawSetterValue: true})
            public set myProp(value: string | undefined) {
                this._myProp = `setter(${value})`;
            }

            public myProp$!: Observable<string | undefined>;
        }

        const instance = new TestClass();

        instance.myProp = 'myValue';

        expect(await instance.myProp$.pipe(take(1)).toPromise()).toEqual('myValue');
    });

    xit('lets observable emit raw setter value on property assignment if getter does not exist (accessor property)', async () => {
        class TestClass {
            private _myProp: string | undefined;

            @BindObservable()
            public set myProp(value: string | undefined) {
                this._myProp = `setter(${value})`;
            }

            public myProp$!: Observable<string | undefined>;
        }

        const instance = new TestClass();

        instance.myProp = 'myValue';

        expect(await instance.myProp$.pipe(take(1)).toPromise()).toEqual('myValue');
    });

    it('lets observable emit value on property assignment if the property has another decorator BEFORE @BindObservable', async () => {
        class TestClass {
            @WrappingDecorator()
            @BindObservable()
            public myProp: string | undefined;
            public myProp$!: Observable<string | undefined>;
        }

        const instance = new TestClass();

        instance.myProp = 'myValue';

        expect(await instance.myProp$.pipe(take(1)).toPromise()).toEqual('wrapSet(myValue)');
    });

    it(`lets observable emit getter value on property assignment if the property has another
        decorator AFTER @BindObservable(emitRawSetterValue: false (default))`, async () => {
        class TestClass {
            @BindObservable()
            @WrappingDecorator()
            public myProp: string | undefined;
            public myProp$!: Observable<string | undefined>;
        }

        const instance = new TestClass();

        instance.myProp = 'myValue';

        expect(await instance.myProp$.pipe(take(1)).toPromise()).toEqual('wrapGet(wrapSet(myValue))');
    });

    it(`lets observable emit raw setter value on property assignment if the property has another
        decorator AFTER @BindObservable(emitRawSetterValue: true)`, async () => {
        class TestClass {
            @BindObservable({emitRawSetterValue: true})
            @WrappingDecorator()
            public myProp: string | undefined;
            public myProp$!: Observable<string | undefined>;
        }

        const instance = new TestClass();

        instance.myProp = 'myValue';

        expect(await instance.myProp$.pipe(take(1)).toPromise()).toEqual('myValue');
    });

    it('supports custom observable name', async () => {
        class TestClass {
            @BindObservable('myObservable$')
            public myProp: string | undefined;
            public myObservable$!: Observable<string | undefined>;
        }

        const instance = new TestClass();

        instance.myProp = 'myValue';

        expect(await instance.myObservable$.pipe(take(1)).toPromise()).toEqual('myValue');
    });

    it('supports property initializer', async () => {
        class TestClass {
            @BindObservable()
            public myProp = 'myValue';
            public myProp$!: Observable<string>;
        }

        const instance = new TestClass();

        expect(await instance.myProp$.pipe(take(1)).toPromise()).toEqual('myValue');
    });

    it('replays only latest value', async () => {
        class TestClass {
            @BindObservable()
            public myProp = 'myValue';
            public myProp$!: Observable<string>;
        }

        const instance = new TestClass();

        instance.myProp = 'newValue';

        expect(await instance.myProp$.pipe(take(1)).toPromise()).toEqual('newValue');
    });

    it('property value still gettable (simple property)', async () => {
        class TestClass {
            @BindObservable()
            public myProp = 'myValue';
            public myProp$!: Observable<string>;
        }

        const instance = new TestClass();

        expect(instance.myProp).toEqual('myValue');
    });

    it('property value still gettable (accessor property)', async () => {
        class TestClass {
            private _myProp: string | undefined;

            public get myProp(): string | undefined {
                return `getter(${this._myProp})`;
            }

            @BindObservable()
            public set myProp(value: string | undefined) {
                this._myProp = `setter(${value})`;
            }

            public myProp$!: Observable<string | undefined>;
        }

        const instance = new TestClass();
        instance.myProp = 'myValue';

        expect(instance.myProp).toEqual('getter(setter(myValue))');
    });

    it('property value still gettable (with another decorator BEFORE @BindObservable)', async () => {
        class TestClass {
            @WrappingDecorator()
            @BindObservable()
            public myProp = 'myValue';
            public myProp$!: Observable<string>;
        }

        const instance = new TestClass();

        expect(instance.myProp).toEqual('wrapGet(wrapSet(myValue))');
    });

    it('property value still gettable (with another decorator AFTER @BindObservable)', async () => {
        class TestClass {
            @BindObservable()
            @WrappingDecorator()
            public myProp = 'myValue';
            public myProp$!: Observable<string>;
        }

        const instance = new TestClass();

        expect(instance.myProp).toEqual('wrapGet(wrapSet(myValue))');
    });
});
