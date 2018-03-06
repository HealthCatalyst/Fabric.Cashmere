import { Component } from '@angular/core';

@Component({
    selector: 'hc-grid-demo',
    templateUrl: './grid-demo.component.html',
    styleUrls: ['./grid-demo.component.scss']
})
export class GridDemoComponent {
    lastModified: Date = new Date(document.lastModified);
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
        }
        , {
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
        }
    ]
}
