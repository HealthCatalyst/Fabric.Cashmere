import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseFoundationsComponent} from '../base-foundations.component';

@Component({
    selector: 'hc-typography',
    templateUrl: './typography-demo.component.html',
    styleUrls: ['./typography-demo.component.scss']
})
export class TypographyDemoComponent extends BaseFoundationsComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
