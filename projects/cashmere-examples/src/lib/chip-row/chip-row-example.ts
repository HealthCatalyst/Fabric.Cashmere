import {Component} from '@angular/core';

/**
 * @title Chip Rows
 */
@Component({
    selector: 'chip-row-example',
    templateUrl: 'chip-row-example.html',
    styleUrls: ['chip-row-example.css']
})
export class ChipRowExample {
    hideChip(event: any) {
        event.target.style.display = 'none';
    }
}
