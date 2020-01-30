import {Component} from '@angular/core';

@Component({
    selector: 'hc-datepicker-touchui-example',
    templateUrl: './datepicker-touchui-example.component.html',
    styleUrls: ['datepicker-touchui-example.component.scss']
})
export class DatepickerTouchuiExampleComponent {
    date1 = new Date(2010, 1, 1);

    maxStr: string = new Date().toISOString();
}
