import {Component} from '@angular/core';

/**
 * @title Chip overview
 */
@Component({
    selector: 'chip-overview-example',
    templateUrl: 'chip-overview-example.html',
    styles: ['chip-overview-example.css']
})
export class ChipOverviewExample {
    numChips: number = 9;
    numChipsSetTwo: number = 6;
    firstFilter: boolean = true;
    secondFilter: boolean = true;

    hideExampleChip(event: any) {
        event.target.style.display = 'none';
    }

    hideChip(event: any) {
        event.target.style.display = 'none';
        this.numChips--;
        if (this.numChips === 0) {
            this.firstFilter = false;
        }
    }

    hideChipSetTwo(event: any) {
        event.target.style.display = 'none';
        this.numChipsSetTwo--;
        if (this.numChipsSetTwo === 0) {
            this.secondFilter = false;
        }
    }
}
