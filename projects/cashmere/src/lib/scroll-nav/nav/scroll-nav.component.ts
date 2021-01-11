import {Component, ElementRef, ViewEncapsulation, AfterViewInit, QueryList, ContentChildren, Input, OnInit} from '@angular/core';
import {ScrollNavLinkDirective} from './scroll-nav-link.directive';

/** Container for scroll navigation links. */
@Component({
    selector: 'hc-scroll-nav',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['scroll-nav.component.scss'],
    templateUrl: 'scroll-nav.component.html'
})
export class HcScrollNavComponent implements OnInit, AfterViewInit {
    /** Style that applies to all active links through css* */
    @Input() public activeStyle = '';
    /** Hover style that applies to all active links through css* */
    @Input() public activeHoverStyle = '';
    /** Style that applies to all inactive links through css* */
    @Input() public inactiveStyle = '';
    /** Hover style that applies to all inactive links through* css */
    @Input() public inactiveHoverStyle = '';
    /** Style that applies to all links through css* */
    @Input() public baseStyle = '';
    /** Hover style that applies to all links through css* */
    @Input() public baseHoverStyle = '';
    /** Style that applies to all active parent links through css* */
    @Input() public parentActiveStyle = '';
    /** Hover style that applies to all active parent links through css* */
    @Input() public parentActiveHoverStyle = '';
    /** Style that applies to all inactive parent links through css* */
    @Input() public parentInactiveStyle = '';
    /** Hover style that applies to all inactive parent links links through css* */
    @Input() public parentInactiveHoverStyle = '';
    /** Adds a css rule to stylesheet* */
    @Input() public cssRules = '';

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

    public ngOnInit(): void {
        this.verifyLinkStyleParameters();
        this.setCssForLinkParameters();
        if (this.cssRules) {
            this.setCssRules(this.cssRules);
        }
    }

