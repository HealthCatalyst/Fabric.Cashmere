import {Component} from '@angular/core';
import {SectionService} from '../../shared/section.service';
import {BaseDemoComponent} from '../../shared/base-demo.component';

@Component({
    selector: 'hc-brand-color-demo',
    templateUrl: './brand-color-demo.component.html',
    styleUrls: ['../color/color-demo.component.scss'],
    standalone: false
})
export class BrandColorDemoComponent extends BaseDemoComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
