import {Directive, HostBinding} from '@angular/core';

/** `hcIconLg` - large size of hc-icon (36px) */
@Directive({
    selector: '[hcIconLg]',
    standalone: false
})
export class HcIconLargeDirective {
    @HostBinding('class.hc-icon-lg')
    _hostHcIconLargeClass = true;
}
