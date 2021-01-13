import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

export function parseBooleanAttribute(value: boolean | string): boolean {
    if(value === null || value === undefined){
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

/* Open Source `take-until-destroy` operator from: https://github.com/NetanelBasal/ngx-take-until-destroy */

function isFunction(value) {
    return typeof value === 'function';
}

export const untilDestroyed = (componentInstance, destroyMethodName = 'ngOnDestroy') => <T>(source: Observable<T>) => {
    const originalDestroy = componentInstance[destroyMethodName];
    if (isFunction(originalDestroy) === false) {
        throw new Error(`${componentInstance.constructor.name} is using untilDestroyed but doesn't implement ${destroyMethodName}`);
    }
    if (!componentInstance['__takeUntilDestroy']) {
        componentInstance['__takeUntilDestroy'] = new Subject();

        componentInstance[destroyMethodName] = function() {
            isFunction(originalDestroy) && originalDestroy.apply(this, arguments);
            componentInstance['__takeUntilDestroy'].next(true);
            componentInstance['__takeUntilDestroy'].complete();
        };
    }
    return source.pipe(takeUntil<T>(componentInstance['__takeUntilDestroy']));
};
