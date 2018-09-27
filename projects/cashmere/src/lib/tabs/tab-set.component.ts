import {AfterContentInit, Component, ContentChildren, Input, QueryList} from '@angular/core';
import {TabComponent} from './tab.component';
import {ActivatedRoute, Router} from '@angular/router';

export function throwErrorForMissingRouterLink(tabsWithoutRouterLink: TabComponent[]) {
    const tabTitles = tabsWithoutRouterLink.map(tab => tab.tabTitle);
    throw Error(`Routerlink missing on ${tabTitles.join(',')}`);
}

@Component({
    selector: `hc-tab-set`,
    templateUrl: './tab-set.component.html',
    styleUrls: ['../sass/_tabs.scss']
})
export class TabSetComponent implements AfterContentInit {
    _routerEnabled: boolean = false;

    @ContentChildren(TabComponent) _tabs: QueryList<TabComponent>;

    /** Optional: Specify direction of the tabs. Defaults to vertical */
    @Input() direction: 'horizontal' | 'vertical' = 'vertical';

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngAfterContentInit(): void {
        this.defaultToFirstTab();
        this.checkForRouterUse();

        this._tabs.changes.subscribe(() => {
            this.defaultToFirstTab();
            this.checkForRouterUse();
        });
    }

    _setActive(tab: TabComponent) {
        this._tabs.forEach(t => (t._active = false));
        tab._active = true;
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
