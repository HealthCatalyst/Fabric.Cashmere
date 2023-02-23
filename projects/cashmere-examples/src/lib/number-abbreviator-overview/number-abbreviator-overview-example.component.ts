import {Component} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';

/**
 * @title Number Abbreviator Pipe overview example
 */
@Component({
    selector: 'hc-number-abbreviator-overview-example',
    templateUrl: 'number-abbreviator-overview-example.component.html'
})
export class NumberAbbreviatorOverviewExampleComponent {
    number = new UntypedFormControl(123456789);
    decimalPoints = new UntypedFormControl(2);
    threshold = new UntypedFormControl(1000000);
}
