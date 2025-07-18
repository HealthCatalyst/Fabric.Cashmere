import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * @title Forms Support
 */
@Component({
    selector: 'hc-checkbox-forms-example',
    templateUrl: 'checkbox-forms-example.component.html',
    standalone: false
})
export class CheckboxFormsExampleComponent {
    readonly isCheckedControl = new FormControl(false, {nonNullable: true});

    getCheckboxText(): string {
        return `${this.isCheckedControl.value ? 'Disable' : 'Enable'} button`;
    }
}
