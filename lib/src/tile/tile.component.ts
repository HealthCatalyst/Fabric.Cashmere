import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'hc-tile',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./tile.component.scss']
})
export class TileComponent {

    constructor() {
    }

}
