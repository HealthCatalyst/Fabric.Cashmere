import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseDemoComponent} from '../../shared/base-demo.component';

@Component({
    selector: 'hc-code',
    templateUrl: './code-demo.component.html',
    styleUrls: ['./code-demo.component.scss']
})
export class CodeDemoComponent extends BaseDemoComponent {
    public document: string = require('raw-loader!../../../../guides/foundations/code.md');
    private section: string | null;

    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
