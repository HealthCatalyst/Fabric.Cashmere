import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';

@Component({
    selector: 'hc-datepicker-example',
    templateUrl: './datepicker-example.component.html',
    styleUrls: ['datepicker-example.component.scss']
})
export class DatepickerExampleComponent {
    readonly dateControl1 = new UntypedFormControl(new Date(2010, 1, 1));
    readonly dateControl2 = new UntypedFormControl(new Date());
    form = new UntypedFormGroup({
        dateForm: new UntypedFormControl(new Date('2010-01-01T20:15:00.00'))
    });

    hourCycle = false;
    allowsBlankValues = false;

    maxStr: string = this.dateControl2.value.toISOString();
}
