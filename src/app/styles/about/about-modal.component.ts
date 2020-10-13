import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseStylesComponent} from '../base-styles.component';

@Component({
    selector: 'hc-about-modal',
    templateUrl: `./about-modal.component.html`,
    styleUrls: ['./about-modal.component.scss']
})
export class AboutModalComponent extends BaseStylesComponent {
    public document: string = require('raw-loader!../../../../guides/styles/about.md');

    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
