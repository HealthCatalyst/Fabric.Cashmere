import {OnInit, Output, EventEmitter, Input, OnDestroy, ChangeDetectorRef, ElementRef, Directive, HostListener} from '@angular/core';
import {DatePipe} from '@angular/common';
import {OverlayRef} from '@angular/cdk/overlay';
import {CalendarOverlayService} from '../services/calendar-overlay.service';
import {RangeStoreService} from '../services/range-store.service';
import {DateRange, DateRangeOptions} from '../model/model';
import {ConfigStoreService} from '../services/config-store.service';
import {Subscription} from 'rxjs';

@Directive({
    selector: '[hcDateRange]',
    providers: [CalendarOverlayService, RangeStoreService, ConfigStoreService, DatePipe]
})
export class DateRangeDirective implements OnInit, OnDestroy {
    /** Emits when date range is been changed. */
    @Output()
    readonly selectedDateRangeChanged: EventEmitter<DateRange> = new EventEmitter<DateRange>();

    /** Configuration to setup behavior of component. */
    @Input()
    options: DateRangeOptions;

    private _rangeUpdate$: Subscription;

    private _overlayRef: OverlayRef;

    constructor(
        private _elementRef: ElementRef<HTMLInputElement>,
        private changeDetectionRef: ChangeDetectorRef,
        private calendarOverlayService: CalendarOverlayService,
        public rangeStoreService: RangeStoreService,
        public configStoreService: ConfigStoreService
    ) {}

    ngOnInit() {
        this.configStoreService.DateRangeOptions = this.options;
        this.options.placeholder = this.options.placeholder || 'Choose a date';
        this._rangeUpdate$ = this.rangeStoreService.rangeUpdate$.subscribe(range => {
            this.selectedDateRangeChanged.emit(range);
        });

        this.rangeStoreService.updateRange(this.options.range.fromDate, this.options.range.toDate);
        this.changeDetectionRef.detectChanges();
    }

    ngOnDestroy() {
        if (this._rangeUpdate$) {
            this._rangeUpdate$.unsubscribe();
        }

        if (this._overlayRef) {
            this._overlayRef.detach();
        }
    }

    @HostListener('click')
    _onClick() {
        this._overlayRef = this.calendarOverlayService.open(this._elementRef);
    }

    /** Set current DateRange. */
    public setDateRange(range: DateRange) {
        this.rangeStoreService.updateRange(range.fromDate, range.toDate);
    }
}
