/* tslint:disable:directive-selector */

import {Directive, Input} from '@angular/core';

/** Utility directive to hold objects used in ngValue */
@Directive({
    selector: 'option[ngValue]'
})
export class HcOptionDirective {
    /** Stores the content of ngValue, including objects */
    @Input()
    ngValue: any;
}
