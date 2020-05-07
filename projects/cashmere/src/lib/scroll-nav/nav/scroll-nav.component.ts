import {Component, ElementRef, ViewEncapsulation, AfterViewInit, QueryList, ContentChildren} from '@angular/core';
import {ScrollNavLinkDirective} from './scroll-nav-link.directive';

/** Container for scroll navigation links. */
@Component({
    selector: 'hc-scroll-nav',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['scroll-nav.component.scss'],
    templateUrl: 'scroll-nav.component.html'
})
export class HcScrollNavComponent implements AfterViewInit {
    @ContentChildren(ScrollNavLinkDirective) private linkList: QueryList<ScrollNavLinkDirective>;
    public get _links(): Array<HTMLElement> {
        return this.linkList.toArray().map(e => e._el.nativeElement);
    }
    private readonly ACTIVE_CLASS = 'hc-scroll-nav-link-active';

    constructor(public _elementRef: ElementRef) {}

    public ngAfterViewInit(): void {
        if (this._links && this._links[0]) {
            this._links[0].classList.add(this.ACTIVE_CLASS);
        }
    }

    public _setActiveClassById(id: string): void {
        const link = this.linkList.find(e => e.hcScrollLink === id);
        if (!link) {
            throw new Error(`Failed to mark active class. Could not find the element with the data target for id: ${id}.`);
        }
        this.setActiveClass(link._el.nativeElement);
    }

    private setActiveClass(element: HTMLElement): void {
        this._links.forEach(e => {
            e.classList.remove(this.ACTIVE_CLASS);
        });
        element.classList.add(this.ACTIVE_CLASS);
    }
}
