import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseFoundationsComponent} from '../base-foundations.component';

@Component({
    selector: 'hc-logo',
    templateUrl: './logo-demo.component.html',
    styleUrls: ['./logo-demo.component.scss']
})
export class LogoDemoComponent extends BaseFoundationsComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
