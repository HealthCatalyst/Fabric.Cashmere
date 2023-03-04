import {Component, Input, ContentChildren, AfterContentInit, Output, ViewEncapsulation, HostBinding, HostListener, ElementRef} from '@angular/core';
import type {QueryList} from '@angular/core';
import {EventEmitter, TemplateRef, ViewChild} from '@angular/core';
import {HcTabTitleComponent} from './tab-title.component';
import {Params} from '@angular/router';
import {parseBooleanAttribute} from '../../util';

@Component({
    templateUrl: './tab.component.html',
    selector: `hc-tab`,
    styleUrls: ['./tab.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TabComponent implements AfterContentInit {
    @HostBinding('class.hc-tab') _hostClass = true;
    @HostBinding('class.hc-tab-active') _active = false;

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

    /** Overrides the default Angular hidden behavior to support overflow states; ngIf is also supported to hide tabs */
    @Input()
    get hidden(): boolean {
        return this._hidden || this._hideOverride;
    }
    set hidden( val: string | boolean ) {
        if ( parseBooleanAttribute( val ) ) {
            this._hide();
            this._hideOverride = true;
        } else {
            this._show();
            this._hideOverride = false;
        }
        this._tabHideChange.emit();
    }
    _hideOverride = false;

    @Output()
    _tabHideChange: EventEmitter<Event> = new EventEmitter();

    @Output()
    _routerActiveChange: EventEmitter<TabComponent> = new EventEmitter();

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
    _tight = false;
    _hidden = false;
    _htmlTitle: HcTabTitleComponent;

    @ContentChildren(HcTabTitleComponent)
    _tabTitle: QueryList<HcTabTitleComponent>;

    constructor( public _el: ElementRef ) {}

    ngAfterContentInit(): void {
        if (this._tabTitle) {
            this._htmlTitle = this._tabTitle.first;
        }
    }

    @HostListener('keydown.enter', ['$event']) _onEnter($event: KeyboardEvent): void {
        this._tabClickHandler($event);
    }

    _tabClickHandler(event: Event): void {
        // Prevent a tab anchor click from also calling the router on the host element
        event.preventDefault();
        event.stopPropagation();

        this.tabClick.emit(event);
    }

    _getWidth(): number {
        return this._el.nativeElement.scrollWidth;
    }

    // Listens for changes to routerLinkActive and reports to TabSet
    _isActiveChange( state: boolean ): void {
        if ( state ) {
            this._routerActiveChange.emit(this);
        }
    }

    /** Used by the overflow functionality to hide the tab */
    _hide(): void {
        this._hidden = true;
        this._hostIndex = -1;
    }

    /** Used by the overflow functionality to show the tab */
    _show(): void {
        this._hidden = false;
        this._hostIndex = 0;
    }
}
