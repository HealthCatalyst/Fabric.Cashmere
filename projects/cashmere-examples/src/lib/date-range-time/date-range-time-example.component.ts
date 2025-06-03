import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateRangeOptions, DateRange } from '@healthcatalyst/cashmere';

@Component({
    selector: 'hc-date-range-time-example',
    templateUrl: './date-range-time-example.component.html',
    standalone: false
})
export class DateRangeTimeExampleComponent implements OnInit {
    range: DateRange = {fromDate: new Date(2019, 1, 1, 9, 30), toDate: new Date(2019, 1, 1, 17, 15)};
    timeControl: FormControl = new FormControl( this.range );
    options: DateRangeOptions;

    ngOnInit(): void {
        this.options = {
            format: 'shortTime',
            mode: 'time',
            startDatePrefix: "Start Time",
            endDatePrefix: "End Time",
            invalidDateLabel: 'Start time must precede end time',
            applyLabel: 'Apply',
            center: true
        };
    }
}
