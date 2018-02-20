import { Component } from '@angular/core';

@Component({
    selector: 'hc-chip-demo',
    templateUrl: './chip-demo.component.html'
})

export class ChipDemoComponent {
    lastModified: Date = new Date( document.lastModified );

    hideChip( event: any ) {
        event.target.style.display = 'none';
    }
}
