import {Component} from '@angular/core';

/**
 * @title Chip Rows
 */
@Component({
    selector: 'hc-chip-row-example',
    templateUrl: 'chip-row-example.component.html',
    styleUrls: ['chip-row-example.component.scss']
})
export class ChipRowExampleComponent {
    chipset: string[] = [
        'Hospital (2)',
        'MS-DRG (43)',
        'Payer (11)',
        'Clinical Program (103)',
        'Care Process (4)',
        'Age (1)',
        'Discharge Status (37)',
        'Gender (1)',
        'ER Visit (3)'
    ];

    closeChip(chip: string) {
        for (let i = 0; i < this.chipset.length; i++) {
            if (chip === this.chipset[i]) {
                this.chipset.splice(i, 1);
                break;
            }
        }
    }
}
