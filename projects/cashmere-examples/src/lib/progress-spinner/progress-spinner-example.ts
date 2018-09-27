import {Component} from '@angular/core';

/**
 * @title Progress spinner
 */
@Component({
    selector: 'progress-spinner-example',
    templateUrl: 'progress-spinner-example.html',
    styleUrls: ['progress-spinner-example.css']
})
export class ProgressSpinnerExample {
    spinnerIsDeterminate = false;
    spinnerProgress = 25;
    spinnerColor = 'blue';
    spinnerDiameter = 50;
    spinnerHasChannel = true;
    spinnerCentered = true;
}
