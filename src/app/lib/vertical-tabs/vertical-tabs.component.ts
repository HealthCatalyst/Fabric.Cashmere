import { Component, Input, ContentChildren, AfterContentInit, QueryList } from '@angular/core';
import { VerticalTabComponent } from './vertical-tab.component';

@Component({
  template: `
            <div class="tab-bar">
                <div *ngFor="let tab of tabs"
                     class="tab"
                     [class.active]="tab.active"
                     (click)="setActive(tab)">
                          {{tab.title}}
                </div>
            </div>
            <div class="tab-content">
                 <ng-content></ng-content>
             </div>
           `,
  selector: `hc-vertical-tabs`,
  styleUrls: ['./vertical-tabs.component.scss']
})
export class VerticalTabsComponent implements AfterContentInit {
  @ContentChildren(VerticalTabComponent) tabs: QueryList<VerticalTabComponent>;

  public setActive(verticalTab: VerticalTabComponent) {
    this.tabs.forEach(tab => tab.active = false);
    verticalTab.active = true;
  }

  ngAfterContentInit() {
    if (this.tabs.first) {
      this.tabs.first.active = true;
    }
  }

}