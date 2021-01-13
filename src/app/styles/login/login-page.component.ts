import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseStylesComponent} from '../base-styles.component';

@Component({
    selector: 'hc-login-page',
    template: `
        <div class="demo-content"><div [hcMarkdown]="document" (loaded)="loaded()"></div></div>
    `
})
export class LoginPageComponent extends BaseStylesComponent {
    document: string = require('raw-loader!../../../../guides/styles/login.md');

    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
