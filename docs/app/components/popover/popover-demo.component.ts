import {Component} from '@angular/core';

@Component({
    selector: 'hc-popover-demo',
    templateUrl: './popover-demo.component.html',
    styles: ['.inline-button { vertical-align: bottom; }']
})
export class PopoverDemoComponent {
    lastModified: Date = new Date(document.lastModified);
    public body: string = 'dynamic content';
    public document: string = require('raw-loader!../../../../guides/components/popover.md');

    aboutClick() {
        alert('about us!');
    }
}
