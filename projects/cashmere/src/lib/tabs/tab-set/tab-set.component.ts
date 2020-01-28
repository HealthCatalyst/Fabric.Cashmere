import {AfterContentInit, Component, ContentChildren, Input, QueryList, Output} from '@angular/core';
import {EventEmitter, TemplateRef} from '@angular/core';
import {TabComponent} from '../tab/tab.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {parseBooleanAttribute} from '../../util';

export class TabChangeEvent {
    constructor(public index: number, public tab: TabComponent) {}
}

export function throwErrorForMissingRouterLink(tabsWithoutRouterLink: TabComponent[]) {
    const tabTitles = tabsWithoutRouterLink.map(tab => tab.tabTitle);
    throw Error(`Routerlink missing on ${tabTitles.join(',')}`);
}

const supportedDirections = ['horizontal', 'vertical'];

export function validateDirectionInput(inputStr: string) {
    if (supportedDirections.indexOf(inputStr) < 0) {
        throw Error('Unsupported tab direction value: ' + inputStr);
    }
}

export function tabComponentMissing(): Error {
    return new Error(`TabSet must contain at least one TabComponent. Make sure to add a hc-tab to the hc-tab-set element.`);
}

export function invalidDefaultTab(tabVal: string | number) {
    throw Error('Invalid default tab value: ' + tabVal + ". Must be 'none' or a value less than the total number of tabs in the set.");
}

@Component({
    selector: `hc-tab-set`,
    templateUrl: './tab-set.component.html',
    styleUrls: ['./tab-set.component.scss']
})
export class TabSetComponent implements AfterContentInit {
    _routerEnabled: boolean = false;
    private _direction: string = 'vertical';
    private _defaultTab: string | number = 0;
    private _stopTabSubscriptionSubject: Subject<any> = new Subject();

    /** The content to be displayed for the currently selected tab.
     * This is read from the tab when it is selected.
     * Not used when this component uses routing.
     */
    tabContent: TemplateRef<any>;

    @ContentChildren(TabComponent)
    _tabs: QueryList<TabComponent>;

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

    set addContentContainer(value) {
       this._addContentContainer = parseBooleanAttribute(value);
    }

    _addContentContainer: boolean = true;

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngAfterContentInit(): void {
        this.setUpTabs();
        this._tabs.changes.subscribe(() => this.setUpTabs());
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

    private setTabDirection(): void {
        setTimeout(() => this._tabs.forEach(t => (t._direction = this.direction)));
    }

    private subscribeToTabClicks(): void {
        this._stopTabSubscriptionSubject.next();
        this._tabs.forEach(t => t.tabClick.pipe(takeUntil(this._stopTabSubscriptionSubject)).subscribe(() => this._setActive(t)));
    }

    /** Sets the currently selected tab by either its numerical index or `TabComponent` object  */
    selectTab(tab: number | TabComponent) {
        if (typeof tab === 'number') {
            let i: number = 0;

            this._tabs.forEach(t => {
                if (i === tab) {
                    this._setActive(t);
                }
                i++;
            });
        } else {
            this._setActive(tab);
        }
    }

    _setActive(tab: TabComponent) {
        let selectedTab: number = 0;
        let index: number = 0;

        this._tabs.forEach(t => {
            if (t === tab) {
                selectedTab = index;
            }
            t._active = false;
            index++;
        });

        tab._active = true;
        this.tabContent = tab.tabContent;
        this.selectedTabChange.emit(new TabChangeEvent(selectedTab, tab));
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
                let currentRoute = this.router.url;
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

    private mapRouterLinkToString(routerLink: string | any[]): string {
        if (routerLink instanceof Array) {
            routerLink = routerLink.join('/').replace('//', '/');
        }
        return routerLink;
    }
}
