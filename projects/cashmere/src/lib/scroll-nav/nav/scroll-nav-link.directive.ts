import {Directive, HostBinding, ElementRef, Input, HostListener, Renderer2, Output, EventEmitter} from '@angular/core';

/** Marks the host element as a link within an `hc-scroll-nav`. */
@Directive({
    selector: '[hcScrollLink]',
    standalone: false
})
export class ScrollNavLinkDirective {
    /** The `id` of the corresponding `hcScrollTarget` that you would like to link to. */
    @Input() public hcScrollLink: string | null;

    /** Emits the associated content element when a nav link is clicked */
    @Output() navClick = new EventEmitter<HTMLElement>();

    @HostBinding('class.hc-scroll-nav-link')
    _hostClass = true;

    /** The `nativeElement` of the corresponding `hcScrollTarget` that you would like to link to. */
    public nativeElement: HTMLElement;

    private readonly CLICKED_SUBSECTION_CLASS = 'hc-scroll-nav-clicked-subsection';
    private readonly SECTION_TAG_NAME = 'SECTION';

    constructor(element: ElementRef, private renderer: Renderer2) {
        if (element) {
            this.nativeElement = element.nativeElement;
        }
    }

    public _setDirectiveToNode(node: Node): void {
        this.nativeElement = node as HTMLElement;
        this.hcScrollLink = (node as HTMLElement).getAttribute('hcScrollLink');
        this.renderer.addClass(node, 'hc-scroll-nav-link');

        this.renderer.listen(node, "click", () => {
            if (this.hcScrollLink) {
                this.navigateToSection(this.hcScrollLink);
            }
        });

        this.renderer.listen(node, "keydown.enter", () => {
            if (this.hcScrollLink) {
                this.navigateToSection(this.hcScrollLink);
            }
        });
    }

    @HostListener('keydown.enter') _onEnter(): void {
        if (this.hcScrollLink) {
            this.navigateToSection(this.hcScrollLink);
        }
    }

    @HostListener('click') _onClick(): void {
        if (this.hcScrollLink) {
            this.navigateToSection(this.hcScrollLink);
        }
    }

    private navigateToSection(id: string) {
        const el = document.getElementById(id);
        
        if (!el) {
            throw new Error(`Failed to navigate. Could not find the element with the id: ${id}.`);
        } else {
            this.setSubsectionClass(el);

            if (!this.hasClickedSubsection(el)) {
                this.navClick.emit( el );
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
