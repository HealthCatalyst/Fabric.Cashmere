import {Directive, HostBinding} from '@angular/core';

/** Prefixes an icon to the beginning of a `<hc-list-item>`. */
@Directive({
    selector: '[hcListIcon]'
})
export class ListIconDirective {
    @HostBinding('class.hc-list-icon')
    _hostClass = true;
}
