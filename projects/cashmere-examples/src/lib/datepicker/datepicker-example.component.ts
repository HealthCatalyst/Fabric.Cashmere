import {Component} from '@angular/core';

@Component({
    selector: 'hc-datepicker-example',
    templateUrl: './datepicker-example.component.html',
    styleUrls: ['datepicker-example.component.scss']
})
export class DatepickerExampleComponent {
    date1 = new Date(2010, 1, 1);
}
