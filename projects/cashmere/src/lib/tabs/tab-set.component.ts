import {AfterContentInit, Component, ContentChildren, Input, QueryList, Output, EventEmitter} from '@angular/core';
import {TabComponent} from './tab.component';
import {ActivatedRoute, Router} from '@angular/router';

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

@Component({
    selector: `hc-tab-set`,
    templateUrl: './tab-set.component.html',
    styleUrls: ['../sass/_tabs.scss']
})
export class TabSetComponent implements AfterContentInit {
    _routerEnabled: boolean = false;
    private _direction: string = 'vertical';

    @ContentChildren(TabComponent) _tabs: QueryList<TabComponent>;

    /** Emits when the selected tab is changed */
    @Output() selectChange: EventEmitter<TabChangeEvent> = new EventEmitter();

    /** Specify direction of tabs as either `horizontal` or `vertical`. Defaults to `vertical` */
    @Input()
    get direction(): string {
        return this._direction;
    }

    set direction(directionType: string) {
        validateDirectionInput(directionType);
        this._direction = directionType;
    }

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngAfterContentInit(): void {
        if (this._tabs.length === 0) {
            throw tabComponentMissing();
        }

        this.defaultToFirstTab();
        this.checkForRouterUse();

        this._tabs.changes.subscribe(() => {
            this.defaultToFirstTab();
            this.checkForRouterUse();
        });
    }

    _setActive(tab: TabComponent) {
        let selectedTab: number = 0;
        let index: number = 0;

        this._tabs.forEach(t => {
            if( t === tab) {
                selectedTab = index;
            }
            t._active = false;
            index++;
        });

        tab._active = true;
        this.selectChange.emit(new TabChangeEvent(selectedTab, tab));
    }

    private defaultToFirstTab() {
        if (!this._tabs.find(tab => tab._active)) {
            // setTimeout to avoid change after checked error
            // when ngFor is used as projected nodes are registered
            // and stored as part of the existing view, not
            // the view in which they are projected
            // embedded views are checked *before* AfterContentInit
            // is triggered
            setTimeout(() => this._setActive(this._tabs.first));
        }
    }

    private checkForRouterUse() {
        if (this._tabs.length === 0) {
            return;
        }
        const countUsingRouter = this._tabs.filter(tab => tab.routerLink !== undefined).length;
        if (countUsingRouter > 0 && countUsingRouter < this._tabs.length) {
            const tabsMissingRouterLink = this._tabs.filter(tab => tab.routerLink === undefined);
            throwErrorForMissingRouterLink(tabsMissingRouterLink);
        }

        if (countUsingRouter === this._tabs.length) {
            this._routerEnabled = true;
            this.defaultToFirstRoute();
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

        const firstRoute = this.mapRouterLinkToString(this._tabs.first.routerLink);
        this.router.navigate([firstRoute], {relativeTo: this.route});
    }

    private mapRouterLinkToString(routerLink: string | any[]): string {
        if (routerLink instanceof Array) {
            routerLink = routerLink.join('/').replace('//', '/');
        }
        return routerLink;
    }
}
