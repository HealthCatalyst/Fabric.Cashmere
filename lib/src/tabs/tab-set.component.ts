import {AfterContentInit, Component, ContentChildren, Input, QueryList} from '@angular/core';
import {TabComponent} from './tab.component';
import {ActivatedRoute, Router} from '@angular/router';

export type TabDirection = 'horizontal' | 'vertical';

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
    routerEnabled: boolean = false;

    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

    @Input() direction: TabDirection = 'vertical';

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngAfterContentInit(): void {
        this.tabs.changes.subscribe(_ => {
            this.defaultToFirstTab();
            this.checkForRouterUse();
        });
    }

    setActive(tab: TabComponent) {
        this.tabs.forEach(t => (t.active = false));
        tab.active = true;
    }

    private defaultToFirstTab() {
        if (!this.tabs.find(tab => tab.active)) {
            // setTimeout to avoid change after checked error
            // when ngFor is used as projected nodes are registered
            // and stored as part of the existing view, not
            // the view in which they are projected
            // embedded views are checked *before* AfterContentInit
            // is triggered
            setTimeout(() => this.setActive(this.tabs.first));
        }
    }

    private checkForRouterUse() {
        const countUsingRouter = this.tabs.filter(tab => tab.routerLink !== undefined).length;
        if (countUsingRouter > 0 && countUsingRouter < this.tabs.length) {
            const tabsMissingRouterLink = this.tabs.filter(tab => tab.routerLink === undefined);
            throwErrorForMissingRouterLink(tabsMissingRouterLink);
        }

        if (countUsingRouter === this.tabs.length) {
            this.routerEnabled = true;
            this.defaultToFirstRoute();
        }
    }

    private defaultToFirstRoute() {
        const foundRoute = this.tabs
            .map(tab => tab.routerLink)
            .map(routerLink => this.mapRouterLinkToString(routerLink))
            .find(routerLink => {
                let currentRoute = this.router.url;
                return currentRoute === routerLink || currentRoute.indexOf(`${routerLink}/`) > -1;
            });

        if (foundRoute) {
            return;
        }

        const firstRoute = this.mapRouterLinkToString(this.tabs.first.routerLink);
        this.router.navigate([firstRoute], {relativeTo: this.route});
    }

    private mapRouterLinkToString(routerLink: string | any[]): string {
        if (routerLink instanceof Array) {
            routerLink = routerLink.join('/').replace('//', '/');
        }
        return routerLink;
    }
}
