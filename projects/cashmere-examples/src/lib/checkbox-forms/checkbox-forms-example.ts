import {Component} from '@angular/core';

/**
 * @title Forms Support
 */
@Component({
    selector: 'checkbox-forms-example',
    templateUrl: 'checkbox-forms-example.html',
    styleUrls: ['checkbox-forms-example.css']
})
export class CheckboxFormsExample {
    isChecked: boolean;

    getCheckboxText() {
        return `${this.isChecked ? 'Disable' : 'Enable'} Button`;
    }
}
