import {Component, OnInit, ViewChild} from '@angular/core';
import {DateRangeOptions, PresetItem, DateRange} from '@healthcatalyst/cashmere';

@Component({
    selector: 'hc-date-range-example',
    templateUrl: './date-range-example.component.html'
})
export class DateRangeExampleComponent implements OnInit {
    range: DateRange = {fromDate: new Date(), toDate: new Date()};
    options: DateRangeOptions;
    presets: Array<PresetItem> = [];
    @ViewChild('pickerOne')
    pickerOne;

    ngOnInit() {
        const today = new Date();
        const fromMin = new Date(today.getFullYear(), today.getMonth() - 2, 1);
        const fromMax = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        const toMin = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const toMax = new Date(today.getFullYear(), today.getMonth() + 2, 1);

        this.setupPresets();
        this.options = {
            presets: this.presets,
            format: 'mediumDate',
            applyLabel: 'Apply',
            fromMinMax: {fromDate: fromMin, toDate: fromMax},
            toMinMax: {fromDate: toMin, toDate: toMax}
        };
    }

    updateRange(range: DateRange) {
        this.range = range;
    }

    setupPresets() {
        const backDate = numOfDays => {
            const now = new Date();
            return new Date(now.setDate(now.getDate() - numOfDays));
        };

        const today = new Date();
        const yesterday = backDate(1);
        const minus7 = backDate(7);
        const minus30 = backDate(30);
        const currMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const currMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

        this.presets = [
            {
                presetLabel: 'Yesterday',
                range: {fromDate: yesterday, toDate: today}
            },
            {
                presetLabel: 'Last 7 Days',
                range: {fromDate: minus7, toDate: today}
            },
            {
                presetLabel: 'Last 30 Days',
                range: {fromDate: minus30, toDate: today}
            },
            {
                presetLabel: 'This Month',
                range: {fromDate: currMonthStart, toDate: currMonthEnd}
            },
            {
                presetLabel: 'Last Month',
                range: {fromDate: lastMonthStart, toDate: lastMonthEnd}
            }
        ];
    }
}
