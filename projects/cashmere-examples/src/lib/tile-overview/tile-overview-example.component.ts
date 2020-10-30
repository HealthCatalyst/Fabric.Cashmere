import { Component } from '@angular/core';
import { SelectChangeEvent } from '@healthcatalyst/cashmere';

/**
 * @title Tile overview
 */
@Component({
    selector: 'hc-tile-overview-example',
    templateUrl: 'tile-overview-example.component.html',
    styleUrls: ['tile-overview-example.component.scss']
})
export class TileOverviewExampleComponent {
    headerType = 'blue';

    typeChange( selectVal: SelectChangeEvent ) {
        this.headerType = selectVal.value;
    }
}
