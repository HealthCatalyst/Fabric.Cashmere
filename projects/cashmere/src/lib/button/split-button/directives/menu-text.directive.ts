import {Directive, HostBinding} from '@angular/core';

/** Applies class to properly style main button text inside of an split button menu. */
@Directive({
    selector: '[hcMenuText]'
})
export class MenuTextDirective {
    @HostBinding('class.hc-menu-text') _hostClass = true;
}