import {Component} from '@angular/core';

@Component({
    selector: 'hc-button-demo',
    templateUrl: './button-demo.component.html',
    styleUrls: ['./button-demo.component.scss']
})
export class ButtonDemoComponent {
    lastModified: Date = new Date(document.lastModified);
    public document: string = require('raw-loader!../../../../guides/components/button.md');
}
