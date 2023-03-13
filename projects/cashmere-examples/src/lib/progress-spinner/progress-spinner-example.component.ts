import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * @title Progress spinner
 */
@Component({
    selector: 'hc-progress-spinner-example',
    templateUrl: 'progress-spinner-example.component.html',
    styleUrls: ['progress-spinner-example.component.scss']
})
export class ProgressSpinnerExampleComponent {
    readonly spinnerIsDeterminate = new FormControl(false, {nonNullable: true});
    readonly spinnerProgress = new FormControl(25, {nonNullable: true});
    readonly spinnerColor = new FormControl('blue', {nonNullable: true});
    readonly spinnerDiameter = new FormControl(50, {nonNullable: true});
    readonly spinnerHasChannel = new FormControl(true, {nonNullable: true});
    readonly spinnerCentered = new FormControl(true, {nonNullable: true});
}
