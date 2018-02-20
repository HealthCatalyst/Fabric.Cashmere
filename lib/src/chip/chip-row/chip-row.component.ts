import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'hc-chip-row',
    templateUrl: './chip-row.component.html',
    styleUrls: ['../chip.component.scss']
})
export class ChipRowComponent {
    @HostBinding('class') hostClass = 'chip-row';

    constructor() {
    }
}
