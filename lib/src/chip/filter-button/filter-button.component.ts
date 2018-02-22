import { Component, HostBinding, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'hc-filter-button',
    template: `<img src="./assets/FilterIcon.svg" class="filter-img">{{buttonLabel}}`,
    styleUrls: ['../chip.component.scss']
})
export class FilterButtonComponent implements OnChanges  {
    @HostBinding('class') hostClass = 'filter-button';

    @Input() labelOff: string = 'Filters off';
    @Input() labelOn: string = 'Filters on';
    @Input() buttonState: boolean = false;
    buttonLabel: string = this.labelOff;

    constructor() {
    }

    ngOnChanges() {
        this.buttonLabel = (this.buttonState) ? this.labelOn : this.labelOff;
    }
}
