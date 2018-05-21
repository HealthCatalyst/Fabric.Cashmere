import {Component} from '@angular/core';
import {FilterButtonComponent} from './filter-button.component';

@Component({
    selector: 'hc-chip-demo',
    templateUrl: './chip-demo.component.html',
    styles: ['.chip-row-wrapper { display: flex; }', '.chip-row-button { display: inline-block; }']
})
export class ChipDemoComponent {
    lastModified: Date = new Date(document.lastModified);
    public document: string = require('raw-loader!../../../../guides/components/chip.md');

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
