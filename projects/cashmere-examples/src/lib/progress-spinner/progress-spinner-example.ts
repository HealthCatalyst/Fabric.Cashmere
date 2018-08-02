import {Component} from '@angular/core';

/**
 * @title Progress spinner
 */
@Component({
    selector: 'progress-spinner-example',
    templateUrl: 'progress-spinner-example.html',
    styles: [
        `.progress-example { display: flex; margin-top: 20px; }
        .col-2 { flex: 1 0 auto; margin-left: 20px; }
        .progress-component-container { height: 100%; width: 100%; position: relative; padding: 15px; border: 1px solid #e5e5e5; }
        .progress-component-container.dark-bg { background-color: #384655; }
        label, hc-checkbox { margin: 20px 0 5px; display: block; }`
    ]
})
export class ProgressSpinnerExample {
    spinnerIsDeterminate = false;
    spinnerProgress = 25;
    spinnerColor = 'blue';
    spinnerDiameter = 50;
    spinnerHasChannel = true;
    spinnerCentered = true;
}
