import {Component, OnInit} from '@angular/core';
import {DateRangeOptions, PresetItem, DateRange} from '@healthcatalyst/cashmere';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'hc-date-range-example',
    templateUrl: './date-range-example.component.html',
    styleUrls: ['date-range-example.component.scss']
})
export class DateRangeExampleComponent implements OnInit {
    range: DateRange = {fromDate: new Date(), toDate: new Date()};
    selected: number | DateRange = this.range;
    options: DateRangeOptions;
    optionsControl = new FormControl(false);
    presets: Array<PresetItem> = [];
    presetSelection = 'None';

    ngOnInit(): void {
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

        this.optionsControl.valueChanges.subscribe(value => {
            this.options.excludeWeekends = value;
        });
    }

    updateRange(range: DateRange): void {
        this.range = range;
    }

    updatePreset(index: number | DateRange): void {
        if (typeof index === 'number') {
            this.presetSelection = this.presets[index].presetLabel;
            this.selected = index;
        } else {
            this.presetSelection = 'None';
            this.selected = this.range;
        }
    }

    setupPresets(): void {
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
                presetLabel: 'Last 7 days',
                range: {fromDate: minus7, toDate: today}
            },
            {
                presetLabel: 'Last 30 days',
                range: {fromDate: minus30, toDate: today}
            },
            {
                presetLabel: 'This month',
                range: {fromDate: currMonthStart, toDate: currMonthEnd}
            },
            {
                presetLabel: '1 month to end',
                range: {fromDate: currMonthStart, toDate: currMonthEnd}
            },
            {
                presetLabel: 'Last month',
                range: {fromDate: lastMonthStart, toDate: lastMonthEnd}
            }
        ];
    }
}
