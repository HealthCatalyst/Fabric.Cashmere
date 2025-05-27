import {Directive, HostBinding} from '@angular/core';

/** Position an element at the front of HcFormFieldComponent */
@Directive({
    selector: '[hcPrefix]',
    standalone: false
})
export class HcPrefixDirective {
    @HostBinding('class.hc-prefix')
    _hostHcPrefixClass = true;
}
