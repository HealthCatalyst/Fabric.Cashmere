import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'hc-color-demo',
    templateUrl: './color-demo.component.html',
    styleUrls: ['./color-demo.component.scss']
})
export class ColorDemoComponent {
    showTemplate: boolean = true;

    viewToggle(show: 'ts' | 'html') {
        this.showTemplate = show === 'html';
    }
}
