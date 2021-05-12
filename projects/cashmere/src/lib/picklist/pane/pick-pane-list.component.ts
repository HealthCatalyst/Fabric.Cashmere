import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { animationFrameScheduler, asapScheduler, fromEvent, Subject } from 'rxjs';
import { auditTime, takeUntil } from 'rxjs/operators';
import { PickPaneListService, PanelDimensions } from './pick-pane-list.service';
import { PickOption } from '../pick.types';
import { isDefined } from '../../util';

const SCROLL_SCHEDULER = typeof requestAnimationFrame !== 'undefined' ? animationFrameScheduler : asapScheduler;

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'hc-pick-pane-list',
    template: `
        <div #scroll class="hc-pick-pane-list-items hc-pick-pane-list-scroll-host">
            <div #padding [class.hc-pick-pane-list-total-padding]="virtualScroll"></div>
            <div #content class="hc-pick-pane-list-scrollable-content"
                [class.hc-pick-pane-list-scrollable-content-virtual]="virtualScroll && items.length">
                    <ng-content></ng-content>
            </div>
        </div>
    `
})
/** Component that contains that displays options list and manages virtual scroll as needed.
 * @docs-private
*/
export class PickPaneListComponent implements OnInit, OnChanges, OnDestroy {
    @Input() items: PickOption[] = [];
    @Input() markedItem: PickOption;
    @Input() bufferAmount: number;
    @Input() virtualScroll = false;
    @Input() filterValue: string;
    @Output() update = new EventEmitter<any[]>();
    @Output() scroll = new EventEmitter<{ start: number; end: number }>();
    @Output() scrollToEnd = new EventEmitter<void>();
    @ViewChild('content', { read: ElementRef, static: true }) contentElementRef: ElementRef;
    @ViewChild('scroll', { read: ElementRef, static: true }) scrollElementRef: ElementRef;
    @ViewChild('padding', { read: ElementRef, static: true }) paddingElementRef: ElementRef;

    public readonly _panel: HTMLElement;
    private readonly _destroy$ = new Subject<void>();
    private _virtualPadding: HTMLElement;
    private _scrollablePanel: HTMLElement;
    private _contentPanel: HTMLElement;
    private _scrollToEndFired = false;
    private _updateScrollHeight = false;
    private _lastScrollPosition = 0;

    constructor(private _zone: NgZone, private _panelService: PickPaneListService, _elementRef: ElementRef) {
        this._panel = _elementRef.nativeElement;
    }

    private _itemsLength: number;

    private get itemsLength() {
        return this._itemsLength;
    }

    private set itemsLength(value: number) {
        if (value !== this._itemsLength) {
            this._itemsLength = value;
            this._onItemsLengthChanged();
        }
    }

    private get _startOffset() {
        if (this.markedItem) {
            const { itemHeight, panelHeight } = this._panelService.dimensions;
            const offset = (this.markedItem.index || 0) * itemHeight;
            return panelHeight > offset ? 0 : offset;
        }
        return 0;
    }

