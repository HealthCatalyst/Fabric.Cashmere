import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseStylesComponent} from '../base-styles.component';

@Component({
    selector: 'hc-products',
    templateUrl: './products-demo.component.html',
    styleUrls: ['./products-demo.component.scss']
})
export class ProductsDemoComponent extends BaseStylesComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
