import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SectionService} from 'src/app/shared/section.service';
import {BaseStylesComponent} from '../base-styles.component';

@Component({
    selector: 'hc-code',
    templateUrl: './code-demo.component.html',
    styleUrls: ['./code-demo.component.scss']
})
export class CodeDemoComponent extends BaseStylesComponent {
    public document: string = require('raw-loader!../../../../guides/styles/code.md');
    private section: string | null;

    constructor(sectionService: SectionService) {
        super(sectionService);
    }
}
