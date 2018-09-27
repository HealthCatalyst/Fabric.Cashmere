import {Component} from '@angular/core';

/**
 * @title Action Chips
 */
@Component({
    selector: 'chip-action-example',
    templateUrl: 'chip-action-example.html',
    styleUrls: ['chip-action-example.css']
})
export class ChipActionExample {
    hideChip(event: any) {
        event.target.style.display = 'none';
    }
}
