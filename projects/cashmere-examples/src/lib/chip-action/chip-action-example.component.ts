import {Component} from '@angular/core';

export interface ActionChip {
    color: string;
    name: string;
    hidden: boolean;
}

/**
 * @title Action Chips
 */
@Component({
    selector: 'hc-chip-action-example',
    templateUrl: 'chip-action-example.component.html'
})
export class ChipActionExampleComponent {
    chipset: ActionChip[] = [{color: 'red', name: 'Action One', hidden: false}, {color: 'neutral', name: 'Action Two', hidden: false}];
}
