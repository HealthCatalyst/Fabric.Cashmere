import {Component} from '@angular/core';

/**
 * @title Busy overview
 */

@Component({
    selector: 'hc-busy-indicator-overview-example',
    templateUrl: 'busy-indicator-overview-example.component.html',
    styleUrls: ['busy-indicator-overview-example.component.scss']
})
export class BusyIndicatorOverviewExampleComponent {
    busyClass = 'hidden';

    showBusy() {
        this.busyClass = '';
        setTimeout(() => {
            this.busyClass = 'hidden';
        }, 3000);
    }
}
