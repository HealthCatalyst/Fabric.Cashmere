import {Component} from '@angular/core';
import {SectionService} from '../../shared/section.service';
import {BaseDemoComponent} from '../../shared/base-demo.component';

@Component({
    selector: 'hc-fonts',
    templateUrl: './fonts-demo.component.html',
    styleUrls: ['./fonts-demo.component.scss'],
    standalone: false
})
export class FontsDemoComponent extends BaseDemoComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
