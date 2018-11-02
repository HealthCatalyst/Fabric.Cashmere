import {Component} from '@angular/core';

/**
 * @title Chip Rows
 */
@Component({
    selector: 'hc-example',
    templateUrl: 'chip-row-example.component.html',
    styleUrls: ['chip-row-example.component.scss']
})
export class ChipRowExampleComponent {
    hideChip(event: any) {
        event.target.style.display = 'none';
    }
}
