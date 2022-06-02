import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * @title Slide Toggle Forms
 */
@Component({
    selector: 'hc-slide-toggle-forms-example',
    templateUrl: 'slide-toggle-forms-example.component.html',
    styleUrls: ['slide-toggle-forms-example.component.scss']
})
export class SlideToggleFormsExampleComponent {
    slideControl: FormControl = new FormControl(false);
    private invalid = false;

    toggleValid(): void {
        this.invalid = !this.invalid;
        if (this.invalid) {
            this.slideControl.markAsTouched();
            this.slideControl.setErrors({invalid: true});
        } else {
            this.slideControl.markAsTouched();
            this.slideControl.setErrors(null);
        }
    }

    toggleState(): void {
        this.slideControl.setValue( !this.slideControl.value );
    }

    resetValid(): void {
        this.invalid = false;
    }
}
