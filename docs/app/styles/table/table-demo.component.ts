import { Component } from '@angular/core';

@Component({
    selector: 'hc-table-demo',
    templateUrl: './table-demo.component.html'
})
export class TableDemoComponent {

    lastModified: Date = new Date( document.lastModified );
}
