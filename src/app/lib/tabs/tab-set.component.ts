import { Component, Input, ContentChildren, AfterContentInit, QueryList } from '@angular/core';
import { TabComponent } from './tab.component';

export type TabDirection = 'horizontal' | 'vertical';

@Component({
    template: `
            <div class="tab-bar-{{direction}}">
                <div *ngFor="let tab of tabs"
                     class="tab-{{direction}}"
                     [class.active]="tab.active"
                     (click)="setActive(tab)">
                          {{tab.title}}
                </div>
            </div>
            <div class="tab-content-{{direction}}">
                 <ng-content></ng-content>
             </div>
           `,
    selector: `hc-tab-set`,
    styleUrls: ['./tab-set.component.scss']
})
export class TabSetComponent implements AfterContentInit {
    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
    @Input() direction: TabDirection = 'vertical';

    public setActive(tab: TabComponent) {
        this.tabs.forEach(t => t.active = false);
        tab.active = true;
    }

    ngAfterContentInit() {
        if (this.tabs.first) {
            this.tabs.first.active = true;
        }
    }

}
