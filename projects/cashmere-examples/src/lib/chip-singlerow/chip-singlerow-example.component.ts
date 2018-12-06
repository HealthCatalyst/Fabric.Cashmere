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
    hideChip(event: any) {
        event.target.style.display = 'none';
    }
}
