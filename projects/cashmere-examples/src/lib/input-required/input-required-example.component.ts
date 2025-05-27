import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

/**
 * @title Required Input
 */
@Component({
    selector: 'hc-input-required-example',
    templateUrl: 'input-required-example.component.html',
    styleUrls: ['input-required-example.component.scss'],
    standalone: false
})
export class InputRequiredExampleComponent {
    @ViewChild('exampleForm') exampleForm: NgForm;

    validationControl = new FormControl('onBlur', {nonNullable: true});
    exampleFormGroup = new FormGroup({
        exampleInput: new FormControl('', [Validators.email, Validators.required])
    });

    // To reset the error state on a form, you must set the submitted state of the form to false
    // resetForm on a NgForm and/or a type="reset" button in the form will accomplish that
    resetForm(): void {
        this.exampleForm.resetForm();
    }

    // Calling markAsTouched on an input formControl will fire an error state check
    markAsTouched(): void {
        this.exampleFormGroup.markAllAsTouched();
    }
}
