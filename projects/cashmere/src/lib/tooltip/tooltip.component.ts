import {Component, Input, ViewEncapsulation} from '@angular/core';

/** Displays additional information on hover above the element after a specified delay */
@Component({
    selector: 'hc-tooltip',
    templateUrl: './tooltip.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HcTooltipComponent {
    /** The content to be display in the tooltip */
    @Input()
    title: string = '';

    /** The amount of time before the tooltip displays (in ms) *default is 500* */
    @Input()
    hoverDelay: number = 500;

    /** UPDATE ME */
    @Input()
    underline: boolean = true;
}
