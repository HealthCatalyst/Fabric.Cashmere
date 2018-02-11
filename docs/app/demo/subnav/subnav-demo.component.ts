import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'hc-subnav-demo',
    templateUrl: './subnav-demo.component.html',
    styleUrls: [ '../shared-demo-styles.scss',
                './subnav-demo.component.scss' ]
})
export class SubnavDemoComponent {
    showTemplate: boolean = true;

    viewToggle(show: 'ts' | 'html') {
        this.showTemplate = show === 'html';
    }
}
