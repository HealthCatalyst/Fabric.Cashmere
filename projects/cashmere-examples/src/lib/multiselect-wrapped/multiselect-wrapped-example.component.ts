import { Component } from '@angular/core';
import { Options } from 'ngx-slider-v2';
import { FormControl } from '@angular/forms';

/**
 * @title Wrapped Multiselect
 */
@Component({
    selector: 'hc-multiselect-wrapped-example',
    templateUrl: 'multiselect-wrapped-example.component.html',
    styleUrls: ['multiselect-wrapped-example.component.scss']
})
export class MultiselectWrappedExampleComponent {
    private invalid = false;
    multiselectDisabled = false;
    multiselectControl = new FormControl(["France", "Spain"]);
    countries = ['France', 'Spain', 'Italy', 'Germany', 'Portugal', 'Greece', 'Austria', 'Belgium', 'Denmark', 'Finland', 'Ireland', 'Luxembourg'];

    toggleValid(): void {
        this.invalid = !this.invalid;
        if (this.invalid) {
            this.multiselectControl.setErrors({invalid: true});
        } else {
            this.multiselectControl.setErrors(null);
        }
    }

    toggleDisabled(): void {
        this.multiselectDisabled = !this.multiselectDisabled;
    }

    resetValid(): void {
        this.invalid = false;
    }
}
