import {Component} from '@angular/core';

/** Container element to help segment content visually against a gray background.
 * The tile will expand to the height and width of the content it contains. */
@Component({
    selector: 'hc-tile',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./tile.component.scss']
})
export class TileComponent {
    constructor() {}
}
