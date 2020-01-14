import {Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChildren, QueryList} from '@angular/core';
import {DateRangeOptions, PresetItem} from '../model/model';
import {OverlayRef} from '@angular/cdk/overlay';
import {ConfigStoreService} from '../services/config-store.service';
import {DateRange} from '../model/model';
import {D} from '../../datepicker/datetime/date-formats';
import {CalendarWrapperComponent} from '../calendar-wrapper/calendar-wrapper.component';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

// ** Date range wrapper component */
@Component({
    selector: 'hc-date-range-picker-overlay',
    templateUrl: './picker-overlay.component.html',
    styleUrls: ['./picker-overlay.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PickerOverlayComponent implements OnInit, AfterViewInit {
    options$: Observable<DateRangeOptions>;
    _fromDate: D | undefined;
    _toDate: D | undefined;
    _selectedPreset: number | null;
    _presetValues: PresetItem[] | undefined;
    _skipRangeCheck: boolean = false;

    @ViewChildren(CalendarWrapperComponent)
    calendarWrappers: QueryList<CalendarWrapperComponent>;

    constructor(public configStoreService: ConfigStoreService, private overlayRef: OverlayRef) {
        this.options$ = configStoreService.dateRangeOptions$;
    }

    ngOnInit() {
        this.options$.subscribe((options: DateRangeOptions) => {
            this._presetValues = options.presets;
        });
        this.configStoreService.rangeUpdate$.subscribe((dateRange: DateRange) => {
            if (dateRange) {
                this._fromDate = dateRange.fromDate;
                this._toDate = dateRange.toDate;
            } else {
                this._fromDate = undefined;
                this._toDate = undefined;
            }
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
    }

    _updateToDate(date?: D) {
        if ( !this._skipRangeCheck ) {
            this._toDate = date;
            this._isRangePreset();
        }
    }

    _updateRangeByPreset(index: number) {
        if (this._presetValues && index < this._presetValues.length && index >= 0 ) {
            // Prevent the system from assigning a preset if one has specifically been selected
            this._skipRangeCheck = true;
            this._fromDate = this._presetValues[index].range.fromDate;
            this._toDate = this._presetValues[index].range.toDate;
            setTimeout(() => {
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
            this.configStoreService.updateRange({fromDate: this._fromDate, toDate: this._toDate});
            if (this._selectedPreset !== null) {
                this.configStoreService.updatePreset(this._selectedPreset);
            } else {
                this.configStoreService.updatePreset({fromDate: this._fromDate, toDate: this._toDate});
            }
        }
        this.overlayRef.dispose();
    }

    _discardNewDates() {
        this.overlayRef.dispose();
    }

    get _fromMaxDate(): Observable<Date | undefined> {
        return this.options$.pipe(
            map(options => {
                if (!options || !options.fromMinMax || !options.fromMinMax.toDate) {
                    return this._toDate;
                }
                if (!this._toDate) {
                    return options.fromMinMax.toDate;
                }

                return options.fromMinMax.toDate > this._toDate ? this._toDate : options.fromMinMax.toDate;
            })
        );
    }

    get _ToMinDate(): Observable<Date | undefined> {
        return this.options$.pipe(
            map(options => {
                if (!options || !options.toMinMax || !options.toMinMax.fromDate) {
                    return this._fromDate;
                }
                if (!this._fromDate) {
                    return options.toMinMax.fromDate;
                }

                return options.toMinMax.fromDate < this._fromDate ? this._fromDate : options.toMinMax.fromDate;
            })
        );
    }
}
