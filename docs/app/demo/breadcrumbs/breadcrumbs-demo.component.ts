import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'hc-breadcrumbs-demo',
    templateUrl: './breadcrumbs-demo.component.html',
    styleUrls: [ '../shared-demo-styles.scss' ]
})
export class BreadcrumbsDemoComponent {
    showTemplate: boolean = true;

    viewToggle(show: 'ts' | 'html') {
        this.showTemplate = show === 'html';
    }
}
