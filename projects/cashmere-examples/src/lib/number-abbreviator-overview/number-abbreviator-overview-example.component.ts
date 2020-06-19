import {Component} from '@angular/core';

/**
 * @title Number Abbreviator Pipe overview example
 */
@Component({
    selector: 'hc-number-abbreviator-overview-example',
    templateUrl: 'number-abbreviator-overview-example.component.html'
})
export class NumberAbbreviatorOverviewExampleComponent {
    number: number = 123456789;
    decimalPoints: number = 2;
    threshold: number = 1000000;
}
