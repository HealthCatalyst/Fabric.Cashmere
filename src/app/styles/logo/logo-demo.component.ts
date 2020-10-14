import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseStylesComponent} from '../base-styles.component';

@Component({
    selector: 'hc-logo',
    templateUrl: './logo-demo.component.html',
    styleUrls: ['./logo-demo.component.scss']
})
export class LogoDemoComponent extends BaseStylesComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
