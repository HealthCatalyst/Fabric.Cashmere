import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';

const DEFAULT_PAGE_SIZE = 20;

/**
 * Change event object that is emitted when the user selects a
 * different page size or navigates to another page.
 */
export class PageEvent {
    /** The current page index */
    pageNumber: number;

    /** Index of the page that was selected previously */
    previousPageNumber?: number;

    /** The current page size */
    pageSize: number;

    /** The current total number of items being paged */
    length: number;
}

/** The pagination control enables the user to navigate across paged content.
 * Although commonly used with tables and data grids, this control may be used any place where paged data is used.
 * */
@Component({
    selector: 'hc-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    /**
     * The total number of items to be paged through
     */
    @Input()
    get length(): number {
        return this._length;
    }
    set length(value: number) {
        this._length = this._coerceNumberValue(value);
    }
    private _length: number = 0;

    /** The currently displayed page. *Defaulted to 1.* */
    @Input()
    get pageNumber(): number {
        return this._pageNumber;
    }
    set pageNumber(value: number) {
        const prevPageNumber = this._pageNumber;
        this._pageNumber = this._sanitizePageNumber(value);
        this._emitPageEvent(prevPageNumber);
    }
    private _pageNumber: number = 1;

    /** Number of items to display on a page. *By default set to 20.* */
    @Input()
    get pageSize(): number {
        return this._pageSize;
    }
    set pageSize(value: number) {
        this._pageSize = this._coerceNumberValue(value);
        this._updateDisplayedPageSizeOptions();
    }
    private _pageSize: number = 20;

    /** The set of provided page size options to display to the user. */
    @Input()
    get pageSizeOptions(): number[] {
        return this._pageSizeOptions;
    }
    set pageSizeOptions(value: number[]) {
        this._pageSizeOptions = (value || []).map(p => this._coerceNumberValue(p));
        this._updateDisplayedPageSizeOptions();
    }
    private _pageSizeOptions: number[] = [10, 20, 50, 1000];

    /** Displayed set of page size options. Will be sorted and include current page size. */
    _displayedPageSizeOptions: number[] = [];

    /** Whether to hide the page size selection UI from the user. *Defaults to false.* */
    @Input()
    get hidePageSize(): boolean {
        return this._hidePageSize;
    }
    set hidePageSize(value: boolean) {
        this._hidePageSize = !!value;
    }
    private _hidePageSize = false;

    /** Event emitted when the paginator changes the page size or page index. */
    @Output() readonly page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

    ngOnInit() {
        this._updateDisplayedPageSizeOptions();
    }

    /**
     * The computed total number of pages
     */
    get totalPages(): number {
        return Math.ceil(this._length / this._pageSize);
    }

    get _isFirstPage() {
        return this._pageNumber === 1;
    }

    get _isLastPage() {
        return !!(this.totalPages && this._pageNumber === this.totalPages);
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
        const p = this._pageNumber || 1;

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
        const p = this._pageNumber || 1;

        if (p < 4) {
            return [1, 2, 3, null, n];
        } else if (p >= n - 2) {
            return [1, null, n - 2, n - 1, n];
        } else {
            return [1, null, p, null, n];
        }
    }

    _previousPage() {
        if (this._isFirstPage) {
            return;
        }
        this._goToPage((this._pageNumber || 1) - 1);
    }

    _goToPage(pageNum: number) {
        this.pageNumber = pageNum;
    }

    _nextPage() {
        if (this._isLastPage) {
            return;
        }
        this._goToPage((this._pageNumber || 1) + 1);
    }

    /**
     * Changes the page size so that the first item displayed on the page will still be
     * displayed using the new page size.
     *
     * For example, if the page size is 10 and on the second page (items indexed 11-20) then
     * switching so that the page size is 5 will set the third page as the current page so
     * that the 11th item will still be displayed.
     */
    _changePageSize(pageSize: number) {
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
            this._pageSize = this.pageSizeOptions.length !== 0 ? this.pageSizeOptions[0] : DEFAULT_PAGE_SIZE;
        }

        this._displayedPageSizeOptions = this.pageSizeOptions.slice();
        if (this._displayedPageSizeOptions.indexOf(this.pageSize) === -1) {
            this._displayedPageSizeOptions.push(this.pageSize);
        }

        // Sort the numbers using a number-specific sort function.
        this._displayedPageSizeOptions.sort((a, b) => a - b);
    }

    private _coerceNumberValue(value: any): number {
        if (typeof value === 'string') {
            value = parseInt(value, 10);
        }
        if (isNaN(value) || value < 0) {
            value = 0;
        }
        return value;
    }

    private _sanitizePageNumber(pageNumber: any): number {
        const number = Math.max(this._coerceNumberValue(pageNumber), 1);
        return number > this.totalPages ? this.totalPages : number;
    }

    private _emitPageEvent(previousPageNumber: number) {
        this.page.emit({
            previousPageNumber,
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            length: this.length
        });
    }
}
