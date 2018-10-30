import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * @title Multiple Form Field Elements
 */
@Component({
    selector: 'form-field-overview-example',
    templateUrl: 'form-field-overview-example.html',
    styleUrls: ['form-field-overview-example.css']
})
export class FormFieldOverviewExample {
    selectControl = new FormControl('daily');
    inputControl = new FormControl('');

    invalidInput() {
        this.inputControl.setErrors({incorrect: true});
    }

    invalidSelect() {
        this.selectControl.setErrors({incorrect: true});
    }
}
