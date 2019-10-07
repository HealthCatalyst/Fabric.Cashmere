import {Directive, HostBinding} from '@angular/core';

/** Use `hcMenuSubText` for right-aligned subtext of a button inside of a menu. Often used for keyboard shortcuts. */
@Directive({
    selector: '[hcMenuSubText]'
})
export class MenuSubTextDirective {
    @HostBinding('class.hc-menu-sub-text')
    _hostClass = true;
}
