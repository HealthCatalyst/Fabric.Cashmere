import {Component} from '@angular/core';

/**
 * @title Chip Rows (Single Row)
 */
@Component({
    selector: 'chip-singlerow-example',
    templateUrl: 'chip-singlerow-example.html',
    styleUrls: ['chip-singlerow-example.css']
})
export class ChipSinglerowExample {
    hideChip(event: any) {
        event.target.style.display = 'none';
    }
}
