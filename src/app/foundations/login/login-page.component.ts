import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseFoundationsComponent} from '../base-foundations.component';

@Component({
    selector: 'hc-login-page',
    template: `
        <div class="demo-content"><div [hcMarkdown]="document" (loaded)="loaded()"></div></div>
    `
})
export class LoginPageComponent extends BaseFoundationsComponent {
    document: string = require('raw-loader!../../../../guides/foundations/login.md');

    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
