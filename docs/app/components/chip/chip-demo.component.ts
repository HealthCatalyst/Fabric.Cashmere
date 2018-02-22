import { Component } from '@angular/core';

@Component({
    selector: 'hc-chip-demo',
    templateUrl: './chip-demo.component.html'
})

export class ChipDemoComponent {
    lastModified: Date = new Date( document.lastModified );
    numChips: number = 9;
    numChipsSetTwo: number = 6;
    firstFilter: boolean = true;
    secondFilter: boolean = true;

    hideExampleChip( event: any ) {
        event.target.style.display = 'none';
    }

    hideChip( event: any ) {
        event.target.style.display = 'none';
        this.numChips--;
        if ( this.numChips === 0 ) {
            this.firstFilter = false;
        }
    }

    hideChipSetTwo( event: any ) {
        event.target.style.display = 'none';
        this.numChipsSetTwo--;
        if ( this.numChipsSetTwo === 0 ) {
            this.secondFilter = false;
        }
    }
}
