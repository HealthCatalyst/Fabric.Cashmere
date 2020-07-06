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
    pageNumberControl = new FormControl(8);
    pageSizeControl = new FormControl(100);
    totalItemsControl = new FormControl(1000);

    get pageNumber() {
        return this.pageNumberControl.value;
    }
    set pageNumber(value: number) {
        this.pageNumberControl.setValue(value);
    }

    get pageSize() {
        return this.pageSizeControl.value;
    }
    set pageSize(value: number) {
        this.pageSizeControl.setValue(value);
    }
}
