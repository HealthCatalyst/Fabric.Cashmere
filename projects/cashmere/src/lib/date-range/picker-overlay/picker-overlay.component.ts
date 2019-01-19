import {Component, OnInit, ViewEncapsulation, ChangeDetectorRef, AfterViewInit, ViewChildren, QueryList} from '@angular/core';
import {PresetItem} from '../model/model';
import {RangeStoreService} from '../services/range-store.service';
import {OverlayRef} from '@angular/cdk/overlay';
import {ConfigStoreService} from '../services/config-store.service';
import {DateRange} from '../model/model';
import {D} from '../../datepicker/datetime/date-formats';
import {RadioButtonChangeEvent} from '../../radio-button/radio';
import {CalendarWrapperComponent} from '../calendar-wrapper/calendar-wrapper.component';

// ** Date range wrapper component */
@Component({
    selector: 'hc-date-range-picker-overlay',
    templateUrl: './picker-overlay.component.html',
    styleUrls: ['./picker-overlay.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PickerOverlayComponent implements OnInit, AfterViewInit {
    _fromDate?: Date;
    _toDate?: Date;
    _fromMinDate?: Date;
    _fromMaxDate?: Date;
    _toMinDate?: Date;
    _toMaxDate?: Date;
    _presets: Array<PresetItem> = [];
    _startDatePrefix: string;
    _endDatePrefix: string;
    _applyLabel: string;
    _cancelLabel: string;
    _shouldAnimate: string;
    _selectedPreset: DateRange | null;
    _disabled: boolean;

    @ViewChildren(CalendarWrapperComponent)
    calendarWrappers: QueryList<CalendarWrapperComponent>;

    constructor(
        private rangeStoreService: RangeStoreService,
        private configStoreService: ConfigStoreService,
        private overlayRef: OverlayRef,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this._fromDate = this.rangeStoreService.fromDate;
        this._toDate = this.rangeStoreService.toDate;
        this._startDatePrefix = this.configStoreService.DateRangeOptions.startDatePrefix || 'Start Date';
        this._endDatePrefix = this.configStoreService.DateRangeOptions.endDatePrefix || 'End Date';
        this._applyLabel = this.configStoreService.DateRangeOptions.applyLabel || 'Apply';
        this._cancelLabel = this.configStoreService.DateRangeOptions.cancelLabel || 'Cancel';
        this._presets = this.configStoreService.DateRangeOptions.presets;
        // ({fromDate: this.fromMinDate, toDate: this.fromMaxDate} = this.configStoreService.DateRangeOptions.fromMinMax);
        this.configStoreService.DateRangeOptions.fromMinMax = {fromDate: this._fromMinDate, toDate: this._fromMaxDate};
        // ({fromDate: this.toMinDate, toDate: this.toMaxDate} = this.configStoreService.DateRangeOptions.toMinMax);
        this.configStoreService.DateRangeOptions.toMinMax = {fromDate: this._toMinDate, toDate: this._toMaxDate};
        this._setValidity();
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
            this.rangeStoreService.updateRange(this._fromDate, this._toDate);
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
