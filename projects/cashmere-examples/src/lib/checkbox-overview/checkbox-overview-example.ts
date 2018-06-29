import {Component} from '@angular/core';

/**
 * @title Checkbox overview
 */
@Component({
    selector: 'checkbox-overview-example',
    templateUrl: 'checkbox-overview-example.html'
})
export class CheckboxOverviewExample {
    isChecked: boolean;

    getCheckboxText() {
        return `${this.isChecked ? 'Disable' : 'Enable'} Button`;
    }
}
