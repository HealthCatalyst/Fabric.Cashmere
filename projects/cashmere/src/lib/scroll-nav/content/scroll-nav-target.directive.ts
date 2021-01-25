import {Directive, HostBinding, ElementRef} from '@angular/core';

/** Marks the host element as a linkable section within an `hc-scroll-nav-content`.
 * Must set the `id` and link to it via an `hcScrollLink`. */
@Directive({
    selector: '[hcScrollTarget]'
})
export class ScrollNavTargetDirective {
    @HostBinding('class.hc-scroll-nav-target')
    _hostClass = true;

    constructor(public _el: ElementRef) {}
}
