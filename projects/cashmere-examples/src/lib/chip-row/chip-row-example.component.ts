import {Component} from '@angular/core';

export interface RowChip {
    name: string;
    hidden: boolean;
}

/**
 * @title Chip Rows
 */
@Component({
    selector: 'hc-chip-row-example',
    templateUrl: 'chip-row-example.component.html',
    styleUrls: ['chip-row-example.component.scss']
})
export class ChipRowExampleComponent {
    chipset: RowChip[] = [
        {name: 'Hospital (2)', hidden: false},
        {name: 'MS-DRG (43)', hidden: false},
        {name: 'Payer (11)', hidden: false},
        {name: 'Clinical Program (103)', hidden: false},
        {name: 'Care Process (4)', hidden: false},
        {name: 'Age (1)', hidden: false},
        {name: 'Discharge Status (37)', hidden: false},
        {name: 'Gender (1)', hidden: false},
        {name: 'ER Visit (3)', hidden: false}
    ];
}
