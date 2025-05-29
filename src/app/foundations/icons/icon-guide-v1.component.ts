import {Component} from '@angular/core';
import {SectionService} from '../../shared/section.service';
import {BaseDemoComponent} from '../../shared/base-demo.component';

@Component({
    selector: 'hc-icon-guide-v1',
    templateUrl: './icon-guide-v1.component.html',
    styleUrls: ['./icon-guide-v1.component.scss'],
    standalone: false
})
export class IconGuideV1Component extends BaseDemoComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
