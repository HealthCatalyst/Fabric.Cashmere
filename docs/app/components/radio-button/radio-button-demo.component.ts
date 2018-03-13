import { Component } from '@angular/core';

@Component({
    selector: 'hc-radio-button-demo',
    templateUrl: './radio-button-demo.component.html'
})
export class RadioButtonDemoComponent {
    lastModified: Date = new Date( document.lastModified );
    public document: string = require('raw-loader!../../../../guides/components/radio-button.md');
}
