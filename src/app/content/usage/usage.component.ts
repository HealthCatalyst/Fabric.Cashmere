import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseDemoComponent} from '../../shared/base-demo.component';

@Component({
    selector: 'hc-usage',
    templateUrl: './usage.component.html',
    styleUrls: ['./usage.component.scss'],
    standalone: false
})
export class UsageComponent extends BaseDemoComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
