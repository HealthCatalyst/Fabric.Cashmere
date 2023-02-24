import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';

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

    exampleForm: UntypedFormGroup = new UntypedFormGroup({
        selectControl: new UntypedFormControl('daily'),
        inputControl: new UntypedFormControl(''),
        radioControl: new UntypedFormControl('SM'),
        checkControl: new UntypedFormControl(false),
        slideControl: new UntypedFormControl(true)
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
        this.exampleForm.controls['checkControl'].setErrors({incorrect: true});
        this.exampleForm.controls['radioControl'].setErrors({incorrect: true});
        this.exampleForm.controls['slideControl'].setErrors({incorrect: true});
    }
}
