import { Component } from '@angular/core';

@Component({
    selector: 'hc-button-demo',
    templateUrl: './button-demo.component.html',
    styleUrls: [
        './button-demo.component.scss',
        '../shared-demo-styles.scss'
    ]
})
export class ButtonDemoComponent {
    showTemplate: boolean = true;

    viewToggle(show: 'ts' | 'html') {
        this.showTemplate = show === 'html';
    }
}
