import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'hc-subnav-demo',
    templateUrl: './subnav-demo.component.html',
    styleUrls: [ './subnav-demo.component.scss' ]
})
export class SubnavDemoComponent {
    showTemplate: boolean = true;
    lastModified: Date = new Date( document.lastModified );

    viewToggle(show: 'ts' | 'html') {
        this.showTemplate = show === 'html';
    }
}
