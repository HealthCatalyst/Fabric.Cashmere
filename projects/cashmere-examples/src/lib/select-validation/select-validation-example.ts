import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * @title Component Validation
 */
@Component({
    selector: 'select-validation-example',
    templateUrl: 'select-validation-example.html',
    styles: ['select-sample { max-width: 350px; width: 100%; }']
})
export class SelectValidationExample {
    private validCheck = false;

    selectControl = new FormControl('');

    toggleValidate() {
        this.validCheck = !this.validCheck;
        if (this.validCheck) {
            this.selectControl.setErrors({incorrect: true});
        } else {
            this.selectControl.setErrors({});
        }
    }
}
