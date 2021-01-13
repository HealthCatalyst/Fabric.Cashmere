import {Directive, HostBinding} from '@angular/core';

/** Use `hcMenuIcon` to prefix an icon to the beginning of a button inside of a menu. */
@Directive({
    selector: '[hcMenuIcon]'
})
export class MenuIconDirective {
    @HostBinding('class.hc-menu-icon')
    _hostClass = true;
}
