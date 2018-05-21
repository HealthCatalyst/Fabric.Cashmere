import {Component, Input, ViewEncapsulation} from '@angular/core';
import {ChipComponent} from '../chip.component';
import {parseBooleanAttribute} from '../../util';

@Component({
    selector: 'hc-chip-row',
    template: `<div class="chip-row-contents" [ngClass]="{'single-row': !_wrap}"><div>
                    <div class="row-buffer"><ng-content></ng-content></div>
                </div></div>`,
    styleUrls: ['../chip.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChipRowComponent {
    _wrap: boolean = true;

    constructor() {}

    @Input()
    get wrap(): boolean {
        return this._wrap;
    }

    set wrap(doWrap) {
        this._wrap = parseBooleanAttribute(doWrap);
    }
}