    public ngAfterViewInit(): void {
        this._links.forEach((link) => {
            this.setClassesForSubsection(link);
        });

        if (this._links && this._links[0]) {
            let linkId = this._links[0].getAttribute('hcScrollLink');
            if (!linkId) {
                throw new Error(`Failed to mark active section. Could not find the element with the data target for id: ${linkId}.`);
            }

            this._setActiveSectionById(linkId);
        }

        this._links.forEach((link) => {
            this.verifyLinkStyles(link);

            this.handleLinkStyles(link);

            let sectionCssRules = link.getAttribute('cssRules');
            if (sectionCssRules) {
                this.setCssRules(sectionCssRules);
            }
        });
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

    private handleLinkStyles(element: HTMLElement) {
        this.handleLinkStyle(element, false);
        this.handleLinkStyle(element, true);
        this.setParentSectionStyle(element, false);
        this.setParentSectionStyle(element, true);
    }

    private setParentSectionStyle(element: HTMLElement, isHover: boolean): void {
        if (element.className.includes(this.PARENT_SECTION_CLASS)) {
            const generalParentActiveStyle = isHover ? this.parentActiveHoverStyle : this.parentActiveStyle;
            const parentActiveStyle = isHover ? element.getAttribute('parentActiveHoverStyle') : element.getAttribute('parentActiveStyle');
            const generalParentInactiveStyle = isHover ? this.parentInactiveHoverStyle : this.parentInactiveStyle;
            const parentInactiveStyle = isHover ? element.getAttribute('parentInactiveHoverStyle') : element.getAttribute('parentInactiveStyle');
            const linkTargetId = element.getAttribute('hcScrollLink');

            if (generalParentInactiveStyle) {
                this.setCssRulesForLink(linkTargetId, generalParentInactiveStyle, isHover, `.${this.INACTIVE_PARENT_SECTION_CLASS}`);
            }
            if (parentInactiveStyle) {
                this.setCssRulesForLink(linkTargetId, parentInactiveStyle, isHover, `.${this.INACTIVE_PARENT_SECTION_CLASS}`);
            }

            if (generalParentActiveStyle) {
                this.setCssRulesForLink(linkTargetId, generalParentActiveStyle, isHover, `.${this.ACTIVE_PARENT_SECTION_CLASS}`);
            }
            if (parentActiveStyle) {
                this.setCssRulesForLink(linkTargetId, parentActiveStyle, isHover, `.${this.ACTIVE_PARENT_SECTION_CLASS}`);
            }
        }
    }

    private setBaseStyle(element: HTMLElement, isHover: boolean): void {
        const linkTargetId = element.getAttribute('hcScrollLink');
        const sectionBaseStyle = isHover ? element.getAttribute('baseHoverStyle') : element.getAttribute('baseStyle');

        if (sectionBaseStyle) {
            let cssDecorator = `[hcscrolllink='${linkTargetId}']`;

            if (isHover) {
                cssDecorator += ':hover';
            }

            this.setCssRules(`${cssDecorator} { ${sectionBaseStyle} }`);
        }
    }

    private handleLinkStyle(element: HTMLElement, isHover: boolean): void {
        const generalActiveStyle = isHover ? this.activeHoverStyle : this.activeStyle;
        const linkActiveStyle = isHover ? element.getAttribute('activeHoverStyle') : element.getAttribute('activeStyle');
        const generalInactiveStyle = isHover ? this.inactiveHoverStyle : this.inactiveStyle;
        const linkInactiveStyle = isHover ? element.getAttribute('inactiveHoverStyle') : element.getAttribute('inactiveStyle');
        const generalBaseStyle = isHover ? this.baseHoverStyle : this.baseStyle;
        const linkBaseStyle = isHover ? element.getAttribute('baseHoverStyle') : element.getAttribute('baseStyle');
        const linkTargetId = element.getAttribute('hcScrollLink');

        this.setBaseStyle(element, isHover);

        if (generalBaseStyle) {
            this.setCssRulesForLink(linkTargetId, generalBaseStyle, isHover);
        }
        if (linkBaseStyle) {
            this.setCssRulesForLink(linkTargetId, linkBaseStyle, isHover);
        }

        if (generalInactiveStyle) {
            this.setCssRulesForLink(linkTargetId, generalInactiveStyle, isHover, `.${this.INACTIVE_CLASS}`);
        }
        if (linkInactiveStyle) {
            this.setCssRulesForLink(linkTargetId, linkInactiveStyle, isHover, `.${this.INACTIVE_CLASS}`);
        }

        if (generalActiveStyle) {
            this.setCssRulesForLink(linkTargetId, generalActiveStyle, isHover, `.${this.ACTIVE_CLASS}`);
        }
        if (linkActiveStyle) {
            this.setCssRulesForLink(linkTargetId, linkActiveStyle, isHover, `.${this.ACTIVE_CLASS}`);
        }
    }

    private setCssRulesForLink(
        linkTargetId: string | undefined | null, ruleToSet, isHover: boolean = false, additionalSelector: string = ''
    ): void {
        linkTargetId = linkTargetId ? linkTargetId : '';
        let cssDecorator = `[hcscrolllink="${linkTargetId}"]`;

        if (ruleToSet) {
            if (additionalSelector) {
                cssDecorator += additionalSelector;
            }
            if (isHover) {
                cssDecorator += ':hover';
            }

            this.setCssRules(`${cssDecorator} { ${ruleToSet} }`);
        }
    }

    private setCssForLinkParameters(): void  {
        this.setCssRulesForAllLinks(this.activeStyle, false, `.${this.ACTIVE_CLASS}`);
        this.setCssRulesForAllLinks(this.activeHoverStyle, true, `.${this.ACTIVE_CLASS}`);
        this.setCssRulesForAllLinks(this.inactiveStyle, false, `.${this.INACTIVE_CLASS}`);
        this.setCssRulesForAllLinks(this.inactiveHoverStyle, true, `.${this.INACTIVE_CLASS}`);
        this.setCssRulesForAllLinks(this.baseStyle, false);
        this.setCssRulesForAllLinks(this.baseHoverStyle, true);
        this.setCssRulesForAllLinks(this.parentActiveStyle, false, `.${this.ACTIVE_PARENT_SECTION_CLASS}`);
        this.setCssRulesForAllLinks(this.parentActiveHoverStyle, true, `.${this.ACTIVE_PARENT_SECTION_CLASS}`);
        this.setCssRulesForAllLinks(this.parentInactiveStyle, false, `.${this.INACTIVE_PARENT_SECTION_CLASS}`);
        this.setCssRulesForAllLinks(this.parentInactiveHoverStyle, true, `.${this.INACTIVE_PARENT_SECTION_CLASS}`);
    }

    private setCssRulesForAllLinks(rule: string, isHover: boolean = false, additionalSelector: string = ''): void {
        let cssDecorator = `[hcscrolllink]`;

        if (rule) {
            if (additionalSelector) {
                cssDecorator += additionalSelector;
            }
            if (isHover) {
                cssDecorator += ':hover';
            }

            this.setCssRules(`${cssDecorator} { ${rule} }`);
        }
    }

    private setCssRules(rule: string): void {
        let styleSheet = document.styleSheets[document.styleSheets.length - 1];
        const rules = (styleSheet as CSSStyleSheet).cssRules;

        for (let i = 0; i < rules.length; i++) {
            if (rules[i] instanceof CSSStyleRule) {
                let cssText = (rules[i] as CSSStyleRule).cssText;
                if (cssText === rule) {
                    (styleSheet as CSSStyleSheet).removeRule(i);
                }
            }
        }

        if (rule) {
            (styleSheet as CSSStyleSheet).insertRule(rule, (styleSheet as CSSStyleSheet).cssRules.length);
        }
    }

    private verifyLinkStyleParameters(): void {
        this.verifyStyle(this.activeStyle, 'activeStyle', 'hc-scroll-nav');
        this.verifyStyle(this.activeHoverStyle, 'activeHoverStyle', 'hc-scroll-nav');
        this.verifyStyle(this.inactiveStyle, 'inactiveStyle', 'hc-scroll-nav');
        this.verifyStyle(this.inactiveHoverStyle, 'inactiveHoverStyle', 'hc-scroll-nav');
        this.verifyStyle(this.baseStyle, 'baseStyle', 'hc-scroll-nav');
        this.verifyStyle(this.baseHoverStyle, 'baseHoverStyle', 'hc-scroll-nav');
        this.verifyStyle(this.parentActiveStyle, 'parentActiveStyle', 'hc-scroll-nav');
        this.verifyStyle(this.parentActiveHoverStyle, 'parentActiveHoverStyle', 'hc-scroll-nav');
        this.verifyStyle(this.parentInactiveStyle, 'parentInactiveStyle', 'hc-scroll-nav');
        this.verifyStyle(this.parentInactiveHoverStyle, 'parentInactiveHoverStyle', 'hc-scroll-nav');
    }

    private verifyLinkStyles(link: HTMLElement) {
        this.verifyLinkStyle(link, 'activeStyle');
        this.verifyLinkStyle(link, 'activeHoverStyle');
        this.verifyLinkStyle(link, 'inactiveStyle');
        this.verifyLinkStyle(link, 'inactiveHoverStyle');
        this.verifyLinkStyle(link, 'baseStyle');
        this.verifyLinkStyle(link, 'baseHoverStyle');
        this.verifyLinkStyle(link, 'parentActiveStyle');
        this.verifyLinkStyle(link, 'parentActiveHoverStyle');
        this.verifyLinkStyle(link, 'parentInactiveStyle');
        this.verifyLinkStyle(link, 'parentInactiveHoverStyle');
    }

    private verifyLinkStyle(link: HTMLElement, styleName: string) {
        const style = link.getAttribute(styleName);
        if (style) {
            const scrollLinkValue = link.getAttribute('hcScrollLink');
            const sectionName = scrollLinkValue ? `section: ${scrollLinkValue}` : '';
            this.verifyStyle(style, styleName, sectionName);
        }
    }

    private verifyStyle(style: string, styleName: string, sectionName: string = ''): void {
        let throwError = false;

        if (style) {
            if (style.includes(':') && style.includes(';')) {
                const colonLength = style.split(':').length;
                const commaLength = style.split(';').length;

                if (colonLength !== commaLength) {
                    throwError = true;
                }
            } else {
                throwError = true;
            }

            if (throwError) {
                let errorString = `All styles in '${styleName}: ${style}' need both ':'s and ';'s.`;

                if (sectionName) {
                    errorString += ` Located in ${sectionName}.`;
                }

                throw Error(errorString);
            }
        }
    }
}
