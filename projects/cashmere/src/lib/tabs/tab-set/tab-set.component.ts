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
import {Subject, interval, fromEvent, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, take, takeUntil} from 'rxjs/operators';
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
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class TabSetComponent implements AfterContentInit {
    _routerEnabled = false;
    _routerDeselected = false;
    _tabArrowsEnabled = [true, true];
    private _direction = 'vertical';
    private _defaultTab: string | number = 0;
    private _stopTabSubscriptionSubject: Subject<void> = new Subject();
    private _stopTabArrowSubject: Subject<void> = new Subject();
    private _widthRecheckSub: Subscription;
    private _tabWidths: Array<number> = [];
    private _tabsTotalWidth = 0;
    public _collapse = false;
    public _moreList: Array<TabComponent> = [];
    private _selectedTabSubject = new Subject<number | TabComponent>();
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

    /** **Write-only**: specify which tab is currently selected. Does not fire a `selectedTabChange` emission. */
    @Input()
    set selectedTab(selected: number | TabComponent) {
        if ( typeof selected === 'string' ) {
            selected = Number(selected);
        }
        this._selectedTabSubject.next(selected);
        // Make sure _selectedTab is set even if we're not subscribed to _selectedTabSubject yet
        this._selectedTab = selected;
    }

    /** Emits when the selected tab is changed. Use to keep track of the currently selected tab. */
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
     * will be immediately selected. Defaults to 0 (the first tab).
     * For tabs using routing, the default tab will be set by the url and use this value as a fallback if no tab routerLinks match the url.
     * **NOTE** - if using the `selectedTab` param, it will override this value. */
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
        if ( this._tabBar ) {
            this._tabBar.nativeElement.scrollLeft = 0;
        }
        this.refreshTabWidths();
    }
    private _overflowStyle = 'more';

    constructor(private router: Router, private route: ActivatedRoute, private changeDetector: ChangeDetectorRef, private el: ElementRef) {}

    ngAfterContentInit(): void {
        // Listeners to support the selectedTab param
        const selectedChanged$ = this._selectedTabSubject.pipe(distinctUntilChanged(),filter(nextTab => nextTab !== this._selectedTab));
        selectedChanged$.pipe(takeUntil(this.unsubscribe)).subscribe(selectedTab => {
            setTimeout(() => {
                this.selectTab(selectedTab, false);
                this.changeDetector.detectChanges();
            });
        });

        this.setUpTabs(false);
        this.refreshTabWidths();

        // If using routing, selectedTab isn't set, and routerLinkActive hasn't set any active tabs, default to the first route
        if ( this._routerEnabled ) {
            setTimeout(() => {
                const noActiveTabs = !this._tabs.some(t => t._active);
                if ( this.defaultTab !== 'none' && noActiveTabs ) {
                    const tabArray = this._tabs.toArray();
                    if ( tabArray[Number(this.defaultTab)] ) {
                        this.selectTab( tabArray[Number(this.defaultTab)] );
                    }
                }
            });
        }

        // If links are added dynamically, recheck the tab widths
        this._tabs.changes.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
            this.setUpTabs(true);
            setTimeout(() => {
                // Make sure all tabs are visible any time we are going to update the tab width array
                this._forceRecollect();
            });
        });
    }

    /** Forces a recalculation of the tabs to determine how many should be rolling into a More menu.
     * By default the function will use cached values of the tab widths;
     * if you've changed the title of a tab, set `forceRecalculate` to true to update the cache */
     @HostListener('window:resize')
     refreshTabWidths(forceRecalulate = false): void {
        if ( !this._tabs || !this._tabBar ) {
            return;
        }

        if (this._moreButton) {
            this._moreButton.closePopover();
        }

        this._moreList = [];
        this._collapse = false;

        // If the tab bar is hidden, we should skip calculations
        const tabStyles = getComputedStyle(this.el.nativeElement);
        if ( tabStyles.display === 'none' || tabStyles.visibility === 'hidden' ) {
            if ( this._widthRecheckSub ) {
                this._widthRecheckSub.unsubscribe();
            }
            return;
        }

        // for cases where we want to just show what we can and hide the rest
        if (this.overflowStyle === 'none') {
            this._tabs.forEach(t => t._show());
            return;
        }

        // The user is asking for an explicit recalculation of the cached tab widths
        // so we need to unhide any tabs currently in the more menu
        if ( forceRecalulate ) {
            this._forceRecollect();
        }

        // If the component hasn't fully rendered, start to loop to keep checking and only calculate widths when it has
        if ( this._tabWidths.length !== this._tabs.length || this._tabWidths.includes(0) ) {
            if ( !this._widthRecheckSub || this._widthRecheckSub.closed ) {
                const recheckInterval = interval(10);

                this._widthRecheckSub = recheckInterval.pipe(takeUntil(this.unsubscribe)).subscribe(loopCount => {
                    // If it's been a second and the tabs still haven't rendered, bailout and don't loop forever
                    if ( loopCount < 100 ) {
                        this._collectTabWidths();
                        this.refreshTabWidths();
                    } else {
                        this._widthRecheckSub.unsubscribe();
                    }
                });
            }
            return;
        } else {
            if ( this._widthRecheckSub ) {
                this._widthRecheckSub.unsubscribe();
            }
        }

        const tabContainerWidth: number = this._tabBar.nativeElement.offsetWidth;


        // we'll make sure the selected tab is always shown, even if it was going to be in the overflow
        const selectedTabIndex = this._tabs.toArray().findIndex(t => t._active);
        let curLinks = selectedTabIndex > -1 ? this._tabWidths[selectedTabIndex] : 0;

        // Step through the links until we hit the end of the container, then collapse the
        // remaining into a more menu
        this._tabs.forEach((t, i) => {
            if (t._active) {
                t._show();
                return;
            }
            if ( !t._hideOverride ) {
                curLinks += this._tabWidths[i];
            }

            // Account for the width of either the more button or the two arrow buttons
            const overflowType: number = this.overflowStyle === 'more' ? 93 : 68;
            const moreWidth: number = this._tabsTotalWidth > tabContainerWidth ? overflowType : 0;

            if (curLinks + moreWidth < tabContainerWidth) {
                if ( !t._hideOverride ) {
                    t._show();
                }
            } else {
                this._collapse = true;
                if ( this.overflowStyle === 'more' ) {
                    t._hide();
                    // Don't include a tab in the more menu that has its hidden param set to false
                    if ( !t._hideOverride ) {
                        this._moreList.push(t);
                    }
                } else {
                    t._show();
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

        tab._tabClickHandler( event );
    }

    _tabArrowInterval = interval(100);

    _handleTabsWheel(event: WheelEvent): void {
        const scrollDirection = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? Math.sign(event.deltaX) : Math.sign(event.deltaY);
        const scrollDistance = Math.sqrt(Math.pow(event.deltaX, 2) + Math.pow(event.deltaY, 2)) * scrollDirection;
        const scrollLeft = scrollDistance < 0 && Math.floor(this._tabBar.nativeElement.scrollLeft) > 0;
        const scrollRight = scrollDistance > 0
            && this._tabBar.nativeElement.scrollWidth - Math.ceil(this._tabBar.nativeElement.scrollLeft) > this._tabBar.nativeElement.offsetWidth;

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
        this._tabArrowInterval.pipe(takeUntil(this._stopTabArrowSubject)).subscribe(() => {
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
        this._tabArrowInterval.pipe(takeUntil(this._stopTabArrowSubject)).subscribe(() => {
            this._tabBar.nativeElement.scrollLeft += scrollRight ? 40 : -40;
            this._tabArrowCheck();
        });
        fromEvent<MouseEvent>(window.document, 'touchend').pipe(take(1)).subscribe(() => {
            this._stopTabArrowSubject.next();
        });
    }

    _tabArrowCheck(): void {
        this._tabArrowsEnabled[0] = Math.floor(this._tabBar.nativeElement.scrollLeft) === 0 ? false : true;
        this._tabArrowsEnabled[1] = this._tabBar.nativeElement.scrollWidth - Math.ceil(this._tabBar.nativeElement.scrollLeft) <= this._tabBar.nativeElement.offsetWidth ? false : true;
    }

    private setUpTabs(changeEvent: boolean): void {
        if (this._tabs.length === 0) {
            throw tabComponentMissing();
        }

        this.checkForRouterUse();

        if (!this._routerEnabled && this.defaultTab !== 'none' && !changeEvent) {
            this.defaultToFirstTab();
        }

        this.setTabDirection();
        this.subscribeToTabEvents();
    }

    private _forceRecollect(): void {
        this._tabs.forEach(t => t._show());
        this._collectTabWidths();
        this.refreshTabWidths();
    }

    private _collectTabWidths(): void {
        this._tabWidths = [];
        this._tabsTotalWidth = 0;
        this._tabs.forEach(t => {
            const tabWidthVal = t._hideOverride ? 1 : t._getWidth();
            this._tabsTotalWidth += tabWidthVal;
            this._tabWidths.push(tabWidthVal);
            if (t._hideOverride) {
                t._hide();
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

    private subscribeToTabEvents(): void {
        this._stopTabSubscriptionSubject.next();
        this._tabs.forEach(t => t.tabClick.pipe(takeUntil(this._stopTabSubscriptionSubject)).subscribe(() => this._setActive(t)));

        // If using tabs with routing, listen for changes to the routerLinkActive state
        if ( this._routerEnabled ) {
            this._tabs.forEach(t => t._routerActiveChange.pipe(takeUntil(this._stopTabSubscriptionSubject)).subscribe(tab => {
                this._setActive(tab, false);
            }));
        }

        // Watch for changes to a tab's [hidden] param to remove it from overflow calculations
        this._tabs.forEach(t => t._tabHideChange.pipe(takeUntil(this._stopTabSubscriptionSubject)).subscribe(() => {
            if ( t.hidden && t._active ) {
                this.selectTab(-1);
            }

            // Make sure all tabs are visible any time we are going to update the tab width array
            this._tabs.forEach(t => t._show());
            this._collectTabWidths();

            this.refreshTabWidths();
            this.changeDetector.detectChanges();
        }));
    }

    /** Sets the currently selected tab by either its numerical index or `TabComponent` object.
     * Passing a value of -1 or a hidden tab will deselect all tabs in the set. */
    selectTab(tab: number | TabComponent, shouldEmit = true): void {
        this._selectedTab = tab;
        const activeTab = typeof tab === 'number' ? this._tabs.toArray()[tab] : tab;

        if ( tab === -1 || activeTab?._hideOverride ) {
            this.tabContent = null;

            if ( this._routerEnabled ) {
                this._routerDeselected = true;
            }

            this._tabs.toArray().forEach(t => t._active = false);

            if (shouldEmit) {
                this.selectedTabChange.emit(new TabChangeEvent(-1, null));
            }
        } else if ( activeTab ) {
            if ( this._routerEnabled ) {
                const routeArray = Array.isArray(activeTab.routerLink) ? activeTab.routerLink : [activeTab.routerLink];
                this.router.navigate(routeArray, {relativeTo: this.route, queryParams: activeTab.queryParams});
            }
            this._setActive(activeTab, shouldEmit);
        }
    }

    _setActive(tab: TabComponent, shouldEmit = true): void {
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

        // For horizontal tabs with arrows overflow, scroll the selected tab into view if it's outside the scroll area
        if ( this.overflowStyle === 'arrows' && this.direction === 'horizontal' && this._collapse ) {
            tab._el.nativeElement.scrollIntoView({ block: 'nearest' });
        }

        if (shouldEmit) {
            this.selectedTabChange.emit(new TabChangeEvent(activeIndex, tab));
        }

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
            // If the selectedTab param is being used, respect that value before defaultTab
            if ( this._selectedTab ) {
                this.selectTab( this._selectedTab );
            } else {
                if (tabArray[Number(this.defaultTab)]) {
                    setTimeout(() => {
                        this._setActive(tabArray[Number(this.defaultTab)]);
                    });
                } else {
                    invalidDefaultTab(this.defaultTab);
                }
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

            // If the selectedTab param is being used, respect that value for the initially selected tab before the url or defaultTab
            if ( this._selectedTab ) {
                this.selectTab( this._selectedTab );
            }
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
