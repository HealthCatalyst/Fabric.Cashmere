import {Component} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

/**
 * @title Progress spinner
 */
@Component({
    selector: 'hc-progress-spinner-example',
    templateUrl: 'progress-spinner-example.component.html',
    styleUrls: ['progress-spinner-example.component.scss']
})
export class ProgressSpinnerExampleComponent {
    readonly spinnerIsDeterminate = new UntypedFormControl(false);
    readonly spinnerProgress = new UntypedFormControl(25);
    readonly spinnerColor = new UntypedFormControl('blue');
    readonly spinnerDiameter = new UntypedFormControl(50);
    readonly spinnerHasChannel = new UntypedFormControl(true);
    readonly spinnerCentered = new UntypedFormControl(true);
}
