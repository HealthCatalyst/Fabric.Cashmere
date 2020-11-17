import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseFoundationsComponent} from '../base-foundations.component';

@Component({
    selector: 'hc-error-pages',
    template: `
        <div class="demo-content"><div [hcMarkdown]="document" (loaded)="loaded()"></div></div>
    `
})
export class ErrorPagesComponent extends BaseFoundationsComponent {
    public document: string = require('raw-loader!../../../../guides/foundations/error.md');

    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
