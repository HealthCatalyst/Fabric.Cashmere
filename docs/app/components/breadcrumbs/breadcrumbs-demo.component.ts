import { Component } from '@angular/core';

@Component({
    selector: 'hc-breadcrumbs-demo',
    templateUrl: './breadcrumbs-demo.component.html'
})
export class BreadcrumbsDemoComponent {
    showTemplate: boolean = true;
    lastModified: Date = new Date( document.lastModified );
    public document: string = require('raw-loader!../../../../guides/components/breadcrumbs.md');
    viewToggle(show: 'ts' | 'html') {
        this.showTemplate = show === 'html';
    }
}
