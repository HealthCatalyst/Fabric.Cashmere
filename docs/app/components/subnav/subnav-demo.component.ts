import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'hc-subnav-demo',
    templateUrl: './subnav-demo.component.html',
    styleUrls: ['./subnav-demo.component.scss']
})
export class SubnavDemoComponent {
    lastModified: Date = new Date(document.lastModified);
    public document: string = require('raw-loader!../../../../guides/components/subnav.md');
}
