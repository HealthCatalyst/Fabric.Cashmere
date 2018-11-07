import {Component} from '@angular/core';

/**
 * @title Standard pagination
 */
@Component({
    selector: 'pagination-standard-example',
    templateUrl: 'pagination-standard-example.html',
    styleUrls: ['pagination-standard-example.css']
})
export class PaginationStandardExample {
    length = 400;
    currentPage = 8;
    hidePageSize = false;
}
