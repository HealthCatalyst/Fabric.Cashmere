import {Directive, HostBinding} from '@angular/core';

/** Prefixes an icon to the beginning of a button inside of an split button menu. */
@Directive({
    selector: '[hcDivider]'
})
export class DividerDirective {
    @HostBinding('class.hc-divider') _hostClass = true;
}