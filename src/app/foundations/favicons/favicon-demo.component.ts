import {Component} from '@angular/core';
import {SectionService} from '../../shared/section.service';
import {BaseDemoComponent} from '../../shared/base-demo.component';

@Component({
    selector: 'hc-favicons',
    templateUrl: './favicon-demo.component.html',
    styleUrls: ['./favicon-demo.component.scss'],
    standalone: false
})
export class FaviconDemoComponent extends BaseDemoComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
