import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseStylesComponent} from '../base-styles.component';

@Component({
    selector: 'hc-trademarks-demo',
    template: `
        <div class="demo-content"><div [hcMarkdown]="document" (loaded)="loaded()"></div></div>
    `
})
export class TrademarksDemoComponent extends BaseStylesComponent {
    public document: string = require('raw-loader!../../../../guides/styles/trademarks.md');

    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
