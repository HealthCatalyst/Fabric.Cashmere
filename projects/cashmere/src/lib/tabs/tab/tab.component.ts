import {Component, Input, ContentChildren, QueryList, AfterContentInit, Output} from '@angular/core';
import {EventEmitter, TemplateRef, ViewChild} from '@angular/core';
import {HcTabTitleComponent} from './tab-title.component';

@Component({
    templateUrl: './tab.component.html',
    selector: `hc-tab`,
    styleUrls: ['./tab.component.scss']
})
export class TabComponent implements AfterContentInit {
    /** Plain text title of the tab; for HTML support include a `hc-tab-title` element */
    @Input()
    tabTitle: string = '';
    /** Router path that the tab routes to. If one tab uses the routerLink in a tab set, all must use the router link.
     * Can be specified as '/path/2' or ['path', '2']
     */
    @Input()
    routerLink: any[] | string;

    /** Emits when this tab is selected; use instead of `(click)` for click binding  */
    @Output()
    tabClick: EventEmitter<Event> = new EventEmitter();

    /** The template to be used when this tab is selected. Defaults to the content of this tab component.
     * Not used when the tab set uses routing. */
    @ViewChild('tabContent')
    tabContent: TemplateRef<any>;

    _direction: string;
    _active: boolean = false;
    _htmlTitle: HcTabTitleComponent;

    @ContentChildren(HcTabTitleComponent)
    _tabTitle: QueryList<HcTabTitleComponent>;

    ngAfterContentInit() {
        if (this._tabTitle) {
            this._htmlTitle = this._tabTitle.first;
        }
    }
}
