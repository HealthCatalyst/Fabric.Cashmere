import {Directive, HostBinding} from '@angular/core';

/** Adds a class to the host applying simple divider styles. */
@Directive({
    selector: '[hcDivider]'
})
export class DividerDirective {
    @HostBinding('class.hc-divider') _hostClass = true;
}
