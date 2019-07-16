import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'hc-trademarks-demo',
    template: `
        <div class="demo-content"><div [hcMarkdown]="document"></div></div>
    `
})
export class TrademarksDemoComponent {
    public document: string = require('raw-loader!../../../../guides/styles/trademarks.md');
}
