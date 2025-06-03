import {Component, Input, ViewEncapsulation} from '@angular/core';
import {parseBooleanAttribute} from '../../util';

/** Supporting component to help with grouping chips into collections */
@Component({
    selector: 'hc-chip-row',
    template: `
        <div class="hc-chip-row-contents" [ngClass]="{'hc-chip-single-row': !wrap}">
            <div>
                <div class="hc-chip-row-buffer"><ng-content></ng-content></div>
            </div>
        </div>
    `,
    styleUrls: ['../chip.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class ChipRowComponent {
    private _wrap = true;

    /** If false, constrain the container to one line with overflow ellipses (default=true) */
    @Input()
    get wrap(): boolean {
        return this._wrap;
    }

    set wrap(doWrap: boolean) {
        this._wrap = parseBooleanAttribute(doWrap);
    }
}
