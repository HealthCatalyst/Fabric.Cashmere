import {Component} from '@angular/core';

/**
 * @title Chip Rows (Single Row)
 */
@Component({
    selector: 'hc-example',
    templateUrl: 'chip-singlerow-example.component.html',
    styleUrls: ['chip-singlerow-example.component.sass']
})
export class ChipSinglerowExampleComponent {
    hideChip(event: any) {
        event.target.style.display = 'none';
    }
}
