import {Component, OnInit, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {PresetItem} from '../model/model';
import {RangeStoreService} from '../services/range-store.service';
import {OverlayRef} from '@angular/cdk/overlay';
import {ConfigStoreService} from '../services/config-store.service';
import {DateRange} from '../model/model';
import {D} from '../../datepicker/datetime/date-formats';
import {RadioButtonChangeEvent} from '../../radio-button/radio';

@Component({
    selector: 'hc-date-range-picker-overlay',
    templateUrl: './picker-overlay.component.html',
    styleUrls: ['./picker-overlay.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PickerOverlayComponent implements OnInit {
    fromDate?: Date;
    toDate?: Date;
    fromMinDate?: Date;
    fromMaxDate?: Date;
    toMinDate?: Date;
    toMaxDate?: Date;
    presets: Array<PresetItem> = [];
    startDatePrefix: string;
    endDatePrefix: string;
    applyLabel: string;
    cancelLabel: string;
    shouldAnimate: string;
    selectedPreset: DateRange | null;
    _disabled: boolean;

    constructor(
        private rangeStoreService: RangeStoreService,
        private configStoreService: ConfigStoreService,
        private overlayRef: OverlayRef,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.fromDate = this.rangeStoreService.fromDate;
        this.toDate = this.rangeStoreService.toDate;
        this.startDatePrefix = this.configStoreService.DateRangeOptions.startDatePrefix || 'Start Date';
        this.endDatePrefix = this.configStoreService.DateRangeOptions.endDatePrefix || 'End Date';
        this.applyLabel = this.configStoreService.DateRangeOptions.applyLabel || 'Apply';
        this.cancelLabel = this.configStoreService.DateRangeOptions.cancelLabel || 'Cancel';
        this.presets = this.configStoreService.DateRangeOptions.presets;
        // ({fromDate: this.fromMinDate, toDate: this.fromMaxDate} = this.configStoreService.DateRangeOptions.fromMinMax);
        this.configStoreService.DateRangeOptions.fromMinMax = {fromDate: this.fromMinDate, toDate: this.fromMaxDate};
        // ({fromDate: this.toMinDate, toDate: this.toMaxDate} = this.configStoreService.DateRangeOptions.toMinMax);
        this.configStoreService.DateRangeOptions.toMinMax = {fromDate: this.toMinDate, toDate: this.toMaxDate};
        this._setValidity();
    }

    updateFromDate(date?: D) {
        this.fromDate = date;

        if (this.selectedPreset && this.selectedPreset.fromDate !== date) {
            setTimeout(() => {
                this.selectedPreset = null;
                this.cd.detectChanges();
            });
        }
        this._setValidity();
    }

    updateToDate(date?: D) {
        this.toDate = date;

        if (this.selectedPreset && this.selectedPreset.toDate !== date) {
            setTimeout(() => {
                this.selectedPreset = null;
                this.cd.detectChanges();
            });
        }
        this._setValidity();
    }

    updateRangeByPreset(presetItem: RadioButtonChangeEvent) {
        const range: DateRange = presetItem.value;
        this.fromDate = range.fromDate;
        this.toDate = range.toDate;
        this._setValidity();
    }

    applyNewDates() {
        if (!!this.toDate && !!this.fromDate) {
            this.rangeStoreService.updateRange(this.fromDate, this.toDate);
        }
        this.overlayRef.dispose();
    }

    discardNewDates(e) {
        this.overlayRef.dispose();
    }

    _setValidity() {
        this._disabled = !this.toDate || !this.fromDate;
    }
}
