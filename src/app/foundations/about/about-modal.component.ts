import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseFoundationsComponent} from '../base-foundations.component';

@Component({
    selector: 'hc-about-modal',
    templateUrl: `./about-modal.component.html`,
    styleUrls: ['./about-modal.component.scss']
})
export class AboutModalComponent extends BaseFoundationsComponent {
    public document: string = require('raw-loader!../../../../guides/foundations/about.md');

    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
