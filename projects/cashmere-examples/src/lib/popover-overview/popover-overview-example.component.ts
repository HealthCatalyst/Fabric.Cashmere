import {Component} from '@angular/core';

/**
 * @title Popover Overview
 */
@Component({
    selector: 'hc-popover-overview-example',
    templateUrl: 'popover-overview-example.component.html',
    styleUrls: ['popover-overview-example.component.scss']
})
export class PopoverOverviewExampleComponent {
    public scrollStrat = "reposition";
    public hAlign = "center";
    public vAlign = "below";
    public popText = "NIFTY!!";
    public trig = "click";
    public shouldAnimate = true;
    public clickAway = true;
    public showArrow = true;
    public forceAlignment = false;
    public lockAlignment = false;
}
