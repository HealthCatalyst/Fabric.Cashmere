import {PipeTransform, Pipe, Inject} from '@angular/core';
import {ChangeCaseLib, CHANGE_CASE} from './change-case-lib';

@Pipe({name: 'changeCase', pure: true})
export class ChangeCasePipe implements PipeTransform {
    constructor(@Inject(CHANGE_CASE) private changeCase: ChangeCaseLib) {}

    transform(value: any, caseFnName: string): string {
        // coerce input to a string
        value = (value === null || value === undefined ? '' : value).toString();
        // retrieve the case transform function from the change-case library
        const caseFn: Function = (this.changeCase as any)[caseFnName];
        if (typeof caseFn !== 'function') {
            throw new Error(
                `Invalid case function: ${caseFnName}. This pipe only supports function names from the change-case NPM package.`
            );
        }

        return caseFn(value);
    }
}
