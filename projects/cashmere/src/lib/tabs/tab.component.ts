import {Component, Input, ContentChildren, QueryList, AfterViewChecked, AfterContentInit} from '@angular/core';
import {HcTabTitleComponent} from './tab-title.component';

@Component({
    template: `<div [hidden]="!_active">
             <ng-container *ngIf="false"><ng-content select="hc-tab-title"></ng-content></ng-container>
             <ng-content></ng-content>
             </div>`,
    selector: `hc-tab`,
    styles: []
})
export class TabComponent implements AfterContentInit {
    /** Plain text title of the tab; for HTML support include a `hc-tab-title` element */
    @Input() tabTitle: string = '';
    /** Router path that the tab routes to. If one tab uses the routerLink in a tab set, all must use the router link.
     * Can be specified as '/path/2' or ['path', '2']
     */
    @Input() routerLink: any[] | string;
    _active: boolean = false;

    _htmlTitle: HcTabTitleComponent;

    @ContentChildren(HcTabTitleComponent) _tabTitle: QueryList<HcTabTitleComponent>;

    ngAfterContentInit() {
        if (this._tabTitle) {
            this._htmlTitle = this._tabTitle.first;
        }
    }
}
