import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * @title Component Validation
 */
@Component({
    selector: 'hc-select-validation-example',
    templateUrl: 'select-validation-example.component.html',
    styleUrls: ['select-validation-example.component.scss']
})
export class SelectValidationExampleComponent {
    private validCheck = false;

    selectControl = new FormControl('qlik');

    resetValidate(): void {
        this.validCheck = false;
    }

    toggleValidate(): void {
        this.validCheck = !this.validCheck;
        if (this.validCheck) {
            this.selectControl.setErrors({incorrect: true});
        } else {
            this.selectControl.setErrors(null);
        }
    }
}
