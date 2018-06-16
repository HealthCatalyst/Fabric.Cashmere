import {Component} from '@angular/core';

@Component({
    selector: 'hc-pagination-demo',
    templateUrl: './pagination-demo.component.html'
})
export class PaginationDemoComponent {
    lastModified: Date = new Date(document.lastModified);

    totalPages = 16;
    currentPage = 8;
}
