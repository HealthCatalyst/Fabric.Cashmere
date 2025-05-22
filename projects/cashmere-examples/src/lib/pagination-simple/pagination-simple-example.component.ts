import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * @title Simple pagination
 */
@Component({
    selector: 'hc-pagination-simple-example',
    templateUrl: 'pagination-simple-example.component.html',
    standalone: false
})
export class PaginationSimpleExampleComponent {
    pageNumberControl = new FormControl(8, {nonNullable: true});
    pageSizeControl = new FormControl(100, {nonNullable: true});
    totalItemsControl = new FormControl(1000, {nonNullable: true});
    widthControl = new FormControl('lg', {nonNullable: true});

    get pageNumber(): number {
        return this.pageNumberControl.value;
    }
    set pageNumber(value: number) {
        this.pageNumberControl.setValue(value);
    }

    get pageSize(): number {
        return this.pageSizeControl.value;
    }
    set pageSize(value: number) {
        this.pageSizeControl.setValue(value);
    }
}
