import { Component } from '@angular/core';

@Component({
    selector: 'hc-breadcrumbs-demo',
    templateUrl: './breadcrumbs-demo.component.html'
})
export class BreadcrumbsDemoComponent {
    showTemplate: boolean = true;

    viewToggle(show: 'ts' | 'html') {
        this.showTemplate = show === 'html';
    }
}
