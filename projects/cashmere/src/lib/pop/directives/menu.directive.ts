import {Directive, HostBinding} from '@angular/core';

/** The `hcMenu` directive provides a standard way of displaying a series of selectable elements in a popover. */
@Directive({
    selector: '[hcMenu]'
})
export class MenuDirective {
    @HostBinding('class.hc-menu-panel')
    _hostClass = true;
}
