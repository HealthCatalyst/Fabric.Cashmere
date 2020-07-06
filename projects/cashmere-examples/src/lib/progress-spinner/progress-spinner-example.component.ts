import {Component} from '@angular/core';
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
    readonly spinnerIsDeterminate = new FormControl(false);
    readonly spinnerProgress = new FormControl(25);
    readonly spinnerColor = new FormControl('blue');
    readonly spinnerDiameter = new FormControl(50);
    readonly spinnerHasChannel = new FormControl(true);
    readonly spinnerCentered = new FormControl(true);
}
