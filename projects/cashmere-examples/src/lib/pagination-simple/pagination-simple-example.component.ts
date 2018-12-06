import {Component} from '@angular/core';

/**
 * @title Simple pagination
 */
@Component({
    selector: 'hc-pagination-simple-example',
    templateUrl: 'pagination-simple-example.component.html'
})
export class PaginationSimpleExample {
    _pageNumber: number = 15;
    pageSize: number = 20;
    totalItems: number = 1000;

    get pageNumber() {
        return this._pageNumber;
    }
    set pageNumber(value: number) {
        this._pageNumber = value;
        console.log(`pageNumber set to ${value}`);
    }
}
