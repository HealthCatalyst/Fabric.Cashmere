import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * @title Tile overview
 */
@Component({
    selector: 'hc-tile-overview-example',
    templateUrl: 'tile-overview-example.component.html',
    styleUrls: ['tile-overview-example.component.scss']
})
export class TileOverviewExampleComponent {
    headerControl = new FormControl('blue', {nonNullable: true});
}
