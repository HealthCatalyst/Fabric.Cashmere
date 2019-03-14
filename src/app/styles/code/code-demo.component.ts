import {Component} from '@angular/core';

@Component({
    selector: 'hc-code',
    templateUrl: './code-demo.component.html',
    styleUrls: ['./code-demo.component.scss']
})
export class CodeDemoComponent {
    lastModified: Date = new Date(document.lastModified);
    public document: string = require('raw-loader!../../../../guides/styles/code.md');
}
