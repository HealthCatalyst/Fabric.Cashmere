import {Component, OnInit, ViewEncapsulation, ChangeDetectorRef, AfterViewInit, ViewChildren, QueryList} from '@angular/core';
import {DateRangeOptions} from '../model/model';
import {OverlayRef} from '@angular/cdk/overlay';
import {ConfigStoreService} from '../services/config-store.service';
import {DateRange} from '../model/model';
import {D} from '../../datepicker/datetime/date-formats';
import {RadioButtonChangeEvent} from '../../radio-button/radio';
import {CalendarWrapperComponent} from '../calendar-wrapper/calendar-wrapper.component';
import {Observable} from 'rxjs';

// ** Date range wrapper component */
@Component({
    selector: 'hc-date-range-picker-overlay',
    templateUrl: './picker-overlay.component.html',
    styleUrls: ['./picker-overlay.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PickerOverlayComponent implements OnInit, AfterViewInit {
    options$: Observable<DateRangeOptions>;
    _fromDate: Date | undefined;
    _toDate: Date | undefined;
    _disabled: boolean;
    _selectedPreset: DateRange | null;

    @ViewChildren(CalendarWrapperComponent)
    calendarWrappers: QueryList<CalendarWrapperComponent>;

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
    }

    _updateRangeByPreset(presetItem: RadioButtonChangeEvent) {
        const range: DateRange = presetItem.value;
        this._fromDate = range.fromDate;
        this._toDate = range.toDate;
        this._setValidity();
    }

    _applyNewDates() {
        if (!!this._toDate && !!this._fromDate) {
            this.configStoreService.updateRange({fromDate: this._fromDate, toDate: this._toDate});
        }
        this.overlayRef.dispose();
    }

    _discardNewDates(e) {
        this.overlayRef.dispose();
    }

    _setValidity() {
        this._disabled = !this._toDate || !this._fromDate;
    }
}
