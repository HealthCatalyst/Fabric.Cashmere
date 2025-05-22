import {Directive, HostBinding, ElementRef} from '@angular/core';

/** Marks the host element as a linkable section within an `hc-scroll-nav-content`.
 * Must set the `id` and link to it via an `hcScrollLink`. */
@Directive({
    selector: '[hcScrollTarget]',
    standalone: false
})
export class ScrollNavTargetDirective {
    @HostBinding('class.hc-scroll-nav-target')
    _hostClass = true;

    /** The `nativeElement` of the corresponding `hcScrollTarget` that you would like to link to. */
    public nativeElement: HTMLElement;

    constructor(element: ElementRef) {
        if (element) {
            this.nativeElement = element.nativeElement;
        }
    }

    public _setDirectiveToNode(node: Node): void {
        this.nativeElement = node as HTMLElement;
        this.nativeElement.classList.add('hc-scroll-nav-target');
    }
}
