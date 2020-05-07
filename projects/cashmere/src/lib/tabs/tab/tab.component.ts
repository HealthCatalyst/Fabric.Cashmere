import {Component, Input, ContentChildren, QueryList, AfterContentInit, Output, ViewEncapsulation} from '@angular/core';
import {EventEmitter, TemplateRef, ViewChild} from '@angular/core';
import {HcTabTitleComponent} from './tab-title.component';
import {Params} from '@angular/router';

@Component({
    templateUrl: './tab.component.html',
    selector: `hc-tab`,
    styleUrls: ['./tab.component.scss'],
    host: {class: 'hc-tab'},
    encapsulation: ViewEncapsulation.None
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

    /** Add queryParams to the routerLink */
    @Input()
    queryParams: Params;

    /** If set to true, [routerLinkActiveOptions]="{exact: true}" is added */
    @Input()
    exactRouteMatch: boolean;

    /** Emits when this tab is selected; use instead of `(click)` for click binding    */
    @Output()
    tabClick: EventEmitter<Event> = new EventEmitter();

    /** The template to be used when this tab is selected. Defaults to the content of this tab component.
     * Not used when the tab set uses routing. */
    @ViewChild('tabContent', {static: false})
    tabContent: TemplateRef<any>;

    _direction: string;
    _active: boolean = false;
    _tight: boolean = false;
    _htmlTitle: HcTabTitleComponent;

    @ContentChildren(HcTabTitleComponent)
    _tabTitle: QueryList<HcTabTitleComponent>;

    ngAfterContentInit() {
        if (this._tabTitle) {
            this._htmlTitle = this._tabTitle.first;
        }
    }

    tabClickHandler(event: MouseEvent) {
        // Prevent a tab anchor click from also calling the router on the host element
        event.preventDefault();
        event.stopPropagation();

        this.tabClick.emit();
    }
}
