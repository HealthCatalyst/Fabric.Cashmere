import {Component} from '@angular/core';

/**
 * @title Chip Rows (Single Row)
 */
@Component({
    selector: 'hc-chip-singlerow-example',
    templateUrl: 'chip-singlerow-example.component.html',
    styleUrls: ['chip-singlerow-example.component.scss']
})
export class ChipSinglerowExampleComponent {
    chipset: string[] = ['Payer (11)', 'Clinical Program (103)', 'Care Process (4)', 'Discharge Status (37)', 'Gender (1)', 'ER Visit (3)'];

    closeChip(chip: string) {
        for (let i = 0; i < this.chipset.length; i++) {
            if (chip === this.chipset[i]) {
                this.chipset.splice(i, 1);
                break;
            }
        }
    }
}
