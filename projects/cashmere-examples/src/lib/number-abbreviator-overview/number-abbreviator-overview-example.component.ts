import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * @title Number Abbreviator Pipe overview example
 */
@Component({
    selector: 'hc-number-abbreviator-overview-example',
    templateUrl: 'number-abbreviator-overview-example.component.html',
    standalone: false
})
export class NumberAbbreviatorOverviewExampleComponent {
    number = new FormControl(123456789, {nonNullable: true});
    decimalPoints = new FormControl(2, {nonNullable: true});
    threshold = new FormControl(1000000, {nonNullable: true});
}
