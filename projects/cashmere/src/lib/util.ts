import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

/** Parse a given input into a boolean. */
export function parseBooleanAttribute(value: boolean | string): boolean {
    if (value === null || value === undefined) {
        return false;
    }
    if (typeof value === 'boolean') {
        return value;
    }
    if (value.toLowerCase() === 'false') {
        return false;
    }
    if (value.toLowerCase() === 'true' || value === '') {
        return true;
    }
    throw Error(String(value) + ' is not a boolean value');
}

/** Accepts a string, return that string with HTML tag escaped. */
const helperEl = document.createElement('p');
export function escapeHTML(string: string): string {
    helperEl.innerText = string; // Setting inner text causes escaping
    return helperEl.innerHTML;
}

/** Return true if given value is not null and not undefined. */
export function isDefined(value: unknown): boolean {
    return value !== undefined && value !== null;
}

/** Return true if given value is an object that is defined. */
export function isObject(value: unknown): boolean {
    return typeof value === 'object' && isDefined(value);
}

/** Return true if given value is a promise. */
export function isPromise(value: unknown): boolean {
    return value instanceof Promise;
}

/** Return true if given value is a function. */
export function isFunction(value: unknown): boolean {
    return value instanceof Function;
}

/* Open Source `take-until-destroy` operator from: https://github.com/NetanelBasal/ngx-take-until-destroy */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const untilDestroyed = (componentInstance, destroyMethodName = 'ngOnDestroy') => <T>(source: Observable<T>) => {
    const originalDestroy = componentInstance[destroyMethodName];
    if (isFunction(originalDestroy) === false) {
        throw new Error(`${componentInstance.constructor.name} is using untilDestroyed but doesn't implement ${destroyMethodName}`);
    }
    if (!componentInstance['__takeUntilDestroy']) {
        componentInstance['__takeUntilDestroy'] = new Subject();

        componentInstance[destroyMethodName] = function () {
            // eslint-disable-next-line prefer-rest-params
            isFunction(originalDestroy) && originalDestroy.apply(this, arguments);
            componentInstance['__takeUntilDestroy'].next(true);
            componentInstance['__takeUntilDestroy'].complete();
        };
    }
    return source.pipe(takeUntil<T>(componentInstance['__takeUntilDestroy']));
};
