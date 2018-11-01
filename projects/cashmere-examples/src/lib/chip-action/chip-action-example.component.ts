import {Component} from '@angular/core';

/**
 * @title Action Chips
 */
@Component({
    selector: 'hc-example',
    templateUrl: 'chip-action-example.component.html'
})
export class ChipActionExampleComponent {
    hideChip(event: any) {
        event.target.style.display = 'none';
    }
}
