import {Component} from '@angular/core';
import {SectionService} from '../../shared/section.service';
import {BaseDemoComponent} from '../../shared/base-demo.component';

@Component({
    selector: 'hc-logo',
    templateUrl: './logo-demo.component.html',
    styleUrls: ['./logo-demo.component.scss']
})
export class LogoDemoComponent extends BaseDemoComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
