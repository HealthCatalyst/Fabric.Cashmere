import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

/**
 * @title Forms Support
 */
@Component({
    selector: 'hc-checkbox-forms-example',
    templateUrl: 'checkbox-forms-example.component.html'
})
export class CheckboxFormsExampleComponent {
    readonly isCheckedControl = new UntypedFormControl(false);

    getCheckboxText(): string {
        return `${this.isCheckedControl.value ? 'Disable' : 'Enable'} button`;
    }
}
