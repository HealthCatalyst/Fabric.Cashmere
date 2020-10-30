import {Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChildren, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import type {QueryList} from '@angular/core';
import {DateRangeOptions, PresetItem} from '../model/model';
import {OverlayRef} from '@angular/cdk/overlay';
import {ConfigStoreService} from '../services/config-store.service';
import {DateRange} from '../model/model';
import {D} from '../../datepicker/datetime/date-formats';
import {CalendarWrapperComponent} from '../calendar-wrapper/calendar-wrapper.component';
import {Observable} from 'rxjs';

// ** Date range wrapper component */
@Component({
    selector: 'hc-date-range-picker-overlay',
    templateUrl: './picker-overlay.component.html',
    styleUrls: ['./picker-overlay.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickerOverlayComponent implements OnInit, AfterViewInit {
    options$: Observable<DateRangeOptions>;
    set _fromDate(fd: D | undefined) { this.__fromDate = fd; this.cd.markForCheck(); }
    set _toDate(td: D | undefined) { this.__toDate = td; this.cd.markForCheck(); }
    set _selectedPreset(s: number | null ) { this.__selectedPreset = s; this.cd.markForCheck(); }
    set _rangeIsInvalid(isInvalid: boolean) { this.__rangeIsInvalid = isInvalid; this.cd.markForCheck(); }
    get _fromDate(): D | undefined { return this.__fromDate; }
    get _toDate(): D | undefined { return this.__toDate; }
    get _selectedPreset(): number | null { return this.__selectedPreset; }
    get _rangeIsInvalid(): boolean { return this.__rangeIsInvalid; }
    _presetValues: PresetItem[] | undefined;
    _skipRangeCheck: boolean = false;

    __fromDate: D | undefined;
    __toDate: D | undefined;
    __selectedPreset: number | null;
    __rangeIsInvalid: boolean = false; // if true, the fromDate is after the toDate and save will not be allowed

    @ViewChildren(CalendarWrapperComponent)
    calendarWrappers: QueryList<CalendarWrapperComponent>;

    constructor(public configStoreService: ConfigStoreService, private overlayRef: OverlayRef, private cd: ChangeDetectorRef) {
        this.options$ = configStoreService.dateRangeOptions$;
    }

    ngOnInit() {
        this.options$.subscribe((options: DateRangeOptions) => {
            this._presetValues = options.presets;
            this.cd.markForCheck();
        });
        this.configStoreService.rangeUpdate$.subscribe((dateRange: DateRange) => {
            if (dateRange) {
                this._fromDate = dateRange.fromDate;
                this._toDate = dateRange.toDate;
            } else {
                this._fromDate = undefined;
                this._toDate = undefined;
            }
            this._validateRange();
        });
        this.configStoreService.presetUpdate$.subscribe((presetIndex: number | DateRange) => {
            if (typeof presetIndex === 'number') {
                this._selectedPreset = presetIndex;
                this._updateRangeByPreset( presetIndex );
            }
        });
    }

    ngAfterViewInit(): void {
        if (this.calendarWrappers.first) {
            this.calendarWrappers.first.focusInput();
        }
    }

    _updateFromDate(date?: D) {
        if ( !this._skipRangeCheck ) {
            this._fromDate = date;
            this._isRangePreset();
        }

        if (this._rangeIsInvalid) {
            this._validateRange();
        }
    }

    _updateToDate(date?: D) {
        if ( !this._skipRangeCheck ) {
            this._toDate = date;
            this._isRangePreset();
        }

        if (this._rangeIsInvalid) {
            this._validateRange();
        }
    }

    _updateRangeByPreset(index: number) {
        if (this._presetValues && index < this._presetValues.length && index >= 0 ) {
            // Prevent the system from assigning a preset if one has specifically been selected
            this._skipRangeCheck = true;
            this._fromDate = this._presetValues[index].range.fromDate;
            this._toDate = this._presetValues[index].range.toDate;

            setTimeout(() => {
                if ( this._fromDate ) {
                    this.calendarWrappers.first.hcCalendar.activeDate = this._fromDate;
                }
                if ( this._toDate ) {
                    this.calendarWrappers.last.hcCalendar.activeDate = this._toDate;
                }
                this._skipRangeCheck = false;
            });
        }
    }

    _isRangePreset() {
        this._selectedPreset = null;
        if (this._presetValues) {
            for (let i = 0; i < this._presetValues.length; i++) {
                let radioRange: DateRange = this._presetValues[i].range;
                if (this._fromDate && radioRange.fromDate && this._toDate && radioRange.toDate) {
                    if ( this._fromDate.toDateString() === radioRange.fromDate.toDateString() &&
                        this._toDate.toDateString() === radioRange.toDate.toDateString() ) {
                            this._selectedPreset = i;
                    }
                }
            }
        }
    }

    _applyNewDates() {
        if (!!this._toDate && !!this._fromDate) {
            this._validateRange();
            if (this._rangeIsInvalid) { return; }
            this.configStoreService.updateRange({fromDate: this._fromDate, toDate: this._toDate});
            if (this._selectedPreset !== null) {
                this.configStoreService.updatePreset(this._selectedPreset);
            } else {
                this.configStoreService.updatePreset({fromDate: this._fromDate, toDate: this._toDate});
            }
        }
        this.overlayRef.dispose();
    }

    _validateRange() {
        this._rangeIsInvalid = (!!this._fromDate && !!this._toDate) && this._fromDate > this._toDate;
    }

    _discardNewDates() {
        this.overlayRef.dispose();
    }
}
