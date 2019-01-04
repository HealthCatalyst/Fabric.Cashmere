import {Directive, HostBinding} from '@angular/core';

/** Position an element at the front of HcFormFieldComponent */
@Directive({
    selector: '[hcPrefix]'
})
export class HcPrefixDirective {
    @HostBinding('class.hc-prefix')
    _hostHcPrefixClass = true;
}
