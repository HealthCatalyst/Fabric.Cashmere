import { Component, ElementRef, ViewEncapsulation, AfterViewInit, QueryList, ContentChildren, Renderer2, ViewChild, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { some, find, map, differenceBy } from 'lodash';
import { ScrollNavLinkDirective } from './scroll-nav-link.directive';
import { CdkScrollable } from '@angular/cdk/overlay';

/** Container for scroll navigation links. */
@Component({
    selector: 'hc-scroll-nav',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['scroll-nav.component.scss'],
    templateUrl: 'scroll-nav.component.html'
})
export class HcScrollNavComponent implements AfterViewInit, OnDestroy {
    /** Set to true to enable scrolling the nav link pane as the content pane scrolls */
    @Input() public scrollNavWithContent = false;
    /** Set to true to enable the component to change for dynamic content changes that might not be picked up by Angular */
    @Input() public hasDynamicContent = false;
    @Output() _scrollEvent = new EventEmitter<HTMLElement>();
    @ViewChild('scrollContainer', {read: CdkScrollable, static: false}) public _cdkScrollableElement: CdkScrollable;
    @ContentChildren(ScrollNavLinkDirective, { descendants: true }) private linkList: QueryList<ScrollNavLinkDirective>;
    public get _links(): Array<HTMLElement> {
        return this.linkList.toArray().map(e => e.nativeElement);
    }

    public isScrolling = false;
    private unsubscribe$ = new Subject<void>();
    private previousElementPosition = 0;
    private previousList: ScrollNavLinkDirective[] = [];
    private tryRefresh = false;
    private dynamicInterval;

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

    constructor(public _elementRef: ElementRef, private renderer: Renderer2) {}

    public ngOnDestroy(): void  {
        if (this.dynamicInterval) {
            clearInterval(this.dynamicInterval);
        }
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    public ngAfterViewInit(): void {
        setTimeout(() => {
            this.initializeLinks(true);
            this.previousList = this.linkList.toArray();
        }, 100);

        if (this.hasDynamicContent) {
            this.refreshScrollNavLinks();
            this.dynamicInterval = setInterval(() => {
                this.refreshScrollNavLinks();
            }, 300);
        }

        // If links are added dynamically, refresh the scrollNav
        this.linkList.changes.pipe(takeUntil(this.unsubscribe$)).subscribe((newLinkList: QueryList<ScrollNavLinkDirective>) => {
            if (this.previousList.length === 0) {
                this.previousList = newLinkList.toArray();
                this.initializeLinks(true);
            } else if (newLinkList.length === 0 && this.previousList.length > 0) {
                this.refreshScrollNavLinks(this.previousList);
            } else {
                this.previousList = newLinkList.toArray();
                this.initializeLinks();
            }
        });
    }

    /** Refresh the scroll nav links when dynamic changes have been made. updateScrollLinkArray parameter is optional */
    public refreshScrollNavLinks(updateScrollLinkArray: ScrollNavLinkDirective[] = []): void {
        if (updateScrollLinkArray.length > 0) {
            this.linkList.reset(updateScrollLinkArray);
            this.linkList.notifyOnChanges();

            return;
        }

        const scrollLinkNodeList: NodeList = this._elementRef.nativeElement.querySelectorAll(`[${this.SCROLL_LINK_ATTRIBUTE}]`);

        // create array to make the difference calculation off of
        const scrollLinkList: CombinedLinkList[] = [];
        scrollLinkNodeList.forEach((dynamicLink: HTMLElement) => {
            const scrollLinkAttributeValue: string | null = dynamicLink.getAttribute(this.SCROLL_LINK_ATTRIBUTE);
            if (scrollLinkAttributeValue) {
                scrollLinkList.push({ hcScrollLink: scrollLinkAttributeValue, linkElement: dynamicLink });
            }
        });

        if (
            this.linkList.length !== scrollLinkList.length ||
            differenceBy(scrollLinkList, this.linkList.toArray(), 'hcScrollLink').length > 0
        ) {
            const newLinkList: ScrollNavLinkDirective[] =
                map(scrollLinkList, (dynamicLink: CombinedLinkList) => {
                    let rtnLink: ScrollNavLinkDirective = <ScrollNavLinkDirective>{};

                    if (some(this.linkList.toArray(), ['hcScrollLink', dynamicLink.hcScrollLink])) {
                        const queryDirective: ScrollNavLinkDirective | undefined =
                            find(this.linkList.toArray(), ["hcScrollLink", dynamicLink.hcScrollLink]);
                        if (queryDirective) {
                            rtnLink = queryDirective;
                        }
                    } else {
                        const scrollNavLinkDirective: ScrollNavLinkDirective =
                            new ScrollNavLinkDirective(<ElementRef>{}, this.renderer);
                        scrollNavLinkDirective._setDirectiveToNode(dynamicLink.linkElement);
                        rtnLink = scrollNavLinkDirective;
                    }

                    rtnLink.navClick.pipe(takeUntil(this.unsubscribe$)).subscribe( element => {
                        this._scrollEvent.emit( element );
                    })

                    return rtnLink;
                }
            );

            this.linkList.reset(newLinkList);
            this.linkList.notifyOnChanges();

            return;
        }
    }

    public _setActiveSectionById(id: string): void {
        const link = this.linkList.find(e => e.hcScrollLink === id);
        if (!link) {
            if (!this.tryRefresh) {
                this.tryRefresh = true;
                this.refreshScrollNavLinks();
                this._setActiveSectionById(id);
            } else {
                this.tryRefresh = false;
                throw new Error(`Failed to mark active section. Could not find the element with the data target for id: ${id}.`);
            }
        } else {
            this.setActiveSection(link.nativeElement);
        }
    }

    private initializeLinks(isInit = false): void {
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

            this.linkList.forEach( link => {
                link.navClick.pipe(takeUntil(this.unsubscribe$)).subscribe( element => {
                    this._scrollEvent.emit( element );
                });
            });

            if (isInit) {
                this._setActiveSectionById(firstScrollLink);
            }
        }
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

        if (this.scrollNavWithContent) {
            this.scrollToElement(element);
        }
    }

    private scrollToElement(element: HTMLElement): void {
        let currentElementPosition = 0;
        this._links.forEach((link, index) => {
            if (link.getAttribute(this.SCROLL_LINK_ATTRIBUTE) === element.getAttribute(this.SCROLL_LINK_ATTRIBUTE)) {
                currentElementPosition = index;
            }
        });

        const container: HTMLElement = this._elementRef.nativeElement.querySelector(`.${this.LINKS_CONTAINER_CLASS}`);
        const offsetTop: number = element.offsetTop;
        const elementClientHeight: number = element.clientHeight;
        const scrollHeight: number = container.scrollHeight;
        const scrollTop: number = this._cdkScrollableElement.measureScrollOffset("top");
        const clientHeight: number = container.clientHeight;

        if (!this.isScrolling) {
            if (this.previousElementPosition < currentElementPosition) { // scroll down
                if (offsetTop > clientHeight && scrollTop <= offsetTop) {
                    this._cdkScrollableElement.scrollTo({ bottom: scrollHeight - offsetTop - elementClientHeight });
                }
            } else if (this.previousElementPosition > currentElementPosition) { // scroll up
                this._cdkScrollableElement.scrollTo({ bottom: scrollHeight - offsetTop - elementClientHeight });
            }
        }

        this.previousElementPosition = currentElementPosition;
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
        const parentElement = element.parentElement ? element.parentElement.parentElement : undefined;

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

export interface CombinedLinkList {
    hcScrollLink: string;
    linkElement: HTMLElement;
}
