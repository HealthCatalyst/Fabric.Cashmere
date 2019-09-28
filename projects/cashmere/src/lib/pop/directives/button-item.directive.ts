import {Directive, HostBinding} from '@angular/core';

/** Use `hcButtonItem` for a secondary button menu item. */
@Directive({
    selector: '[hcButtonItem]'
})
export class ButtonItemDirective {
    @HostBinding('class.hc-menu-item')
    _hostClass = true;
}
