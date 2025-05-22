import {Component} from '@angular/core';
import {SectionService} from '../../../shared/section.service';
import {BaseDemoComponent} from '../../../shared/base-demo.component';

@Component({
    selector: 'hc-persona-org',
    templateUrl: './persona-org.component.html',
    styleUrls: ['./persona-org.component.scss'],
    standalone: false
})
export class PersonaOrgComponent extends BaseDemoComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
