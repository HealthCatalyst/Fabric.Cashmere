import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * @title Progress bar
 */
@Component({
    selector: 'hc-progress-bar-example',
    templateUrl: 'progress-bar-example.component.html',
    styleUrls: ['progress-bar-example.component.scss'],
    standalone: false
})
export class ProgressBarExampleComponent {
    readonly barIsDeterminate = new FormControl(false, {nonNullable: true});
    readonly barProgress = new FormControl(25, {nonNullable: true});
    readonly barColor = new FormControl('blue', {nonNullable: true});
    readonly hasLabel = new FormControl(false, {nonNullable: true});
    readonly hasValue = new FormControl(false, {nonNullable: true});
}
