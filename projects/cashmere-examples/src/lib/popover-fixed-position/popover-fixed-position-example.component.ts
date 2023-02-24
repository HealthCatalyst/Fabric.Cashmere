import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * @title Popover Fixed Position
 */
@Component({
    selector: 'hc-popover-fixed-position-example',
    templateUrl: 'popover-fixed-position-example.component.html',
    styleUrls: ['./popover-fixed-position-example.component.scss']
})
export class PopoverFixedPositionExampleComponent {
    xPos = new FormControl(250, {nonNullable: true});
    yPos = new FormControl(60, {nonNullable: true});
}
