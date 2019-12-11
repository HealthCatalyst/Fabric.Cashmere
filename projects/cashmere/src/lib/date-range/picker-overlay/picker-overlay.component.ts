import {Component, OnInit, ViewEncapsulation, ChangeDetectorRef, AfterViewInit, ViewChildren, QueryList} from '@angular/core';
import {DateRangeOptions} from '../model/model';
import {OverlayRef} from '@angular/cdk/overlay';
import {ConfigStoreService} from '../services/config-store.service';
import {DateRange} from '../model/model';
import {D} from '../../datepicker/datetime/date-formats';
import {CalendarWrapperComponent} from '../calendar-wrapper/calendar-wrapper.component';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RadioButtonComponent} from '../../radio-button/radio';

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
    _disabled: boolean;
    _selectedPreset: DateRange | null;

    @ViewChildren(CalendarWrapperComponent)
    calendarWrappers: QueryList<CalendarWrapperComponent>;

    @ViewChildren(RadioButtonComponent)
    _presetRadios: QueryList<RadioButtonComponent>;

    constructor(public configStoreService: ConfigStoreService, private overlayRef: OverlayRef, private cd: ChangeDetectorRef) {
        this.options$ = configStoreService.dateRangeOptions$;
    }

    ngOnInit() {
        this._setValidity();
        this.configStoreService.rangeUpdate$.subscribe((dateRange: DateRange) => {
            if (dateRange) {
                this._fromDate = dateRange.fromDate;
                this._toDate = dateRange.toDate;
            } else {
                this._fromDate = undefined;
                this._toDate = undefined;
            }
        });
    }

    ngAfterViewInit(): void {
        if (this.calendarWrappers.first) {
            this.calendarWrappers.first.focusInput();
        }
        setTimeout(() => {
            this._isRangePreset();
        });
    }

    _updateFromDate(date?: D) {
        this._fromDate = date;
        if (this._selectedPreset && this._selectedPreset.fromDate !== date) {
            setTimeout(() => {
                this._selectedPreset = null;
                this.cd.detectChanges();
            });
        }
        this._setValidity();
        this._isRangePreset();
    }

    _updateToDate(date?: D) {
        this._toDate = date;
        if (this._selectedPreset && this._selectedPreset.toDate !== date) {
            setTimeout(() => {
                this._selectedPreset = null;
                this.cd.detectChanges();
            });
        }
        this._setValidity();
        this._isRangePreset();
    }

    _updateRangeByPreset(range: DateRange) {
        this._fromDate = range.fromDate;
        this._toDate = range.toDate;
        this._setValidity();
    }

    _isRangePreset() {
        if (this._presetRadios) {
            this._presetRadios.forEach((radio: RadioButtonComponent) => {
                let radioRange: DateRange = radio.value;
                if (this._fromDate && radioRange.fromDate && this._toDate && radioRange.toDate) {
                    radio.checked =
                        this._fromDate.toDateString() === radioRange.fromDate.toDateString() &&
                        this._toDate.toDateString() === radioRange.toDate.toDateString();
                }
            });
        }
    }

    _applyNewDates() {
        if (!!this._toDate && !!this._fromDate) {
            this.configStoreService.updateRange({fromDate: this._fromDate, toDate: this._toDate});
        }
        this.overlayRef.dispose();
    }

    _discardNewDates() {
        this.overlayRef.dispose();
    }

    _setValidity() {
        this._disabled = !this._toDate || !this._fromDate;
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
