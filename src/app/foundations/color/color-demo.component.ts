import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseFoundationsComponent} from '../base-foundations.component';

@Component({
    selector: 'hc-color-demo',
    templateUrl: './color-demo.component.html',
    styleUrls: ['./color-demo.component.scss']
})
export class ColorDemoComponent extends BaseFoundationsComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
