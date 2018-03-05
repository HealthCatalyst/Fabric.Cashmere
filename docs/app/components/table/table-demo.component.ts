import { Component } from '@angular/core';

@Component({
    selector: 'hc-table-demo',
    templateUrl: './table-demo.component.html',
    styleUrls: ['./table-demo.component.scss']
})
export class TableDemoComponent {
    lastModified: Date = new Date(document.lastModified);
    rows = [
        {
            heading1: 'Row 1 Column 1',
            heading2: 'Row 1 Column 2',
            heading3: 'Row 1 Column 3'
        },
        {
            heading1: 'Row 2 Column 1',
            heading2: 'Row 2 Column 2',
            heading3: 'Row 2 Column 3'
        },
        {
            heading1: 'Row 3 Column 1',
            heading2: 'Row 3 Column 2',
            heading3: 'Row 3 Column 3'
        }
    ]
}
