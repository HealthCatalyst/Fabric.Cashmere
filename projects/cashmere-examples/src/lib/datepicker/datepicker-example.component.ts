import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'hc-datepicker-example',
    templateUrl: './datepicker-example.component.html',
    styleUrls: ['datepicker-example.component.scss']
})
export class DatepickerExampleComponent {
    readonly dateControl1 = new FormControl(new Date(2010, 1, 1));
    readonly dateControl2 = new FormControl(new Date());
    form = new FormGroup({
        dateForm: new FormControl(new Date('2010-01-01T20:15:00.00'))
    });

    hourCycle = false;

    maxStr: string = this.dateControl2.value.toISOString();
}
