import {Component} from '@angular/core';

/**
 * @title Progress indicator overview
 */
@Component({
    selector: 'progress-indicator-overview-example',
    templateUrl: 'progress-indicator-overview-example.html',
    styleUrls: ['progress-indicator-overview-example.css']
})
export class ProgressIndicatorOverviewExample {
    spinnerIsDeterminate = false;
    spinnerProgress = 25;
    spinnerColor = 'blue';
    spinnerDiameter = 50;
    spinnerHasChannel = true;
    spinnerCentered = true;

    dotsColor = 'dark';
    dotsMini = false;
    dotsCentered = true;
}
