import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseStylesComponent} from '../base-styles.component';

@Component({
    selector: 'hc-icon-guide',
    templateUrl: './icon-guide.component.html',
    styleUrls: ['./icon-guide.component.scss']
})
export class IconGuideComponent extends BaseStylesComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
