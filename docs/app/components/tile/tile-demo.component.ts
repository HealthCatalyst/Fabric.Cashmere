import { Component } from '@angular/core';

@Component({
    selector: 'hc-tile-demo',
    templateUrl: './tile-demo.component.html'
})
export class TileDemoComponent {
    lastModified: Date = new Date( document.lastModified );
}
