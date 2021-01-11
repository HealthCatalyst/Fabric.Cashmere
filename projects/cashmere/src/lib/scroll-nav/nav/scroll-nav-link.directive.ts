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

    private readonly CLICKED_SUBSECTION_CLASS = 'hc-scroll-nav-clicked-subsection';
    private readonly SECTION_TAG_NAME = 'SECTION';

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
            this.setSubsectionClass(el);

            if (!this.hasClickedSubsection(el)) {
                el.scrollIntoView();
            }
        }
    }

    private setSubsectionClass(el: HTMLElement) {
        const parentElement = el.parentElement;

        if (parentElement && parentElement.tagName === this.SECTION_TAG_NAME) {
            el.classList.add(this.CLICKED_SUBSECTION_CLASS);
        }
    }

    private hasClickedSubsection(el: HTMLElement) {
        let subsectionHasBeenClicked = false;

        Array.from(el.children).forEach((childElement) => {
            if ((childElement.tagName === this.SECTION_TAG_NAME) && (childElement.className.includes(this.CLICKED_SUBSECTION_CLASS))) {
                subsectionHasBeenClicked = true;
                childElement.classList.remove(this.CLICKED_SUBSECTION_CLASS);
            }
        });

        return subsectionHasBeenClicked;
    }
}
