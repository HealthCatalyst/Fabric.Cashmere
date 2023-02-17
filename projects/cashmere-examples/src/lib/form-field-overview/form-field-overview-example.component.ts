import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

/**
 * @title Multiple Form Field Elements
 */
@Component({
    selector: 'hc-form-field-overview-example',
    templateUrl: 'form-field-overview-example.component.html',
    styleUrls: ['form-field-overview-example.component.scss']
})
export class FormFieldOverviewExampleComponent {
    enabledState = true;

    exampleForm: FormGroup = new FormGroup({
        selectControl: new FormControl('daily'),
        inputControl: new FormControl(''),
        radioControl: new FormControl('SM'),
        checkOneControl: new FormControl(false),
        checkTwoControl: new FormControl(false),
        checkThreeControl: new FormControl(false),
        checkFourControl: new FormControl(false),
        slideControl: new FormControl(true)
    });

    disableToggle(): void {
        if ( this.enabledState ) {
            this.enabledState = false;
            this.exampleForm.disable();
        } else {
            this.enabledState = true;
            this.exampleForm.enable();
        }
    }

    invalidForm(): void {
        this.exampleForm.controls['inputControl'].setErrors({incorrect: true});
        this.exampleForm.controls['selectControl'].setErrors({incorrect: true});
        this.exampleForm.controls['checkOneControl'].setErrors({incorrect: true});
        this.exampleForm.controls['checkTwoControl'].setErrors({incorrect: true});
        this.exampleForm.controls['checkThreeControl'].setErrors({incorrect: true});
        this.exampleForm.controls['checkFourControl'].setErrors({incorrect: true});
        this.exampleForm.controls['radioControl'].setErrors({incorrect: true});
        this.exampleForm.controls['slideControl'].setErrors({incorrect: true});
    }
}
