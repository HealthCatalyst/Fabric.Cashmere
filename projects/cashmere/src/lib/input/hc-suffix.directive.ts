import {Directive, HostBinding} from '@angular/core';

/** Position an element at the end of HcFormFieldComponent */
@Directive({
    selector: '[hcSuffix]'
})
export class HcSuffixDirective {
    @HostBinding('class.hc-suffix') _hostHcSuffixClass = true;
}
