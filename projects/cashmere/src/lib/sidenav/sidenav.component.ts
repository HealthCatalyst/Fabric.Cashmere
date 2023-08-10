import {Component, Input, ViewEncapsulation, EventEmitter, Output} from '@angular/core';
import { SidenavLink, SidenavLinkClickEvent } from './sidenav.models';

/** Component for standard sidebar navigation */
@Component({
    selector: 'hc-sidenav',
    templateUrl: 'sidenav.component.html',
    styleUrls: ['sidenav.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SidenavComponent {
    /** Add a custom css class to the sidebar container. */
    @Input() containerCssClass = '';
    /** If true, collapse the sidebar to a minimal width. Defaults to false. */
    @Input() collapsed = false;
    /** Event triggered when the sidebar is expanded or collapsed. */
    @Output() collapsedChange = new EventEmitter<boolean>();
    /** If true, sidebar can toggle between collapsed and expanded. Will have an expand/collapse button. Defaults to true. */
    @Input() canToggle = true;
    /** Collection of objects representing the links in the sidenav. */
    @Input() set tabs(tabs: SidenavLink[]) {
        this._tabs = tabs;
        this.activeTabKey = this.activeTabKey || tabs[0]?.key || '';
    }
    get tabs(): SidenavLink[] {
        return this._tabs;
    }
    private _tabs: SidenavLink[] = [];
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
    onTabClick(event: MouseEvent, link: SidenavLink): void {
        if (link.disabled) { return; }
        this.tabClicked.emit({event, link});
        this.activeTabKey = link.key;

        if (!link.onClick) { return; }
        link.onClick(event, link);
    }

    /** @docs-private */
    onFavoriteClicked(event: MouseEvent, link: SidenavLink): void {
        if (link.disabled) { return; }
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
}
