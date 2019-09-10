import {
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    SimpleChanges
} from '@angular/core';
import {DatePipe} from '@angular/common';
import {OverlayRef} from '@angular/cdk/overlay';
import {CalendarOverlayService} from '../services/calendar-overlay.service';
import {DateRange, DateRangeOptions} from '../model/model';
import {ConfigStoreService} from '../services/config-store.service';

@Directive({
    selector: '[hcDateRange]',
    providers: [CalendarOverlayService, ConfigStoreService, DatePipe]
})
export class DateRangeDirective implements OnInit, OnDestroy, OnChanges {
    /** Emits when date range is been changed. */
    @Output()
    readonly selectedDateRangeChanged: EventEmitter<DateRange> = new EventEmitter<DateRange>();

    /** Selected date range. */
    @Input()
    selectedDate: DateRange;

    /** Configuration to setup behavior of component. */
    @Input()
    options: DateRangeOptions;

    private _overlayRef: OverlayRef;

    constructor(
        private _elementRef: ElementRef<HTMLInputElement>,
        private calendarOverlayService: CalendarOverlayService,
        public configStoreService: ConfigStoreService,
        private renderer: Renderer2
    ) {
        configStoreService.rangeUpdate$.subscribe((daterange: DateRange) => {
            this.selectedDateRangeChanged.emit(daterange);
        });

        renderer.addClass(_elementRef.nativeElement, 'hc-date-range');
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        if (this._overlayRef) {
            this._overlayRef.detach();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['options']) {
            const options: DateRangeOptions = changes['options'].currentValue;
            this.configStoreService.updateDateRangeOptions(options);
        }
        if (changes['selectedDate']) {
            const selectedDate: DateRange = changes['selectedDate'].currentValue;
            this.configStoreService.updateRange(selectedDate);
        }
    }

    @HostListener('click')
    _onClick() {
        this._overlayRef = this.calendarOverlayService.open(this._elementRef);
    }
}
