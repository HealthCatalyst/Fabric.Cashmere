import {Component, ElementRef, ViewEncapsulation, Renderer2, AfterViewInit, QueryList, ContentChildren} from '@angular/core';
import { ScrollNavLinkDirective } from './scroll-nav-link.directive';

/** Container for scroll navigation links. */
@Component({
    selector: 'hc-scroll-nav',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['scroll-nav.component.scss'],
    templateUrl: 'scroll-nav.component.html'
})
export class HcScrollNavComponent implements AfterViewInit {
    @ContentChildren(ScrollNavLinkDirective) private linkList: QueryList<ScrollNavLinkDirective>;
    public get _links(): Array<HTMLElement> { return this.linkList.toArray().map(e => e._el.nativeElement); }
    private readonly ACTIVE_CLASS = 'hc-scroll-nav-active';

    constructor(public _elementRef: ElementRef, private renderer: Renderer2) {}

    public ngAfterViewInit(): void {
        this._links.forEach((e, i) => {
            if (i === 0) {
                e.classList.add(this.ACTIVE_CLASS);
            }
            this.renderer.listen(e, 'click', () => {
                this.onNavClick(e);
            });
        });
    }

    public _setActiveClassById(id: string): void {
        const link = this._links.find(e => e.getAttribute('hcScrollLink') === id);
        if (!link) {
            throw new Error(`Failed to mark active class. Could not find the element with the data target for id: ${id}.`);
        }
        this.setActiveClass(link);
    }

    private setActiveClass(element: HTMLElement): void {
        this._links.forEach(e => {
            e.classList.remove(this.ACTIVE_CLASS);
        });
        element.classList.add(this.ACTIVE_CLASS);
    }

    private onNavClick(element: HTMLElement): void {
        const id = element.getAttribute('hcScrollLink') || '';
        this.navigateToSection(id);
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
