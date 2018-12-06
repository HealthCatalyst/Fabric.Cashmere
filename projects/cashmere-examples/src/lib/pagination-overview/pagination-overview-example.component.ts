import {Component} from '@angular/core';

/**
 * @title Pagination overview
 */
@Component({
    selector: 'hc-pagination-overview-example',
    templateUrl: 'pagination-overview-example.component.html'
})
export class PaginationOverviewExampleComponent {
    totalPages = 16;
    currentPage = 8;
}
