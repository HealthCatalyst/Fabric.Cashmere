import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'hc-filter-button',
    template: `<img src="./assets/FilterIcon.svg" class="filter-img">{{buttonLabel}}`,
    styleUrls: ['../chip.component.scss']
})
export class FilterButtonComponent {
    @HostBinding('class') hostClass = 'filter-button';

    buttonLabel: string = 'Filters off';

    constructor() {
    }
}
