import {Component} from '@angular/core';

/**
 * @title Pagination overview
 */
@Component({
    selector: 'pagination-overview-example',
    templateUrl: 'pagination-overview-example.html',
    styleUrls: ['pagination-overview-example.css']
})
export class PaginationOverviewExample {
    totalPages = 16;
    currentPage = 8;
}
