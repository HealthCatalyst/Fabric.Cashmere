import {Component} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';

@Component({
    selector: 'hc-datepicker-sugar-example',
    templateUrl: './datepicker-sugar-example.component.html',
    styleUrls: ['./datepicker-sugar-example.component.scss']
})
export class DatepickerSugarExampleComponent {
    readonly dateControl = new UntypedFormControl(new Date(2020, 1, 1));
}
