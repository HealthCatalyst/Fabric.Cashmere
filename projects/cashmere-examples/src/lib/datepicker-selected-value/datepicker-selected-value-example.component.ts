import {Component} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';

@Component({
    selector: 'hc-datepicker-selected-value-example',
    templateUrl: 'datepicker-selected-value-example.component.html',
    styleUrls: ['datepicker-selected-value-example.component.scss']
})
export class DatepickerSelectedValueExampleComponent {
    date = new UntypedFormControl(new Date(2010, 1, 1));
    serializedDate = new UntypedFormControl(new Date(2010, 1, 1).toISOString());
}
