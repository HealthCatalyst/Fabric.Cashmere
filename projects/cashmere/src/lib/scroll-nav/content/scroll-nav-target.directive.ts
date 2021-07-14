import {Directive, HostBinding, ElementRef, Renderer2} from '@angular/core';

/** Marks the host element as a linkable section within an `hc-scroll-nav-content`.
 * Must set the `id` and link to it via an `hcScrollLink`. */
@Directive({
    selector: '[hcScrollTarget]'
})
export class ScrollNavTargetDirective {
    @HostBinding('class.hc-scroll-nav-target')
    _hostClass = true;

    /** The `nativeElement` of the corresponding `hcScrollTarget` that you would like to link to. */
    public nativeElement: HTMLElement;

    constructor(element: ElementRef, private renderer: Renderer2) {
        if (element) {
            this.nativeElement = element.nativeElement;
        }
    }

    public _setDirectiveToNode(node: Node): void {
        this.nativeElement = node as HTMLElement;
        this.renderer.addClass(node, 'hc-scroll-nav-target');
    }
}
