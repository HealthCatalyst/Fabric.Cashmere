import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'hc-datepicker-min-max-example',
    templateUrl: './datepicker-min-max-example.component.html',
    styleUrls: ['./datepicker-min-max-example.component.scss']
})
export class DatepickerMinMaxExampleComponent implements OnInit {
    date1 = new Date();

    min = new Date();
    max = new Date();

    constructor() {
    }

    ngOnInit() {
        this.min.setFullYear(this.min.getFullYear() - 1);
        this.max.setFullYear(this.max.getFullYear() + 1);
    }
}
