import {Output, EventEmitter, Input, OnDestroy, ElementRef, Directive, HostListener, OnChanges, SimpleChanges} from '@angular/core';
import {DatePipe} from '@angular/common';
import {OverlayRef} from '@angular/cdk/overlay';
import {CalendarOverlayService} from '../services/calendar-overlay.service';
import {DateRange, DateRangeOptions} from '../model/model';
import {ConfigStoreService} from '../services/config-store.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

/** Trigger the date range selector using the `hcDateRange` directive on a button or other clickable element  */
@Directive({
    selector: '[hcDateRange]',
    providers: [CalendarOverlayService, ConfigStoreService, DatePipe]
})
export class DateRangeDirective implements OnDestroy, OnChanges {
    /** Emits when date range is been changed. */
    @Output()
    readonly selectedDateRangeChanged: EventEmitter<DateRange> = new EventEmitter<DateRange>();

    /** Sets the selected date range. Accepts either a `DateRange` or a numerical index for preset. */
    @Input()
    selectedDate: number | DateRange;

    /** Emits either a numerical index for the selected preset, or a `DateRange` if the selected value is not a preset */
    @Output()
    readonly selectedPresetChanged: EventEmitter<number | DateRange> = new EventEmitter<number | DateRange>();

    /** Emits after the popover is closed; returns `null` on cancel or dismiss and a `DateRange` on apply */
    @Output()
    readonly closed: EventEmitter<null | DateRange> = new EventEmitter<null | DateRange>();

    /** Configuration to setup behavior of component. */
    @Input()
    options: DateRangeOptions;

    private _overlayRef: OverlayRef;
    private unsubscribe$ = new Subject<void>();

    constructor(
        private _elementRef: ElementRef<HTMLInputElement>,
        private calendarOverlayService: CalendarOverlayService,
        public _configStoreService: ConfigStoreService
    ) {
        _configStoreService.rangeUpdate$.pipe(takeUntil(this.unsubscribe$)).subscribe((daterange: DateRange) => {
            this.selectedDateRangeChanged.emit(daterange);
        });
        _configStoreService.presetUpdate$.pipe(takeUntil(this.unsubscribe$)).subscribe((preset: number | DateRange) => {
            this.selectedPresetChanged.emit(preset);
        });
        calendarOverlayService._dismissed.pipe(takeUntil(this.unsubscribe$)).subscribe( saved => {
            this.closed.emit( saved ? this._configStoreService.currentSelection() : null );
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();

        if (this._overlayRef) {
            this._overlayRef.detach();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['options']) {
            const options: DateRangeOptions = changes['options'].currentValue;
            this._configStoreService.updateDateRangeOptions(options);
        }
        if (changes['selectedDate']) {
            const selectedDate: number | DateRange = changes['selectedDate'].currentValue;

            if ( typeof selectedDate === 'number' ) {
                this._configStoreService.updatePreset(selectedDate);
            } else {
                this._configStoreService.updateRange(selectedDate);
            }
        }
    }

    @HostListener('click')
    _onClick(): void {
        this._overlayRef = this.calendarOverlayService.open(this._elementRef, this.options.center);
    }
}
