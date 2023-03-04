import {Component} from '@angular/core';
import {SectionService} from '../../shared/section.service';
import {BaseDemoComponent} from '../../shared/base-demo.component';

@Component({
    selector: 'hc-ai-demo',
    templateUrl: './ai-demo.component.html',
    styleUrls: ['./ai-demo.component.scss']
})
export class AIDemoComponent extends BaseDemoComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
