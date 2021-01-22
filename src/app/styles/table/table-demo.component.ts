import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseDemoComponent} from '../../shared/base-demo.component';

@Component({
    selector: 'hc-table-demo',
    templateUrl: './table-demo.component.html'
})
export class TableDemoComponent extends BaseDemoComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
