import {Directive, HostBinding} from '@angular/core';

/** Prefixes an icon to the beginning of a button inside of an split button menu. */
@Directive({
    selector: '[hcMenuIcon]'
})
export class MenuIconDirective {
    @HostBinding('class.hc-menu-icon')
    _hostClass = true;
}
