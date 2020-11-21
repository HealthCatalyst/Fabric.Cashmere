import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseDemoComponent} from '../../shared/base-demo.component';

@Component({
    selector: 'hc-typography',
    templateUrl: './typography-demo.component.html',
    styleUrls: ['./typography-demo.component.scss']
})
export class TypographyDemoComponent extends BaseDemoComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
