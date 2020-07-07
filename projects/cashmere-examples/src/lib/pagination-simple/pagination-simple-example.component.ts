import {Component} from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * @title Simple pagination
 */
@Component({
    selector: 'hc-pagination-simple-example',
    templateUrl: 'pagination-simple-example.component.html'
})
export class PaginationSimpleExampleComponent {
    _pageNumber: number = 8;
    pageSize: number = 100;
    totalItems: number = 1000;
    widthControl = new FormControl('lg');

    get pageNumber() {
        return this._pageNumber;
    }
    set pageNumber(value: number) {
        this._pageNumber = value;
        console.log(`pageNumber set to ${value}`);
    }
}
