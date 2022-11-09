import {
    AfterContentInit,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    HostListener,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import type {QueryList} from '@angular/core';
import {EventEmitter, TemplateRef} from '@angular/core';
import {TabComponent} from '../tab/tab.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, interval, fromEvent} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {parseBooleanAttribute} from '../../util';
import {HcPopoverAnchorDirective} from '../../pop';

/** Object returned by a `selectedTabChange` event; a -1 index is returned if all tabs are deselected */
export class TabChangeEvent {
    constructor(public index: number, public tab: TabComponent | null) {}
}

export function throwErrorForMissingRouterLink(tabsWithoutRouterLink: TabComponent[]): void {
    const tabTitles = tabsWithoutRouterLink.map(tab => tab.tabTitle);
    throw Error(`Routerlink missing on ${tabTitles.join(',')}`);
}

const supportedDirections = ['horizontal', 'vertical'];

export function validateDirectionInput(inputStr: string): void {
    if (supportedDirections.indexOf(inputStr) < 0) {
        throw Error('Unsupported tab direction value: ' + inputStr);
    }
}

const supportedOverflow = ['more', 'arrows', 'none'];

export function validateOverflowInput(inputStr: string): void {
    if (supportedOverflow.indexOf(inputStr) < 0) {
        throw Error('Unsupported tab overflow style: ' + inputStr);
    }
}

export function tabComponentMissing(): Error {
    return new Error(`TabSet must contain at least one TabComponent. Make sure to add a hc-tab to the hc-tab-set element.`);
}

export function invalidDefaultTab(tabVal: string | number): void {
    throw Error('Invalid default tab value: ' + tabVal + ". Must be 'none' or a value less than the total number of tabs in the set.");
}

@Component({
    selector: `hc-tab-set`,
    templateUrl: './tab-set.component.html',
    styleUrls: ['./tab-set.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TabSetComponent implements AfterContentInit {
    _routerEnabled = false;
    _routerDeselected = false;
    _tabArrowsEnabled = [true, true];
    private _direction = 'vertical';
    private _defaultTab: string | number = 0;
    private _stopTabSubscriptionSubject: Subject<void> = new Subject();
    private _stopTabArrowSubject: Subject<void> = new Subject();

    private _tabWidths: Array<number> = [];
    private _tabsTotalWidth = 0;
    public _collapse = false;
    public _moreList: Array<TabComponent> = [];
    private unsubscribe = new Subject<void>();

    /** The content to be displayed for the currently selected tab.
     * This is read from the tab when it is selected.
     * Not used when this component uses routing.
     */
    tabContent: TemplateRef<unknown> | null;

    @ContentChildren(TabComponent)
    _tabs: QueryList<TabComponent>;

    @ViewChild('tabBar') _tabBar: ElementRef;

    @ViewChild('moreLink')
    _moreButton: HcPopoverAnchorDirective;

    _selectedTab: number | TabComponent;

    /** Specify which tab is currently selected. Does not fire a `selectedTabChange` emission. */
    @Input()
    get selectedTab(): number | TabComponent {
        return this._selectedTab;
    }

    set selectedTab(selected: number | TabComponent) {
        this.selectTab(selected, false);
    }

    /** Emits when the selected tab is changed */
    @Output()
    selectedTabChange: EventEmitter<TabChangeEvent> = new EventEmitter();

    /** Specify direction of tabs as either `horizontal` or `vertical`. Defaults to `vertical` */
    @Input()
    get direction(): string {
        return this._direction;
    }

    set direction(directionType: string) {
        validateDirectionInput(directionType);
        this._direction = directionType;
    }

    /** Zero-based numerical value specifying which tab to select by default, setting to `none` means no tab
     * will be immediately selected. Defaults to 0 (the first tab). */
    @Input()
    get defaultTab(): string | number {
        return this._defaultTab;
    }

    set defaultTab(tabValue: string | number) {
        if (!isNaN(+tabValue) || tabValue === 'none') {
            this._defaultTab = tabValue;
        } else {
            invalidDefaultTab(tabValue);
        }
    }

    /** Determines whether the tab set will create a router-outlet or ng-container for the tab content.
     * If set to false, the app will need to add its own container.  Defaults to `true`. */
    @Input()
    get addContentContainer(): boolean {
        return this._addContentContainer;
    }

    set addContentContainer(value: boolean) {
        this._addContentContainer = parseBooleanAttribute(value);
    }

    _addContentContainer = true;

    /** If true, condense the default padding on all included tabs. *Defaults to `false`.*  */
    @Input()
    get tight(): boolean {
        return this._tight;
    }
    set tight(value: boolean) {
        this._tight = parseBooleanAttribute(value);
        this.setTabDirection();
    }
    private _tight = false;

    /** When horzontal tabs overflow the container, specify either 'more', 'arrows', or 'none' for navigation control. Defaults to `more` */
    @Input()
    get overflowStyle(): string {
        return this._overflowStyle;
    }

    set overflowStyle(overflowType: string) {
        validateOverflowInput(overflowType);
        this._overflowStyle = overflowType;
        this.refreshTabWidths();
    }
    private _overflowStyle = 'more';

    constructor(private router: Router, private route: ActivatedRoute, public changeDetector: ChangeDetectorRef) {}

    ngAfterContentInit(): void {
        this.setUpTabs();

        /** Backup call to calculate tab widths in case the tabs are presented after page load */
        setTimeout(() => this.refreshTabWidths(), 10);

        // If links are added dynamically, recheck the navbar link sizing
        this._tabs.changes.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
            this.setUpTabs();
            this.refreshTabWidths();
            this.changeDetector.detectChanges();
        });
    }

    /** Runs the initial calculation of tab widths after the page has fully rendered */
    @HostListener('window:load')
    _setupTabWidths(): void {
        setTimeout(() => {
            this.refreshTabWidths();
        });
    }

    /** Forces a recalculation of the tabs to determine how many should be rolling into a More menu.
     * Call this if you've updated the contents of any tabs. */
     @HostListener('window:resize')
     refreshTabWidths(): void {
        if ( !this._tabs || !this._tabBar ) {
            return;
        }

        if (this._moreButton) {
            this._moreButton.closePopover();
        }
        if ( this._tabsTotalWidth === 0 || this._tabWidths.length !== this._tabs.length ) {
            this._collectTabWidths();
        }

        this._moreList = [];
        this._collapse = false;

        // If the tab bar has zero width, it is not currently visible and we should skip calculations
        if (this._tabBar.nativeElement.clientWidth <= 0) {
            return;
        }

        // for cases where we want to just show what we can and hide the rest
        if (this.overflowStyle === 'none') {
            this._tabs.forEach(t => t.show());
            return;
        }

        const tabContainerWidth: number = this._tabBar.nativeElement.offsetWidth;


        // we'll make sure the selected tab is always shown, even if it was going to be in the overflow
        const selectedTabIndex = this._tabs.toArray().findIndex(t => t._active);
        let curLinks = selectedTabIndex > -1 ? this._tabWidths[selectedTabIndex] : 0;

        // Step through the links until we hit the end of the container, then collapse the
        // remaining into a more menu
        this._tabs.forEach((t, i) => {
            if (t._active) {
                t.show();
                return;
            }
            curLinks += this._tabWidths[i];

            // Account for the width of either the more button or the two arrow buttons
            const overflowType: number = this.overflowStyle === 'more' ? 93 : 68;
            const moreWidth: number = this._tabsTotalWidth > tabContainerWidth ? overflowType : 0;

            if (curLinks + moreWidth < tabContainerWidth) {
                t.show();
            } else {
                this._collapse = true;
                if ( this.overflowStyle === 'more' ) {
                    t.hide();
                    this._moreList.push(t);
                } else {
                    t.show();
                }
            }
        });

        if ( this.overflowStyle === 'arrows' && this._collapse ) {
            setTimeout(() => {
                this._tabArrowCheck();
            });
        }
    }

    _moreClick(event: Event, tab: TabComponent): void {
        if (this._moreButton) {
            this._moreButton.closePopover();
        }

        tab.tabClickHandler( event );
    }

    tabArrowInterval = interval(100);

    _handleTabsWheel(event: WheelEvent): void {
        const scrollDirection = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? Math.sign(event.deltaX) : Math.sign(event.deltaY);
        const scrollDistance = Math.sqrt(Math.pow(event.deltaX, 2) + Math.pow(event.deltaY, 2)) * scrollDirection;
        const scrollLeft = scrollDistance < 0 && this._tabBar.nativeElement.scrollLeft > 0;
        const scrollRight = scrollDistance > 0
            && this._tabBar.nativeElement.offsetWidth !== this._tabBar.nativeElement.scrollWidth - this._tabBar.nativeElement.scrollLeft;

        if (scrollLeft || scrollRight) {
            event.preventDefault();
            event.stopPropagation();

            this._tabBar.nativeElement.scrollLeft += scrollDistance;
            this._tabArrowCheck();
        }
    }

    _tabArrowClick( scrollRight: boolean ): void {
        this._tabBar.nativeElement.scrollLeft += scrollRight ? 40 : -40;
        this._tabArrowCheck();
        this.tabArrowInterval.pipe(takeUntil(this._stopTabArrowSubject)).subscribe(() => {
            this._tabBar.nativeElement.scrollLeft += scrollRight ? 40 : -40;
            this._tabArrowCheck();
        });
        fromEvent<MouseEvent>(window.document, 'mouseup').pipe(take(1)).subscribe(() => {
            this._stopTabArrowSubject.next();
        });
    }

    _tabArrowTouch( scrollRight: boolean ): void {
        this._tabBar.nativeElement.scrollLeft += scrollRight ? 40 : -40;
        this._tabArrowCheck();
        this.tabArrowInterval.pipe(takeUntil(this._stopTabArrowSubject)).subscribe(() => {
            this._tabBar.nativeElement.scrollLeft += scrollRight ? 40 : -40;
            this._tabArrowCheck();
        });
        fromEvent<MouseEvent>(window.document, 'touchend').pipe(take(1)).subscribe(() => {
            this._stopTabArrowSubject.next();
        });
    }

    _tabArrowCheck(): void {
        this._tabArrowsEnabled[0] = this._tabBar.nativeElement.scrollLeft === 0 ? false : true;
        this._tabArrowsEnabled[1] = this._tabBar.nativeElement.offsetWidth === this._tabBar.nativeElement.scrollWidth - this._tabBar.nativeElement.scrollLeft ? false : true;
    }

    private setUpTabs(): void {
        if (this._tabs.length === 0) {
            throw tabComponentMissing();
        }

        if (this.defaultTab !== 'none') {
            this.defaultToFirstTab();
        }
        this.checkForRouterUse();
        this.setTabDirection();
        this.subscribeToTabClicks();
    }

    private _collectTabWidths() {
        this._tabWidths = [];
        this._tabsTotalWidth = 0;
        this._tabs.forEach(t => {
            const isHidden = t._hidden;
            t.show();
            this._tabsTotalWidth += t._getWidth();
            this._tabWidths.push(t._getWidth());
            if (isHidden) {
                t.hide();
            }
        });
    }

    private setTabDirection(): void {
        setTimeout(() =>
            this._tabs.forEach(t => {
                t._direction = this.direction;
                t._tight = this.tight;
            })
        );
    }

    private subscribeToTabClicks(): void {
        this._stopTabSubscriptionSubject.next();
        this._tabs.forEach(t => t.tabClick.pipe(takeUntil(this._stopTabSubscriptionSubject)).subscribe(() => this._setActive(t)));
    }

    /** Sets the currently selected tab by either its numerical index or `TabComponent` object.
     * Passing a value of -1 will deselect all tabs in the set. */
    selectTab(tab: number | TabComponent, shouldEmit = true): void {
        this._selectedTab = tab;
        if ( tab === -1 ) {
            this.tabContent = null;

            if ( this._routerEnabled ) {
                this._routerDeselected = true;
            }

            this._tabs.toArray().forEach(t => t._active = false);

            if (shouldEmit) {
                this.selectedTabChange.emit(new TabChangeEvent(-1, null));
            }
        } else {
            const activeTab = typeof tab === 'number' ? this._tabs.toArray()[tab] : tab;
            if ( this._routerEnabled ) {
                this.router.navigate([activeTab.routerLink], {relativeTo: this.route});
            }
            this._setActive(activeTab);
        }
    }

    _setActive(tab: TabComponent): void {
        let activeIndex = 0;
        this._tabs.toArray().forEach((t, index) => {
            t._active = false;
            if (t === tab) {
                activeIndex = index;
            }
        });
        tab._active = true;
        this.tabContent = tab.tabContent;
        this._routerDeselected = false;
        this.selectedTabChange.emit(new TabChangeEvent(activeIndex, tab));
        this.refreshTabWidths();
    }

    private defaultToFirstTab() {
        if (!this._tabs.find(tab => tab._active)) {
            // setTimeout to avoid change after checked error
            // when ngFor is used as projected nodes are registered
            // and stored as part of the existing view, not
            // the view in which they are projected
            // embedded views are checked *before* AfterContentInit
            // is triggered
            const tabArray = this._tabs.toArray();
            if (tabArray[Number(this.defaultTab)]) {
                setTimeout(() => this._setActive(tabArray[Number(this.defaultTab)]));
            } else {
                invalidDefaultTab(this.defaultTab);
            }
        }
    }

    private checkForRouterUse() {
        const countUsingRouter = this._tabs.filter(tab => tab.routerLink !== undefined).length;
        if (countUsingRouter > 0 && countUsingRouter < this._tabs.length) {
            const tabsMissingRouterLink = this._tabs.filter(tab => tab.routerLink === undefined);
            throwErrorForMissingRouterLink(tabsMissingRouterLink);
        }

        if (countUsingRouter === this._tabs.length) {
            this._routerEnabled = true;
            if (this._defaultTab !== 'none') {
                this.defaultToFirstRoute();
            }
        }
    }

    private defaultToFirstRoute() {
        const foundRoute = this._tabs
            .map(tab => tab.routerLink)
            .map(routerLink => this.mapRouterLinkToString(routerLink))
            .find(routerLink => {
                const currentRoute = this.router.url;
                return currentRoute === routerLink || currentRoute.indexOf(`${routerLink}/`) > -1;
            });

        if (foundRoute) {
            return;
        }

        const tabArray = this._tabs.toArray();
        if (tabArray[Number(this.defaultTab)]) {
            const firstRoute = this.mapRouterLinkToString(tabArray[Number(this.defaultTab)].routerLink);
            this.router.navigate([firstRoute], {relativeTo: this.route});
        }
    }

    private mapRouterLinkToString(routerLink: string | string[]): string {
        if (routerLink instanceof Array) {
            routerLink = routerLink.join('/').replace('//', '/');
        }
        return routerLink;
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
