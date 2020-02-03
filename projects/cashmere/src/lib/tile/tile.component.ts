import {Component, HostBinding, Input} from '@angular/core';
import {parseBooleanAttribute} from '../util';

/** Container element to help segment content visually against a gray background.
 * The tile will expand to the height and width of the content it contains. */
@Component({
    selector: 'hc-tile',
    template: '<ng-content></ng-content>'
})
export class TileComponent {
    @HostBinding('class.hc-tile')
    _hostClass = true;

    @HostBinding('class.hc-tile-padding')
    _hasPadding = true;

    /** If true, remove the default 30px 35px padding on the tile. Defaults to false  */
    @Input()
    get tight(): boolean {
        return !this._hasPadding;
    }
    set tight(value) {
        this._hasPadding = !parseBooleanAttribute(value);
    }

    constructor() {}
}
