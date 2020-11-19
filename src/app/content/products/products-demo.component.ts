import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseContentComponent} from '../base-content.component';

@Component({
    selector: 'hc-products',
    templateUrl: './products-demo.component.html',
    styleUrls: ['./products-demo.component.scss']
})
export class ProductsDemoComponent extends BaseContentComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
