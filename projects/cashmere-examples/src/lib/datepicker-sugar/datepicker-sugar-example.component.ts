import {Component, OnInit, NgModule} from '@angular/core';

@Component({
    selector: 'hc-datepicker-sugar-example',
    templateUrl: './datepicker-sugar-example.component.html',
    styleUrls: ['./datepicker-sugar-example.component.scss']
})
export class DatepickerSugarExampleComponent implements OnInit {
    date1 = new Date(2010, 1, 1);
    date2 = new Date(2010, 1, 1);

    constructor() {}

    ngOnInit() {}
}
