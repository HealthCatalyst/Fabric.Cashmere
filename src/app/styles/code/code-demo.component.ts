import {Component} from '@angular/core';

@Component({
    selector: 'hc-code',
    templateUrl: './code-demo.component.html',
    styles: ['.api-table li { margin: 15px 0; }']
})
export class CodeDemoComponent {
    lastModified: Date = new Date(document.lastModified);
    public document: string = require('raw-loader!../../../../guides/styles/code.md');
}
