import {PipeTransform, Pipe } from '@angular/core';
import * as changeCase from 'change-case';

@Pipe({name: 'changeCase', pure: true})
export class ChangeCasePipe implements PipeTransform {
    transform(value: string, caseFnName: string): string {
        // coerce input to a string
        value = (value === null || value === undefined ? '' : value).toString();
        // retrieve the case transform function from the change-case library
        const caseFn = changeCase[caseFnName];
        if (typeof caseFn !== 'function') {
            throw new Error(
                `Invalid case function: ${caseFnName}. This pipe only supports function names from the change-case NPM package.`
            );
        }

        return caseFn(value);
    }
}
