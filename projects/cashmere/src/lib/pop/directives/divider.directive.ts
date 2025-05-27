import {Directive, HostBinding} from '@angular/core';

/** Use `hcDivider` for a horizontal divider in a menu. */
@Directive({
    selector: '[hcDivider]',
    standalone: false
})
export class DividerDirective {
    @HostBinding('class.hc-divider')
    _hostClass = true;
}
