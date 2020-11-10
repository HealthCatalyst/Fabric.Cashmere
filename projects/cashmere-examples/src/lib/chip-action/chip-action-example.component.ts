import {Component} from '@angular/core';

/**
 * @title Action Chips
 */
@Component({
    selector: 'hc-chip-action-example',
    templateUrl: 'chip-action-example.component.html',
    styleUrls: ['chip-action-example.component.scss']
})
export class ChipActionExampleComponent {
    chips: boolean[] = [true, true];
}
