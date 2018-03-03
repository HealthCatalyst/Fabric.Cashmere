import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'hc-select-demo',
    templateUrl: './select-demo.component.html',
    styleUrls: ['./select-demo.component.scss']
})

export class SelectDemoComponent {
    validCheck: boolean = true;
    lastModified: Date = new Date( document.lastModified );

    toggleValidate() { this.validCheck = (this.validCheck) ? false : true; }
}
