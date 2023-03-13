import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseDemoComponent} from '../../shared/base-demo.component';

@Component({
    selector: 'hc-about-modal',
    templateUrl: `./about-modal.component.html`,
    styleUrls: ['./about-modal.component.scss']
})
export class AboutModalComponent extends BaseDemoComponent {
    public document: string = require('../../../../guides/styles/about.md');

    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
