import {Directive, HostBinding} from '@angular/core';

/** `hcIconSm` - small size of hc-icon (14px) */
@Directive({
    selector: '[hcIconSm]',
    standalone: false
})
export class HcIconSmallDirective {
    @HostBinding('class.hc-icon-sm')
    _hostHcIconSmallClass = true;
}
