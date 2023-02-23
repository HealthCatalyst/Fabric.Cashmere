import {Component} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';

/**
 * @title Popover Overview
 */
@Component({
    selector: 'hc-popover-overview-example',
    templateUrl: 'popover-overview-example.component.html',
    styleUrls: ['popover-overview-example.component.scss']
})
export class PopoverOverviewExampleComponent {
    readonly hAlignControl = new UntypedFormControl('center');
    readonly vAlignControl = new UntypedFormControl('below');
    readonly scrollStratControl = new UntypedFormControl('reposition');
    readonly trigControl = new UntypedFormControl('click');
    readonly popTextControl = new UntypedFormControl('NIFTY');
    readonly hoverDelayControl = new UntypedFormControl(500);
    readonly shouldAnimateControl = new UntypedFormControl(true);
    readonly clickAwayControl = new UntypedFormControl(true);
    readonly showArrowControl = new UntypedFormControl(true);
    readonly forceAlignmentControl = new UntypedFormControl(false);
    readonly lockAlignmentControl = new UntypedFormControl(false);
    readonly maxWidthControl = new UntypedFormControl('none');
}
