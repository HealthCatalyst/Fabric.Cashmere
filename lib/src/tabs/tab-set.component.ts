import { Component, Input, ContentChildren, AfterContentInit, QueryList } from '@angular/core';
import { TabComponent } from './tab.component';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';

export type TabDirection = 'horizontal' | 'vertical';

export function throwErrorForMissingRouterLink(tabsWithoutRouterLink: TabComponent[]) {
    const tabTitles = tabsWithoutRouterLink.map(tab => tab.tabTitle);
    throw Error(`Routerlink missing on ${tabTitles.join(',')}`);
}

@Component({
    template: `
        <div class="hc-{{direction}}-tab-container">
            <div class="hc-tab-bar-{{direction}}">
                <div *ngFor="let tab of tabs">
                    <a *ngIf="routerEnabled" class="hc-tab-{{direction}}"
                       [routerLink]="tab.routerLink"
                       routerLinkActive="active"
                       (click)="setActive(tab)">
                          {{tab.tabTitle}}
                    </a>
                    <a *ngIf="!routerEnabled" class="hc-tab-{{direction}}"
                       [class.active]="tab.active"
                       (click)="setActive(tab)">
                          {{tab.tabTitle}}
                    </a>

                </div>
            </div>
            <div class="hc-tab-content-{{direction}}">
                 <router-outlet *ngIf="routerEnabled"></router-outlet>
                 <ng-content *ngIf="!routerEnabled"></ng-content>
             </div>
        </div>
    `,
    selector: `hc-tab-set`,
    styleUrls: ['../sass/_tabs.scss']
})
export class TabSetComponent implements AfterContentInit {
    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
    @Input() direction: TabDirection = 'vertical';
    routerEnabled: boolean = false;

    constructor(private router: Router, private route: ActivatedRoute) {}

    setActive(tab: TabComponent) {
        this.tabs.forEach(t => (t.active = false));
        tab.active = true;
    }

    ngAfterContentInit() {
        this.defaultToFirstTab();
        this.checkForRouterUse();
    }

    private defaultToFirstTab() {
        if (this.tabs.first) {
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
        if (this.tabs.length > 0) {
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
    }

    private defaultToFirstRoute() {
        const foundRoute =
            this.tabs
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
        this.router.navigate([firstRoute], { relativeTo: this.route });
    }

    private mapRouterLinkToString(routerLink: string | any[]): string {
        if (routerLink instanceof Array) {
            routerLink = routerLink.join('/').replace('//', '/');
        }
        return routerLink;
    }
}
