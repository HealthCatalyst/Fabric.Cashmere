import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'hc-datepicker-sugar-example',
    templateUrl: './datepicker-sugar-example.component.html',
    styleUrls: ['./datepicker-sugar-example.component.scss'],
    standalone: false
})
export class DatepickerSugarExampleComponent {
    readonly dateControl = new FormControl(new Date(2020, 1, 1));
}
