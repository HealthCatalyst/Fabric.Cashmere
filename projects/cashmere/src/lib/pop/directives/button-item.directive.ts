import {Directive, HostBinding} from '@angular/core';

/** Secondary button menu item */
@Directive({
    selector: '[hcButtonItem]'
})
export class ButtonItemDirective {
    @HostBinding('class.hc-menu-item')
    _hostClass = true;
}
