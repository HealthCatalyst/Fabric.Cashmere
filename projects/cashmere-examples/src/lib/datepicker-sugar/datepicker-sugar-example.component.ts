import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'hc-datepicker-sugar-example',
    templateUrl: './datepicker-sugar-example.component.html',
    styleUrls: ['./datepicker-sugar-example.component.scss']
})
export class DatepickerSugarExampleComponent implements OnInit {
    readonly dateControl = new FormControl(new Date(2010, 1, 1));

    constructor() {}

    ngOnInit() {}
}
