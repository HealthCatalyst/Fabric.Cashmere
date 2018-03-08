import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'hc-select-demo',
    templateUrl: './select-demo.component.html',
    styleUrls: ['./select-demo.component.scss']
})

export class SelectDemoComponent {
    validCheck: boolean = true;
    lastModified: Date = new Date( document.lastModified );
    public document: string = require('raw-loader!../../../../guides/components/select.md');

    toggleValidate() { this.validCheck = (this.validCheck) ? false : true; }
}
