import {Component} from '@angular/core';

/**
 * @title Action Chips
 */
@Component({
    selector: 'chip-action-example',
    templateUrl: 'chip-action-example.html'
})
export class ChipActionExample {
    hideChip(event: any) {
        event.target.style.display = 'none';
    }
}
