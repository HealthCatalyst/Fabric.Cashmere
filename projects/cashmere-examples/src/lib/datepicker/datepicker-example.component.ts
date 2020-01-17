import {Component} from '@angular/core';

@Component({
    selector: 'hc-datepicker-example',
    templateUrl: './datepicker-example.component.html',
    styleUrls: ['datepicker-example.component.scss']
})
export class DatepickerExampleComponent {
    date1 = new Date(2010, 1, 1);
    date2 = new Date();
    date3 = new Date("2010-01-01T20:15:00.00");
    hourCycle = false;

    maxStr: string = this.date2.toISOString();
}
