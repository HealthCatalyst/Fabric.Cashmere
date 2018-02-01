import { Component } from '@angular/core';

@Component({
    selector: 'hc-checkbox-demo',
    templateUrl: './checkbox-demo.component.html'
})
export class CheckboxDemoComponent {
    isChecked: boolean;

    getCheckboxText() {
        return `${this.isChecked ? 'Disable' : 'Enable'} Button`;
    }
}
