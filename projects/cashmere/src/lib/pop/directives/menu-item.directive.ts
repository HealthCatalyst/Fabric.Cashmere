import {Directive, HostBinding} from '@angular/core';

/** Use `hcMenuItem` for a selectable item in an hcMenu. */
@Directive({
    selector: '[hcMenuItem], [hcButtonItem]'
})
export class MenuItemDirective {
    @HostBinding('class.hc-menu-item')
    _hostClass = true;
}
