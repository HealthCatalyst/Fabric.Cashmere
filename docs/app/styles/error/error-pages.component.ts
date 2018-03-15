import { Component } from '@angular/core';

@Component({
    selector: 'hc-error-pages',
    template: `<div class="demo-content"><div [hcMarkdown]="document"></div></div>`
})

export class ErrorPagesComponent {
    public document: string = require('raw-loader!../../../../guides/styles/error-pages.md');
}
