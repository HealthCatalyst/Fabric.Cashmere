import {Directive, HostBinding, ElementRef, Input, HostListener} from '@angular/core';

/** Marks the host element as a link within an `hc-scroll-nav`. */
@Directive({
    selector: '[hcScrollLink]'
})
export class ScrollNavLinkDirective {
    /** The `id` of the corresponding `hcScrollTarget` that you would like to link to. */
    @Input() public hcScrollLink: string;
    @HostBinding('class.hc-scroll-nav-link')
    _hostClass = true;

    @HostBinding('attr.tabindex')
    _hostIndex = 0;

    constructor(public _el: ElementRef) {}

    @HostListener('keydown.enter') _onEnter() {
        this.navigateToSection(this.hcScrollLink);
    }

    @HostListener('click') _onClick() {
        this.navigateToSection(this.hcScrollLink);
    }

    private navigateToSection(id: string) {
        const el = document.getElementById(id);
        if (!el) {
            throw new Error(`Failed to navigate. Could not find the element with the id: ${id}.`);
        } else {
            el.scrollIntoView();
        }
    }
}
