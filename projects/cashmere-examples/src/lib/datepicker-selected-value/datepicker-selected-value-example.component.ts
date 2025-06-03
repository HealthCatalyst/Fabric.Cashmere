import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'hc-datepicker-selected-value-example',
    templateUrl: 'datepicker-selected-value-example.component.html',
    styleUrls: ['datepicker-selected-value-example.component.scss'],
    standalone: false
})
export class DatepickerSelectedValueExampleComponent {
    date = new FormControl(new Date(2010, 1, 1));
    serializedDate = new FormControl(new Date(2010, 1, 1).toISOString());
}
