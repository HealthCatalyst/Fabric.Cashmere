import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * @title Number Abbreviator Pipe overview example
 */
@Component({
    selector: 'hc-number-abbreviator-overview-example',
    templateUrl: 'number-abbreviator-overview-example.component.html'
})
export class NumberAbbreviatorOverviewExampleComponent {
    number = new FormControl(123456789);
    decimalPoints = new FormControl(2);
    threshold = new FormControl(1000000);
}
