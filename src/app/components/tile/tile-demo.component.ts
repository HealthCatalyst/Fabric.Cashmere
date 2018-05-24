import {Component} from '@angular/core';

@Component({
    selector: 'hc-tile-demo',
    templateUrl: './tile-demo.component.html'
})
export class TileDemoComponent {
    lastModified: Date = new Date(document.lastModified);
    public document: string = require('raw-loader!../../../../guides/components/tile.md');
}
