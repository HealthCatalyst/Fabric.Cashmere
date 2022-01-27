import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseDemoComponent} from '../../shared/base-demo.component';

@Component({
    selector: 'hc-ie-support-demo',
    templateUrl: './ie-support.component.html',
    styleUrls: ['./ie-support.component.scss']
})
export class IESupportComponent extends BaseDemoComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
