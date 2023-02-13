import {Component, Input, ContentChildren, AfterContentInit, Output, ViewEncapsulation, HostBinding, HostListener, ElementRef} from '@angular/core';
import type {QueryList} from '@angular/core';
import {EventEmitter, TemplateRef, ViewChild} from '@angular/core';
import {HcTabTitleComponent} from './tab-title.component';
import {Params} from '@angular/router';

@Component({
    templateUrl: './tab.component.html',
    selector: `hc-tab`,
    styleUrls: ['./tab.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TabComponent implements AfterContentInit {
    @HostBinding('class.hc-tab') _hostClass = true;

    /** Plain text title of the tab; for HTML support include a `hc-tab-title` element */
    @Input()
    tabTitle = '';
    /** Router path that the tab routes to. If one tab uses the routerLink in a tab set, all must use the router link.
     * Can be specified as '/path/2' or ['path', '2']
     */
    @Input()
    routerLink: string[] | string;

    /** Add queryParams to the routerLink */
    @Input()
    queryParams: Params;

    /** Tab widths default to fit content; use maxWidth to constrain and truncate the content to a fixed width (e.g. `150px`)*/
    @Input()
    maxWidth = 'none';

    /** If set to true, [routerLinkActiveOptions]="{exact: true}" is added */
    @Input()
    exactRouteMatch: boolean;

    /** Emits when this tab is selected; use instead of `(click)` for click binding    */
    @Output()
    tabClick: EventEmitter<Event> = new EventEmitter();

    @HostBinding('attr.tabindex')
    _hostIndex = 0;

    /** The template to be used when this tab is selected. Defaults to the content of this tab component.
     * Not used when the tab set uses routing. */
    @ViewChild('tabContent')
    tabContent: TemplateRef<unknown>;

    _direction: string;
    _active = false;
    _tight = false;
    _hidden = false;
    _htmlTitle: HcTabTitleComponent;

    @ContentChildren(HcTabTitleComponent)
    _tabTitle: QueryList<HcTabTitleComponent>;

    constructor( public el: ElementRef ) {}

    ngAfterContentInit(): void {
        if (this._tabTitle) {
            this._htmlTitle = this._tabTitle.first;
        }
    }

    @HostListener('keydown.enter', ['$event']) _onEnter($event: KeyboardEvent): void {
        this.tabClickHandler($event);
    }

    tabClickHandler(event: Event): void {
        // Prevent a tab anchor click from also calling the router on the host element
        event.preventDefault();
        event.stopPropagation();

        this.tabClick.emit(event);
    }

    _getWidth(): number {
        return this.el.nativeElement.scrollWidth;
    }

    /** Disable visibility of component from view */
    hide(): void {
        this._hidden = true;
        this._hostIndex = -1;
    }

    /** Enable visibility of component from view */
    show(): void {
        this._hidden = false;
        this._hostIndex = 0;
    }
}
