import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseFoundationsComponent} from '../base-foundations.component';

@Component({
    selector: 'hc-products',
    templateUrl: './products-demo.component.html',
    styleUrls: ['./products-demo.component.scss']
})
export class ProductsDemoComponent extends BaseFoundationsComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
