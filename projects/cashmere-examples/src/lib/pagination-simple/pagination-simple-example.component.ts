import {Component} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

/**
 * @title Simple pagination
 */
@Component({
    selector: 'hc-pagination-simple-example',
    templateUrl: 'pagination-simple-example.component.html'
})
export class PaginationSimpleExampleComponent {
    pageNumberControl = new UntypedFormControl(8);
    pageSizeControl = new UntypedFormControl(100);
    totalItemsControl = new UntypedFormControl(1000);
    widthControl = new UntypedFormControl('lg');

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
