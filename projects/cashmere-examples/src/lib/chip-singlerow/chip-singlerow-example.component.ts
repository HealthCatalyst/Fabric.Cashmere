import {Component} from '@angular/core';

export interface RowChip {
    name: string;
    hidden: boolean;
}

/**
 * @title Chip Rows (Single Row)
 */
@Component({
    selector: 'hc-chip-singlerow-example',
    templateUrl: 'chip-singlerow-example.component.html',
    styleUrls: ['chip-singlerow-example.component.scss']
})
export class ChipSinglerowExampleComponent {
    chipset: RowChip[] = [
        {name: 'Payer (11)', hidden: false},
        {name: 'Clinical Program (103)', hidden: false},
        {name: 'Care Process (4)', hidden: false},
        {name: 'Discharge Status (37)', hidden: false},
        {name: 'Gender (1)', hidden: false},
        {name: 'ER Visit (3)', hidden: false}
    ];
}
