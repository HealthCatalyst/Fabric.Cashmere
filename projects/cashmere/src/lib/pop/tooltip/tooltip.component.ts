import {Component, Input, ViewEncapsulation} from '@angular/core';
import {HcPopComponent} from '../popover.component';
import {transformPopover} from '../popover.animations';

/** Displays additional information on hover above the element after a specified delay */
@Component({
    selector: 'hc-tooltip',
    templateUrl: './tooltip.component.html',
    animations: [transformPopover],
    styleUrls: ['../popover.component.scss', './tooltip.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HcTooltipComponent extends HcPopComponent {
    /** The content to be display in the tooltip */
    @Input()
    tooltipContent = '';
}
