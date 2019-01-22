import {Component} from '@angular/core';

/**
 * @title Progress spinner
 */
@Component({
    selector: 'hc-progress-spinner-example',
    templateUrl: 'progress-spinner-example.component.html',
    styleUrls: ['progress-spinner-example.component.scss']
})
export class ProgressSpinnerExampleComponent {
    spinnerIsDeterminate = false;
    spinnerProgress = 25;
    spinnerColor = 'blue';
    spinnerDiameter = 50;
    spinnerHasChannel = true;
    spinnerCentered = true;
}
