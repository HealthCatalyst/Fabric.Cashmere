import {Directive, HostBinding} from '@angular/core';

/** Styles subtext for a button inside of an split button menu. */
@Directive({
    selector: '[hcMenuSubText]'
})
export class MenuSubTextDirective {
    @HostBinding('class.hc-menu-sub-text') _hostClass = true;
}