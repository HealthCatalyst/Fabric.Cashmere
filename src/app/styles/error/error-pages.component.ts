import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseStylesComponent} from '../base-styles.component';

@Component({
    selector: 'hc-error-pages',
    template: `
        <div class="demo-content"><div [hcMarkdown]="document" (loaded)="loaded()"></div></div>
    `
})
export class ErrorPagesComponent extends BaseStylesComponent {
    public document: string = require('raw-loader!../../../../guides/styles/error.md');

    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
