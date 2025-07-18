import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

/**
 * @title Multiple Form Field Elements
 */
@Component({
    selector: 'hc-form-field-overview-example',
    templateUrl: 'form-field-overview-example.component.html',
    styleUrls: ['form-field-overview-example.component.scss'],
    standalone: false
})
export class FormFieldOverviewExampleComponent {
    enabledState = true;

    exampleForm: FormGroup = new FormGroup({
        selectControl: new FormControl('daily', {nonNullable: true}),
        inputControl: new FormControl('', {nonNullable: true}),
        radioControl: new FormControl('SM', {nonNullable: true}),
        checkControl: new FormControl(false, {nonNullable: true}),
        slideControl: new FormControl(true, {nonNullable: true})
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
