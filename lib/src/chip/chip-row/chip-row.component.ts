import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ChipComponent } from '../chip.component';
import { anyToBoolean } from '../../util';

@Component({
    selector: 'hc-chip-row',
    template: `<div [ngClass]="contentClass"><div><div class="row-buffer"><ng-content></ng-content></div></div></div>`,
    styleUrls: ['../chip.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChipRowComponent {
    _wrap: boolean = true;
    contentClass: string = 'chip-row-contents';

    constructor( ) {
    }

    @Input()
    get wrap(): boolean {
        return this._wrap;
    }

    set wrap(doWrap) {
        this._wrap = anyToBoolean(doWrap);
        if ( !this._wrap ) {
            this.contentClass = 'chip-row-contents single-row';
        }
    }
}
