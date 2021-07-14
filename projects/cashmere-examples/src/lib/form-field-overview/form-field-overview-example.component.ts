import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * @title Multiple Form Field Elements
 */
@Component({
    selector: 'hc-form-field-overview-example',
    templateUrl: 'form-field-overview-example.component.html',
    styleUrls: ['form-field-overview-example.component.scss']
})
export class FormFieldOverviewExampleComponent {
    selectControl = new FormControl('daily');
    inputControl = new FormControl('');
    radioControl = new FormControl('SM');
    checkControl = new FormControl('');

    invalidForm(): void {
        this.inputControl.setErrors({incorrect: true});
        this.selectControl.setErrors({incorrect: true});
        this.checkControl.setErrors({incorrect: true});
        this.radioControl.setErrors({incorrect: true});
    }
}
