import { Component, Input, ContentChildren, AfterContentInit, QueryList } from '@angular/core';
import { TabComponent } from './tab.component';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';

export type TabDirection = 'horizontal' | 'vertical';

export function throwErrorForMissingRouterLink(tabsWithoutRouterLink: TabComponent[]) {
    const tabTitles = tabsWithoutRouterLink.map(tab => tab.title);
    throw Error(`Routerlink missing on ${tabTitles.join(',')}`);
}

@Component({
    template: `
            <div class="tab-bar-{{direction}}">
                <div *ngFor="let tab of tabs">
                    <a *ngIf="routerEnabled" class="tab-{{direction}}"
                       [routerLink]="tab.routerLink"
                       routerLinkActive="active"
                       (click)="setActive(tab)">
                          {{tab.title}}
                    </a>
                    <a *ngIf="!routerEnabled" class="tab-{{direction}}"
                       [class.active]="tab.active"
                       (click)="setActive(tab)">
                          {{tab.title}}
                    </a>

                </div>
            </div>
            <div class="tab-content-{{direction}}">
                 <router-outlet *ngIf="routerEnabled"></router-outlet>
                 <ng-content *ngIf="!routerEnabled"></ng-content>
             </div>
           `,
    selector: `hc-tab-set`,
    styleUrls: ['./tab-set.component.scss']
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
            this.setActive(this.tabs.first);
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
        const foundRoute = this.tabs.find(tab => tab.routerLink === this.router.url);
        if (foundRoute) {
            return;
        }
        const firstRoute = this.tabs.first.routerLink;
        this.router.navigate([firstRoute], { relativeTo: this.route });
    }
}
