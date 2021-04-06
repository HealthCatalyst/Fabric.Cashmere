import {OnInit, Output, EventEmitter, Input, OnDestroy, ElementRef, Directive, HostListener, OnChanges, SimpleChanges} from '@angular/core';
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

    /** Sets the selected date range. Accepts either a `DateRange` or a numerical index for preset. */
    @Input()
    selectedDate: number | DateRange;

    /** Emits either a numerical index for the selected preset, or a `DateRange` if the selected value is not a preset */
    @Output()
    readonly selectedPresetChanged: EventEmitter<number | DateRange> = new EventEmitter<number | DateRange>();

    /** Configuration to setup behavior of component. */
    @Input()
    options: DateRangeOptions;

    private _overlayRef: OverlayRef;

    constructor(
        private _elementRef: ElementRef<HTMLInputElement>,
        private calendarOverlayService: CalendarOverlayService,
        public configStoreService: ConfigStoreService
    ) {
        configStoreService.rangeUpdate$.subscribe((daterange: DateRange) => {
            this.selectedDateRangeChanged.emit(daterange);
        });
        configStoreService.presetUpdate$.subscribe((preset: number | DateRange) => {
            this.selectedPresetChanged.emit(preset);
        });
    }

    ngOnInit() {}

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
            const selectedDate: number | DateRange = changes['selectedDate'].currentValue;

            if ( typeof selectedDate === 'number' ) {
                this.configStoreService.updatePreset(selectedDate);
            } else {
                this.configStoreService.updateRange(selectedDate);
            }
        }
    }

    @HostListener('click')
    _onClick() {
        this._overlayRef = this.calendarOverlayService.open(this._elementRef, this.options.center!);
    }
}
