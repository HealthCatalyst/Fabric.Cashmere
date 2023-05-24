import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {coerceNumberProperty} from '@angular/cdk/coercion';
import {BasePaginationComponent} from './base-pagination';
import {FormControl} from '@angular/forms';

/** The pagination control enables the user to navigate across paged content.
 * Although commonly used with tables and data grids, this control may be used any place where paged data is used.
 * */
@Component({
    selector: 'hc-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PaginationComponent extends BasePaginationComponent implements OnInit {
    /** The set of provided page size options to display to the user. *Defaults to [10, 20, 50].* */
    @Input()
    get pageSizeOptions(): number[] {
        return this._pageSizeOptions;
    }
    set pageSizeOptions(value: number[]) {
        this._pageSizeOptions = (value || []).map(p => coerceNumberProperty(p));
        this._updateDisplayedPageSizeOptions();
    }
    private _pageSizeOptions: number[] = [10, 20, 50];

    isFocused = false;
    _pageSizeControl = new FormControl( this.pageSize, {nonNullable: true} );

    /** Displayed set of page size options. Will be sorted and include current page size. */
    _displayedPageSizeOptions: number[] = [];

    /** Sets the controller to a specific width type - `lg`, `md`, or `sm`. Typically adjusted in a window
     * resize listener for responsive layouts. *Defaults to lg.* */
    @Input()
    displayWidth: 'lg' | 'md' | 'sm' = 'lg';

    /** Whether to hide the page size selection UI from the user. *Defaults to false.* */
    @Input()
    get hidePageSize(): boolean {
        return this._hidePageSize;
    }
    set hidePageSize(value: boolean) {
        this._hidePageSize = !!value;
    }
    private _hidePageSize = false;

    /** If true, remove all default padding and margin. *Defaults to `false`.*  */
    @Input() tight = false;

    ngOnInit(): void {
        this._updateDisplayedPageSizeOptions();
        super.ngOnInit();
    }

    get _visiblePages(): Array<number | null> {
        /*
         * if there aren't any pages, don't display any
         */
        if (!this.totalPages) {
            return [];
        }

        /*
         * if there are less than nine pages, display them all
         */
        if (this.totalPages <= 9) {
            const visiblePages: number[] = [];
            for (let i = 1; i <= this.totalPages; i++) {
                visiblePages.push(i);
            }
            return visiblePages;
        }

        /*
         * There should always be exactly nine elements in the paging control.
         * Let n = total pages, p = current page, ... are non-clickable ellipses
         * If the current page number is less than 6, display 1, 2, 3, 4, 5, 6, ..., n-1, n
         * If the current page number within is within 4 of the max, display 1, 2, ..., n-5, n-4, n-3, n-2, n-1, n
         * Otherwise, display 1, 2, ..., p-1, p, p+1, ..., n-1, n
         */
        const n = this.totalPages;
        const p = this.pageNumber || 1;

        if (p < 6) {
            return [1, 2, 3, 4, 5, 6, null, n - 1, n];
        } else if (p >= n - 4) {
            return [1, 2, null, n - 5, n - 4, n - 3, n - 2, n - 1, n];
        } else {
            return [1, 2, null, p - 1, p, p + 1, null, n - 1, n];
        }
    }

    get _collapsedVisiblePages(): Array<number | null> {
        /*
         * if there aren't any pages, don't display any
         */
        if (!this.totalPages) {
            return [];
        }

        /*
         * if there are less than five pages, display them all
         */
        if (this.totalPages <= 5) {
            const visiblePages: number[] = [];
            for (let i = 1; i <= this.totalPages; i++) {
                visiblePages.push(i);
            }
            return visiblePages;
        }

        /*
         * There should always be exactly five elements in the paging control when collapsed.
         * Let n = total pages, p = current page, ... are non-clickable ellipses
         * If the current page number is less than 4, display 1, 2, 3, ..., n
         * If the current page number within is within 2 of the max, display 1, ..., n-2, n-1, n
         * Otherwise, display 1, ..., p, ..., n
         */
        const n = this.totalPages;
        const p = this.pageNumber || 1;

        if (p < 4) {
            return [1, 2, 3, null, n];
        } else if (p >= n - 2) {
            return [1, null, n - 2, n - 1, n];
        } else {
            return [1, null, p, null, n];
        }
    }

    _pageSizeUpdated(): void {
        this._updateDisplayedPageSizeOptions();
        this._pageSizeControl.setValue( this.pageSize );
    }

    _previousPage(): void {
        if (this._isFirstPage) {
            return;
        }
        this._goToPage((this.pageNumber || 1) - 1);
    }

    _goToPage(pageNum: number): number {
        this.pageNumber = pageNum;
        return this.pageNumber;
    }

    _nextPage(): void {
        if (this._isLastPage) {
            return;
        }
        this._goToPage((this.pageNumber || 1) + 1);
    }

    /**
     * Changes the page size so that the first item displayed on the page will still be
     * displayed using the new page size.
     *
     * For example, if the page size is 10 and on the second page (items indexed 11-20) then
     * switching so that the page size is 5 will set the third page as the current page so
     * that the 11th item will still be displayed.
     */
    _changePageSize(pageSize: number): void {
        // Current page needs to be updated to reflect the new page size. Navigate to the page
        // containing the previous page's first item.
        const startIndex = (this.pageNumber - 1) * this.pageSize + 1;
        this.pageSize = pageSize;
        this.pageNumber = Math.ceil(startIndex / pageSize) || 1;
    }

    /**
     * Updates the list of page size options to display to the user. Includes making sure that
     * the page size is an option and that the list is sorted.
     */
    private _updateDisplayedPageSizeOptions() {
        // If no page size is provided, use the first page size option or the default page size.
        if (!this.pageSize) {
            this.pageSize = this.pageSizeOptions.length !== 0 ? this.pageSizeOptions[0] : BasePaginationComponent._DEFAULT_PAGE_SIZE;
        }

        this._displayedPageSizeOptions = this.pageSizeOptions.slice();
        if (this._displayedPageSizeOptions.indexOf(this.pageSize) === -1) {
            this._displayedPageSizeOptions.push(this.pageSize);
        }

        // Sort the numbers using a number-specific sort function.
        this._displayedPageSizeOptions.sort((a, b) => a - b);
    }
}
