import { Component } from '@angular/core';

@Component({
    selector: 'hc-list-demo',
    templateUrl: './list-demo.component.html',
    styleUrls: [
        './list-demo.component.scss'
    ]
})
export class ListDemoComponent {
    lastModified: Date = new Date( document.lastModified );
    public document: string = require('raw-loader!../../../../guides/components/list.md');
}
