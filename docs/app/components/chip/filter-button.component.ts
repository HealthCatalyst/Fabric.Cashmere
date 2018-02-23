import { Component, HostBinding, Input } from '@angular/core';
import { anyToBoolean } from '../../../../lib/src/util';

@Component({
    selector: 'hc-filter-button',
    template: `<img src="./assets/FilterIcon.svg" class="filter-img">{{buttonLabel}}`,
    styleUrls: ['./filter-button.component.scss']
})
export class FilterButtonComponent  {
    @HostBinding('class.filter-button') hostClass = true;
    _buttonState: boolean = false;
    buttonLabel: string = 'Filters off';

    constructor() {
    }

    @Input()
    get buttonState(): boolean {
        return this._buttonState;
    }

    set buttonState(whatState) {
        this._buttonState = anyToBoolean(whatState);
        if ( this._buttonState ) {
            this.buttonLabel = 'Filters On:';
        } else {
            this.buttonLabel = 'Filters Off:';
        }
    }
}
