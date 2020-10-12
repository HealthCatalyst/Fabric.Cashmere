import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseStylesComponent} from '../base-styles.component';

@Component({
    selector: 'hc-brand-color-demo',
    templateUrl: './brand-color-demo.component.html',
    styleUrls: ['../color/color-demo.component.scss']
})
export class BrandColorDemoComponent extends BaseStylesComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
