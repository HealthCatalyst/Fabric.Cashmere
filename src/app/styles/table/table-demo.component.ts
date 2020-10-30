import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseStylesComponent} from '../base-styles.component';

@Component({
    selector: 'hc-table-demo',
    templateUrl: './table-demo.component.html'
})
export class TableDemoComponent extends BaseStylesComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
