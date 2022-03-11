import {Output, EventEmitter, Input, OnDestroy, ElementRef, Directive, HostListener, OnChanges, SimpleChanges, forwardRef} from '@angular/core';
import {DatePipe} from '@angular/common';
import {OverlayRef} from '@angular/cdk/overlay';
import {CalendarOverlayService} from '../services/calendar-overlay.service';
import {DateRange, DateRangeOptions} from '../model/model';
import {ConfigStoreService} from '../services/config-store.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

/** Trigger the date range selector using the `hcDateRange` directive on a button or other clickable element  */
@Directive({
    selector: '[hcDateRange]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DateRangeDirective),
        multi: true
    }, CalendarOverlayService, ConfigStoreService, DatePipe]
})
export class DateRangeDirective implements OnDestroy, OnChanges, ControlValueAccessor {
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

    /** If disabled, clicks to the element will not trigger the date range popover. */
    @Input()
    disabled = false;

    private _touched = false;
    private _overlayRef: OverlayRef;
    private unsubscribe$ = new Subject<void>();

    constructor(
        private _elementRef: ElementRef<HTMLInputElement>,
        private calendarOverlayService: CalendarOverlayService,
        public _configStoreService: ConfigStoreService
    ) {
        _configStoreService.rangeUpdate$.pipe(takeUntil(this.unsubscribe$)).subscribe((daterange: DateRange) => {
            this.selectedDateRangeChanged.emit(daterange);
            this.onChange( daterange );
        });
        _configStoreService.presetUpdate$.pipe(takeUntil(this.unsubscribe$)).subscribe((preset: number | DateRange) => {
            this.selectedPresetChanged.emit(preset);
            this.onChange( preset );
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
            this._updateSelected( selectedDate );
        }
    }

    writeValue(value: number | DateRange): void {
        this._updateSelected( value );
    }

    _updateSelected( selectedDate: number | DateRange ): void {
        if ( typeof selectedDate === 'number' ) {
            this._configStoreService.updatePreset(selectedDate);
        } else {
            this._configStoreService.updateRange(selectedDate);
        }

        this.onChange( selectedDate );

        if (!this._touched) {
            this.onTouch();
            this._touched = true;
        }
    }

    @HostListener('click')
    _onClick(): void {
        if ( !this.disabled ) {
            this._overlayRef = this.calendarOverlayService.open(this._elementRef, this.options.center);
        }
    }

    public onChange: (value: number | DateRange) => void = () => undefined;
    public onTouch: () => unknown = () => undefined;
    public registerOnChange(fn: (value: unknown) => void): void {
        this.onChange = fn;
    }
    public registerOnTouched(fn: () => unknown): void {
        this.onTouch = fn;
    }

    setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
    }
}
