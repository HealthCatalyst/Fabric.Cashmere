import { Component } from '@angular/core';

@Component({
    selector: 'hc-icon-demo',
    templateUrl: './icon-demo.component.html',
    styleUrls: [
        './icon-demo.component.scss'
    ]
})
export class IconDemoComponent {
    lastModified: Date = new Date( document.lastModified );
    public document: string = require('raw-loader!../../../../guides/components/icon.md');
}
