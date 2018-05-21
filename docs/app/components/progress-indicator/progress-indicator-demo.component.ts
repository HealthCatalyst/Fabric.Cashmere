import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'hc-progress-indicator-demo',
    templateUrl: './progress-indicator-demo.component.html',
    styleUrls: ['./progress-indicator-demo.component.scss']
})
export class ProgressIndicatorDemoComponent {
    lastModified: Date = new Date(document.lastModified);
    public document: string = require('raw-loader!../../../../guides/components/progress-indicator.md');

    public spinnerIsDeterminate = false;
    public spinnerProgress = 25;
    public spinnerColor = 'blue';
    public spinnerDiameter = 50;
    public spinnerHasChannel = true;
    public spinnerCentered = true;

    public dotsColor = 'dark';
    public dotsMini = false;
    public dotsCentered = true;
}
