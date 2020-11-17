import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseFoundationsComponent} from '../base-foundations.component';

@Component({
    selector: 'hc-brand-color-demo',
    templateUrl: './brand-color-demo.component.html',
    styleUrls: ['../color/color-demo.component.scss']
})
export class BrandColorDemoComponent extends BaseFoundationsComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
