import { Component } from '@angular/core';

@Component({
    selector: 'hc-checkbox-demo',
    templateUrl: './checkbox-demo.component.html',
    styleUrls: ['../../shared-demo-styles.scss']
})
export class CheckboxDemoComponent {
    isChecked: boolean;

    getCheckboxText() {
        return `${this.isChecked ? 'Disable' : 'Enable'} Button`;
    }
}
