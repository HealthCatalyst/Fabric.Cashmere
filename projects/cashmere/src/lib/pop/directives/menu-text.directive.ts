import {Directive, HostBinding} from '@angular/core';

/** Use `hcMenuText` for main button text inside of a menu. */
@Directive({
    selector: '[hcMenuText]'
})
export class MenuTextDirective {
    @HostBinding('class.hc-menu-text')
    _hostClass = true;
}
