import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseFoundationsComponent} from '../base-foundations.component';

@Component({
    selector: 'hc-application-launch-screen-guide',
    template: `
        <div class="demo-content"><div [hcMarkdown]="document" (loaded)="loaded()"></div></div>
    `
})
export class ApplicationLaunchScreenGuideComponent extends BaseFoundationsComponent {
    public document: string = require('raw-loader!../../../../guides/foundations/launch-screen.md');

    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
