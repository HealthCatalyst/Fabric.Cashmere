import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseDemoComponent} from '../../shared/base-demo.component';

@Component({
    selector: 'hc-info-icons-demo',
    templateUrl: './info-icons-demo.component.html',
    styleUrls: ['./info-icons-demo.component.scss']
})
export class InfoIconsDemoComponent extends BaseDemoComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
