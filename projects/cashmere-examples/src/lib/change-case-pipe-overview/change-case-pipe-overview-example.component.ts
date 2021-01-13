import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import * as changeCase from 'change-case';

@Component({
    selector: 'hc-change-case-pipe-overview-example',
    templateUrl: './change-case-pipe-overview-example.component.html'
})
export class ChangeCasePipeOverviewExampleComponent {
    textControl = new FormControl('some text');
    caseControl = new FormControl('pascalCase');

    availableCases = Object.keys(changeCase).filter(fn => fn.endsWith('Case'));
}
