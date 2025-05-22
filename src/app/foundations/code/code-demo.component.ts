import {Component} from '@angular/core';
import {SectionService} from '../../shared/section.service';
import {BaseDemoComponent} from '../../shared/base-demo.component';

@Component({
    selector: 'hc-code',
    templateUrl: './code-demo.component.html',
    styleUrls: ['./code-demo.component.scss'],
    standalone: false
})
export class CodeDemoComponent extends BaseDemoComponent {
    public document: string = require('../../../../guides/foundations/code.md');

    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
