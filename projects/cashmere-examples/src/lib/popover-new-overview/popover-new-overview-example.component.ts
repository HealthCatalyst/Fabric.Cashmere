import {Component} from '@angular/core';

/**
 * @title Popover Overview
 */
@Component({
    selector: 'hc-popover-new-overview-example',
    templateUrl: 'popover-new-overview-example.component.html',
    styleUrls: ['popover-new-overview-example.component.scss']
})
export class PopoverNewOverviewExampleComponent {
    public scrollStrat = "reposition";
    public hAlign = "after";
    public vAlign = "below";
    public popText = "NIFTY!!";
    public shouldAnimate = true;
    public clickAway = true;
    public forceAlignment = false;
    public lockAlignment = false;
}