    ngOnInit(): void {
        this._virtualPadding = this.paddingElementRef.nativeElement;
        this._scrollablePanel = this.scrollElementRef.nativeElement;
        this._contentPanel = this.contentElementRef.nativeElement;
        this._handleScroll();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.items) {
            const change = changes.items;
            this._onItemsChange(change.currentValue, change.firstChange);
        }
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
        this._destroy$.unsubscribe();
    }

    scrollTo(option: PickOption, startFromOption = false): void {
        if (!option) {
            return;
        }

        const index = this.items.indexOf(option);
        if (index < 0 || index >= this.itemsLength) {
            return;
        }

        let scrollTo: number | null;
        if (this.virtualScroll) {
            const itemHeight = this._panelService.dimensions.itemHeight;
            scrollTo = this._panelService.getScrollTo(index * itemHeight, itemHeight, this._lastScrollPosition);
        } else {
            const item: HTMLElement | null = this._panel.querySelector(`#${option.htmlId}`);
            const lastScroll = startFromOption ? item?.offsetTop || 0 : this._lastScrollPosition;
            scrollTo = this._panelService.getScrollTo(item?.offsetTop || 0, item?.clientHeight || 0, lastScroll);
        }

        if (scrollTo || scrollTo === 0) {
            this._scrollablePanel.scrollTop = scrollTo;
        }
    }

    scrollToCustomOption(): void {
        const panel = this._scrollablePanel;
        panel.scrollTop = panel.scrollHeight - panel.clientHeight;
    }

    public refreshListLayout(isInitialList: boolean): void {
        if (this.virtualScroll) {
            this._updateItemsRange(isInitialList);
        } else {
            this._setVirtualHeight();
            this._updateItems(isInitialList);
        }
    }

    private _handleScroll() {
        this._zone.runOutsideAngular(() => {
            fromEvent(this.scrollElementRef.nativeElement, 'scroll')
                .pipe(takeUntil(this._destroy$), auditTime(0, SCROLL_SCHEDULER))
                .subscribe((e: { path, composedPath, target }) => {
                    const path = e.path || (e.composedPath && e.composedPath());
                    const scrollTop = path.length === 0 ? e.target.scrollTop : path[0].scrollTop;
                    this._onContentScrolled(scrollTop);
                });
        });
    }

    private _onItemsChange(items: PickOption[], firstChange: boolean) {
        this.items = items || [];
        this._scrollToEndFired = false;
        this.itemsLength = items.length;

        this.refreshListLayout(firstChange);
    }

    private _updateItems(firstChange: boolean) {
        this.update.emit(this.items);
        if (firstChange === false) {
            return;
        }

        this._zone.runOutsideAngular(() => {
            Promise.resolve().then(() => {
                const panelHeight = this._scrollablePanel.clientHeight;
                this._panelService.setDimensions(0, panelHeight);
                this.scrollTo(this.markedItem, firstChange);
            });
        });
    }

    private _updateItemsRange(firstChange: boolean) {
        this._zone.runOutsideAngular(() => {
            this._measureDimensions().then(() => {
                if (firstChange) {
                    this._renderItemsRange(this._startOffset);
                } else {
                    this._renderItemsRange();
                }
            });
        });
    }

    private _onContentScrolled(scrollTop: number) {
        if (this.virtualScroll) {
            this._renderItemsRange(scrollTop);
        }
        this._lastScrollPosition = scrollTop;
        this._fireScrollToEnd(scrollTop);
    }

    private _updateVirtualHeight(height: number) {
        if (this._updateScrollHeight) {
            this._virtualPadding.style.height = `${height}px`;
            this._updateScrollHeight = false;
        }
    }

    private _setVirtualHeight() {
        if (!this._virtualPadding) { return; }
        this._virtualPadding.style.height = `0px`;
    }

    private _onItemsLengthChanged() {
        this._updateScrollHeight = true;
    }

    private _renderItemsRange(scrollTop: number | null = null) {
        if (scrollTop && this._lastScrollPosition === scrollTop) { return; }

        scrollTop = scrollTop || this._scrollablePanel.scrollTop;
        const range = this._panelService.calculateItems(scrollTop, this.itemsLength, this.bufferAmount);
        this._updateVirtualHeight(range.scrollHeight);
        this._contentPanel.style.transform = `translateY(${range.topPadding}px)`;

        this._zone.run(() => {
            this.update.emit(this.items.slice(range.start, range.end));
            this.scroll.emit({ start: range.start, end: range.end });
        });

        if (isDefined(scrollTop) && this._lastScrollPosition === 0) {
            this._scrollablePanel.scrollTop = scrollTop;
            this._lastScrollPosition = scrollTop;
        }
    }

    private _measureDimensions(): Promise<PanelDimensions> {
        if (this._panelService.dimensions.itemHeight > 0 || this.itemsLength === 0) {
            return Promise.resolve(this._panelService.dimensions);
        }

        const [first] = this.items.filter(i => !i.isParent);
        this.update.emit([first]);

        return Promise.resolve().then(() => {
            const option = this._panel.querySelector(`#${first.htmlId}`);
            const optionHeight = option?.clientHeight || 0;
            this._virtualPadding.style.height = `${optionHeight * this.itemsLength}px`;
            const panelHeight = this._scrollablePanel.clientHeight;
            this._panelService.setDimensions(optionHeight, panelHeight);

            return this._panelService.dimensions;
        });
    }

    private _fireScrollToEnd(scrollTop: number) {
        if (this._scrollToEndFired || scrollTop === 0) { return; }

        const padding = this.virtualScroll ?
            this._virtualPadding :
            this._contentPanel;

        if (scrollTop + this._panel.clientHeight >= padding.clientHeight) {
            this._zone.run(() => this.scrollToEnd.emit());
            this._scrollToEndFired = true;
        }
    }
}
