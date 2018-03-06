import { GridOptions } from './../../../../lib/src/grid/grid-options';
import { Component } from '@angular/core';

@Component({
    selector: 'hc-grid-demo',
    templateUrl: './grid-demo.component.html',
    styleUrls: ['./grid-demo.component.scss']
})
export class GridDemoComponent {
    lastModified: Date = new Date(document.lastModified);
    gridOptions: GridOptions = {
        rowsPerPage: 3,
        pageNumber: 4,
        sortByColumn: 'heading1',
        sortDirection: 'desc'
    };
    rows = [
        {
            heading1: 'A',
            heading2: 3,
            heading3: new Date(2017, 1, 25)
        },
        {
            heading1: 'C',
            heading2: 2,
            heading3: new Date(1999, 1, 23)
        },
        {
            heading1: 'B',
            heading2: 1,
            heading3: new Date(2013, 4, 4)
        },
        {
            heading1: 'D',
            heading2: 6,
            heading3: new Date(2017, 1, 25)
        },
        {
            heading1: 'F',
            heading2: 5,
            heading3: new Date(1999, 1, 23)
        },
        {
            heading1: 'E',
            heading2: 4,
            heading3: new Date(2013, 4, 4)
        },
        {
            heading1: 'G',
            heading2: 9,
            heading3: new Date(2017, 1, 25)
        },
        {
            heading1: 'I',
            heading2: 8,
            heading3: new Date(1999, 1, 23)
        },
        {
            heading1: 'H',
            heading2: 7,
            heading3: new Date(2013, 4, 4)
        }
        , {
            heading1: 'J',
            heading2: 12,
            heading3: new Date(2017, 1, 25)
        },
        {
            heading1: 'L',
            heading2: 11,
            heading3: new Date(1999, 1, 23)
        },
        {
            heading1: 'K',
            heading2: 10,
            heading3: new Date(2013, 4, 4)
        },
        {
            heading1: 'M',
            heading2: 15,
            heading3: new Date(2017, 1, 25)
        },
        {
            heading1: 'O',
            heading2: 14,
            heading3: new Date(1999, 1, 23)
        },
        {
            heading1: 'N',
            heading2: 13,
            heading3: new Date(2013, 4, 4)
        },
        {
            heading1: 'P',
            heading2: 18,
            heading3: new Date(2017, 1, 25)
        },
        {
            heading1: 'R',
            heading2: 17,
            heading3: new Date(1999, 1, 23)
        },
        {
            heading1: 'Q',
            heading2: 16,
            heading3: new Date(2013, 4, 4)
        },
        {
            heading1: 'S',
            heading2: 21,
            heading3: new Date(2017, 1, 25)
        },
        {
            heading1: 'U',
            heading2: 20,
            heading3: new Date(1999, 1, 23)
        },
        {
            heading1: 'T',
            heading2: 19,
            heading3: new Date(2013, 4, 4)
        }
    ]
}
