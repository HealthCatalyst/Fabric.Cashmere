import {Component, Input, ViewEncapsulation, EventEmitter, Output} from '@angular/core';
import { LinkParent, SidenavLink, SidenavLinkClickEvent, SidenavTabGroup } from './sidenav.models';
import { isDefined } from '../util';

/** Component for standard sidebar navigation */
@Component({
    selector: 'hc-sidenav',
    templateUrl: 'sidenav.component.html',
    styleUrls: ['sidenav.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class SidenavComponent {
    /** Add a custom css class to the sidebar container. */
    @Input() containerCssClass = '';
    /** Set width of the sidebar. Include unit. Can be pixels, rem, em, etc. Default is 260px */
    @Input() width = '260px';
    /** True for a darker sidebar navigation. *Defaults to `false`.* */
    @Input() public darkMode = false;
    /** If true, collapse the sidebar to a minimal width. Defaults to false. */
    @Input() collapsed = false;
    /** Event triggered when the sidebar is expanded or collapsed. */
    @Output() collapsedChange = new EventEmitter<boolean>();
    /** If true, sidebar can toggle between collapsed and expanded. Will have an expand/collapse button. Defaults to true. */
    @Input() canToggle = true;
    /** True if nested children should be shown by default. *Defaults to `false`.* */
    @Input() set openChildrenByDefault(openByDefault: boolean) {
        this.toggleAllNestedLinks(openByDefault);
        this._openChildrenByDefault = isDefined(openByDefault) ? openByDefault : false;
    }
    get openChildrenByDefault(): boolean {
        return this._openChildrenByDefault;
    }
    private _openChildrenByDefault = false;
    /** True if nested children should be hideable. Overrides `openChildrenByDefault` and `openChildrenWhenActive`. *Defaults to `true`.* */
    @Input() set collapsibleChildren(collapsible: boolean) {
        this._collapsibleChildren = isDefined(collapsible) ? collapsible : true;
        if (!this._collapsibleChildren) {
            this.openAllNestedLinks();
        }
    }
    get collapsibleChildren(): boolean {
        return this._collapsibleChildren;
    }
    private _collapsibleChildren = true;

    /** True if nested children should be shown if the link is active. Overrides `openChildrenByDefault`. *Defaults to `true`.* */
    @Input() openChildrenWhenActivated = true;
    /** True to show lines of tree structure. *Defaults to `true`.* */
    @Input() showTreeLines = true
    /** Collection of objects representing the main links in the sidenav. */
    @Input() set tabs(tabs: SidenavLink[]) {
        this._tabs = tabs;
        this.activeTabKey = this.activeTabKey || tabs[0]?.key || '';
        this.hasNestedLinks = this.tabs.some(tab => tab.children?.length > 0);
        this.toggleAllNestedLinks(this.openChildrenByDefault);
    }
    get tabs(): SidenavLink[] {
        return this._tabs;
    }
    private _tabs: SidenavLink[] = [];

    /** Collection of tabGroups. These are styled like the main tabs, but are grouped together under a separate header. */
    @Input() set tabGroups(tabGroups: SidenavTabGroup[]) {
        this._tabGroups = tabGroups;
    }
    get tabGroups(): SidenavTabGroup[] {
        return this._tabGroups;
    }
    private _tabGroups: SidenavTabGroup[] = [];
    /** Event triggered when a tab group header is clicked. */
    @Output() tabGroupHeaderClicked = new EventEmitter<SidenavLinkClickEvent>();

    /** @docs-private */
    hasNestedLinks = false;

    /** True to show loading indicator for tabs. Use while data is loading to show tabs */
    @Input() isLoadingTabs = false;
    /** Event triggered when a tab is clicked. */
    @Output() tabClicked = new EventEmitter<SidenavLinkClickEvent>();
    /** Key of the tab that should be marked as active. */
    @Input() activeTabKey = '';
    /** If using routerLinks, routerLinkActiveClass can be used to set appropriate class for the active route.
     * If used, the `activeTabKey` property will be ignored.
     * If a class besides `active-tab` is used, you'll need to provide your own css. */
    @Input() routerLinkActiveClass = '';

    /** True to show scrollable favorites section. */
    @Input() showFavorites = true;
    /** Collection of objects representing user favorited items. */
    @Input() favorites: SidenavLink[] = [];
    /** True to show loading indicator for favorites. */
    @Input() isLoadingFavorites = false;
    /** Event triggered when a favorite is clicked. */
    @Output() favoriteClicked = new EventEmitter<SidenavLinkClickEvent>();
    /** Label for the favorites section. */
    @Input() favoritesTitleLabel = 'Favorites';
    /** Description of the favorites section for display in the UI as a tooltip */
    @Input() favoritesDescription = 'Mark favorites to pin them here.';
    /** An icon to show in the favorites header. */
    @Input() favoritesTitleIconClass = 'hc-ico-star';
    /** A clickable action icon to show next to each favorite list item. Default is a filled yellow star.*/
    @Input() favoritesItemActionIconClass = 'hc-ico-star-filled';
    /** Tooltip for a favorite's action icon. */
    @Input() favoritesItemActionIconTooltip = 'Remove from favorites';
    /** Event triggered when the action icon for a favorite list item is clicked. Typically for "unfavoriting" an item. */
    @Output() favoriteItemIconClicked = new EventEmitter<SidenavLinkClickEvent>();

    /** @docs-private */
    tabTooltipText = ''
    /** @docs-private */
    menuContext: {links?: SidenavLink[], title?: string, titleIco?: string, parent?: LinkParent, isFav: boolean};

    /** Expand the sidebar to full width. */
    open(): void {
        this.collapsed = false;
        this.collapsedChange.emit(this.collapsed);
    }

    /** Collapse the sidebar to a minimal width. */
    close(): void {
        this.collapsed = true;
        this.collapsedChange.emit(this.collapsed);
    }

    /** Toggle the sidebar's expand/collapse state. */
    toggle(): void {
        this.collapsed = !this.collapsed;
        this.collapsedChange.emit(this.collapsed);
    }

    _onRouterLinkActiveChange(isActive: boolean, tab: SidenavLink) {
        if (isActive) {
            this.activeTabKey = tab.key;
        }
    }

    /** @docs-private */
    onTabClick(event: MouseEvent, link: SidenavLink, isMenuHeader = false, isFavorite = false): void {
        const tabTriggersMenu = !isMenuHeader && this.collapsed && link.children?.length > 0 && !link.parent;
        if (link.disabled || !link.clickable || tabTriggersMenu) { return; }
        if (isFavorite) { this.onFavoriteClicked(event, link); return; }
        this.tabClicked.emit({event, link});
        this.activeTabKey = link.key;

        if (link.children?.length > 0 && this.openChildrenWhenActivated) {
            link.open = true;
        }

        if (!link.onClick) { return; }
        link.onClick(event, link);
    }

    /** @docs-private */
    onTabGroupHeaderClick(event: MouseEvent, link: SidenavLink): void {
        this.tabGroupHeaderClicked.emit({event, link});
    }

    /** @docs-private */
    onFavoriteClicked(event: MouseEvent, link: SidenavLink): void {
        this.favoriteClicked.emit({event, link});

        if (!link.onClick) { return; }
        link.onClick(event, link);
    }

    /** @docs-private */
    onFavoriteItemIconClicked(event: MouseEvent, link: SidenavLink): void {
        event.stopPropagation();
        this.favoriteItemIconClicked.emit({event, link});
    }

    /** @docs-private */
    public trackContentItem(index: number, item: SidenavLink): string | undefined {
        return item.key;
    }

    /** @docs-private */
    public childrenChevClicked(tab: SidenavLink, event: MouseEvent): void {
        event.stopPropagation();
        if (this.collapsibleChildren) {
            tab.open = !tab.open;
        }
    }

    public toggleAllNestedLinks(shouldOpen = true): void {
        this.tabs.forEach(tab => this.toggleLinkAndChildren(tab, shouldOpen));
    }

    public collapseAllNestedLinks(): void {
        if(!this.collapsibleChildren) {
            return;
        }
        this.toggleAllNestedLinks(false);
    }

    public openAllNestedLinks(): void {
        this.toggleAllNestedLinks(true);
    }

    private toggleLinkAndChildren(link: SidenavLink, shouldOpen: boolean): void {
        link.open = shouldOpen;
        link.children?.forEach(child => this.toggleLinkAndChildren(child, shouldOpen));
    }
}
