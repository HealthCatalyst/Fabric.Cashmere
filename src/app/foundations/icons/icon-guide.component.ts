import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseDemoComponent} from '../../shared/base-demo.component';

@Component({
    selector: 'hc-icon-guide',
    templateUrl: './icon-guide.component.html',
    styleUrls: ['./icon-guide.component.scss']
})
export class IconGuideComponent extends BaseDemoComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
