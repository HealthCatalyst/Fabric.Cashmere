import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * @title Popover Overview
 */
@Component({
    selector: 'hc-popover-overview-example',
    templateUrl: 'popover-overview-example.component.html',
    styleUrls: ['popover-overview-example.component.scss']
})
export class PopoverOverviewExampleComponent {
    readonly hAlignControl = new FormControl('center');
    readonly vAlignControl = new FormControl('below');
    readonly scrollStratControl = new FormControl('reposition');
    readonly trigControl = new FormControl('click');
    readonly popTextControl = new FormControl('NIFTY');
    readonly hoverDelayControl = new FormControl(500);
    readonly shouldAnimateControl = new FormControl(true);
    readonly clickAwayControl = new FormControl(true);
    readonly showArrowControl = new FormControl(true);
    readonly forceAlignmentControl = new FormControl(false);
    readonly lockAlignmentControl = new FormControl(false);
    readonly maxWidthControl = new FormControl('none');
}
