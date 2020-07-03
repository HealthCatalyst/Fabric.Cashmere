import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'hc-breadcrumbs-style-demo',
    template: `
        <div class="demo-content"><div [hcMarkdown]="document"></div></div>
    `
})
export class BreadcrumbsStyleDemoComponent {
    public document: string = require('raw-loader!../../../../guides/styles/breadcrumbs.md');
}
