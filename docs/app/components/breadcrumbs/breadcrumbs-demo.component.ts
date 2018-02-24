import { Component } from '@angular/core';

@Component({
    selector: 'hc-breadcrumbs-demo',
    templateUrl: './breadcrumbs-demo.component.html',
    styles: [ '[hc-button] { margin-top: 10px; margin-right: 10px;}' ]
})
export class BreadcrumbsDemoComponent {
    showTemplate: boolean = true;
    lastModified: Date = new Date( document.lastModified );

    viewToggle(show: 'ts' | 'html') {
        this.showTemplate = show === 'html';
    }
}
