import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseContentComponent} from '../base-content.component';

@Component({
    selector: 'hc-logo',
    templateUrl: './logo-demo.component.html',
    styleUrls: ['./logo-demo.component.scss']
})
export class LogoDemoComponent extends BaseContentComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
