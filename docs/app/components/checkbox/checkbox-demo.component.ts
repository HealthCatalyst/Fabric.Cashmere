import { Component } from '@angular/core';

@Component({
    selector: 'hc-checkbox-demo',
    templateUrl: './checkbox-demo.component.html'
})
export class CheckboxDemoComponent {
    isChecked: boolean;
    lastModified: Date = new Date( document.lastModified );
    public document: string = require('raw-loader!../../../../guides/components/checkbox.md');

    getCheckboxText() {
        return `${this.isChecked ? 'Disable' : 'Enable'} Button`;
    }
}
