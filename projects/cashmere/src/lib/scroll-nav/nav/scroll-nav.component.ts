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
    @ContentChildren(ScrollNavLinkDirective, { descendants: true }) private linkList: QueryList<ScrollNavLinkDirective>;
    public get _links(): Array<HTMLElement> {
        return this.linkList.toArray().map(e => e._el.nativeElement);
    }

    private readonly SCROLL_LINK_ATTRIBUTE = 'hcScrollLink';
    private readonly ACTIVE_CLASS = 'hc-scroll-nav-link-active';
    private readonly INACTIVE_CLASS = 'hc-scroll-nav-link-inactive';
    private readonly ACTIVE_PARENT_SECTION_CLASS = 'hc-scroll-nav-active-parent-section-link';
    private readonly INACTIVE_PARENT_SECTION_CLASS = 'hc-scroll-nav-inactive-parent-section-link';
    private readonly SUBSECTION_CLASS = 'hc-scroll-nav-subsection-link';
    private readonly PARENT_SECTION_CLASS = 'hc-scroll-nav-parent-section-link';
    private readonly PARENT_SECTION_CONTENT_CLASS = 'hc-scroll-nav-parent-section-link-content';
    private readonly LINKS_CONTAINER_CLASS = 'hc-scroll-nav-links-container';
    private readonly UNORDERED_LIST_TAG_NAME = 'UL';
    private readonly LIST_TAG_NAME = 'LI';

    constructor(public _elementRef: ElementRef) {}

    public ngAfterViewInit(): void {
        this._links.forEach((link) => {
            this.setClassesForSubsection(link);
        });

        if (this.linkList?.length > 0) {
            const firstScrollLink = this.linkList.first?.hcScrollLink;
            if (!firstScrollLink) {
                throw new Error(
                    `Failed to mark active section. Could not find the element with the data target for id: ${firstScrollLink}.`
                );
            }

            this._setActiveSectionById(firstScrollLink);
        }
    }

    public _setActiveSectionById(id: string): void {
        const link = this.linkList.find(e => e.hcScrollLink === id);
        if (!link) {
            throw new Error(`Failed to mark active section. Could not find the element with the data target for id: ${id}.`);
        }
        this.setActiveSection(link._el.nativeElement);
    }

    private setActiveSection(element: HTMLElement): void {
        const focusedEl = document.activeElement;

        // inactivate all elements before activating the passed in element
        this._links.forEach(e => {
            // remove active styles and set inactive styles
            e.classList.remove(this.ACTIVE_CLASS);
            e.classList.add(this.INACTIVE_CLASS);
            this.handleActiveParentSections(e, false);

            // If a nav item on the scroll list currently has focus, remove it so a highlight border doesn't persist on scroll
            if ( focusedEl === e ) {
                e.blur();
            }
        });

        element.classList.remove(this.INACTIVE_CLASS);
        element.classList.add(this.ACTIVE_CLASS);
        this.handleActiveParentSections(element, true);
    }

    private handleActiveParentSections(element: HTMLElement, isActive: boolean): void {
        if (element.parentElement) {
            element.className.includes(this.PARENT_SECTION_CLASS) ?
                this.setActiveParentSection(element, isActive) : this.setActiveParentSection(element.parentElement, isActive);
        } else if (element.className.includes(this.PARENT_SECTION_CLASS)) {
            this.setActiveParentSection(element, isActive);
        }
    }

    private setActiveParentSection(element: HTMLElement, isActive: boolean) {
        if (element.hasAttribute(this.SCROLL_LINK_ATTRIBUTE)) {
            if (isActive && !element.className.includes(this.ACTIVE_PARENT_SECTION_CLASS)) {
                element.classList.remove(this.INACTIVE_PARENT_SECTION_CLASS);
                element.classList.add(this.ACTIVE_PARENT_SECTION_CLASS);
            } else if (!isActive && !element.className.includes(this.INACTIVE_PARENT_SECTION_CLASS)) {
                element.classList.remove(this.ACTIVE_PARENT_SECTION_CLASS);
                element.classList.add(this.INACTIVE_PARENT_SECTION_CLASS);
            }
        }

        if (element.parentElement && !element.parentElement.className.includes(this.LINKS_CONTAINER_CLASS)) {
            this.setActiveParentSection(element.parentElement, isActive);
        }
    }

    private setClassesForSubsection(element: HTMLElement): void {
        let parentElement = element.parentElement ? element.parentElement.parentElement : undefined;

        if (parentElement && parentElement.tagName === this.LIST_TAG_NAME && parentElement.hasAttribute(this.SCROLL_LINK_ATTRIBUTE)) {
            element.classList.add(this.SUBSECTION_CLASS);

            if (!parentElement.className.includes(this.PARENT_SECTION_CLASS)) {
                parentElement.classList.add(this.PARENT_SECTION_CLASS);
                parentElement.classList.add(this.INACTIVE_PARENT_SECTION_CLASS);

                let parentHasContent = (parentElement.childNodes[0] && parentElement.childNodes[0].nodeValue) ? true : false;

                Array.from(parentElement.children).forEach((child) => {
                    if (!(child.tagName === this.UNORDERED_LIST_TAG_NAME &&
                          child.children[0] && child.children[0].hasAttribute(this.SCROLL_LINK_ATTRIBUTE))) {
                        parentHasContent = true;
                    }
                });

                if (parentHasContent && !parentElement.className.includes(this.PARENT_SECTION_CONTENT_CLASS)) {
                    parentElement.classList.add(this.PARENT_SECTION_CONTENT_CLASS);
                } else {
                    parentElement.classList.remove(this.PARENT_SECTION_CONTENT_CLASS);
                }
            }
        }
    }
}
