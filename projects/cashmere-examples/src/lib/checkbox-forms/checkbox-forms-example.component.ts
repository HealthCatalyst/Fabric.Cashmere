import {Component} from '@angular/core';

/**
 * @title Forms Support
 */
@Component({
    selector: 'hc-example',
    templateUrl: 'checkbox-forms-example.component.html'
})
export class CheckboxFormsExampleComponent {
    isChecked: boolean;

    getCheckboxText() {
        return `${this.isChecked ? 'Disable' : 'Enable'} Button`;
    }
}
