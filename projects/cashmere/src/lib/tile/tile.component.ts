import {Component, Input, HostBinding, ViewEncapsulation} from '@angular/core';
import {parseBooleanAttribute} from '../util';

/** Container element to help segment content visually against a gray background.
 * The tile will expand to the height and width of the content it contains. */
@Component({
    selector: 'hc-tile',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class TileComponent {
    @HostBinding('class.hc-tile')
    _hostClass = true;

    @HostBinding('class.hc-tile-tight')
    _tight = false;

    /** If true, compress the default padding in the tile. Defaults to false  */
    @Input()
    get tight(): boolean {
        return this._tight;
    }
    set tight(value) {
        this._tight = parseBooleanAttribute(value);
    }

    constructor() {}
}
