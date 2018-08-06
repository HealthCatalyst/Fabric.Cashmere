import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

/** The pagination control enables the user to navigate across paged content.
 * Although commonly used with tables and data grids, this control may be used any place where paged data is used.
 * */
@Component({
    selector: 'hc-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
/** 
 * The pagination control enables the user to navigate across paged content. 
 * Although commonly used with tables and data grids, this control may be used 
 * any place where paged data is used. 
 */
export class PaginationComponent implements OnChanges {
    private _totalPages: number | null | undefined = null;
    private _inputPageNumber: number | null = null;
    private __pageNumber: number | null = null;

    /**
     * The total pages possible to navigate to
     */
    @Input()
    get totalPages(): number | null | undefined {
        return this._totalPages;
    }
    set totalPages(value: number | null | undefined) {
        if (typeof value !== 'number') {
            value = null;
        }
        this._totalPages = value;
    }
    /**
     * The current page number (one-based).
     * Should be two-way bound using `[(pageNumber)]` to ensure
     * that the source property is updated when the control is
     * used.
     */
    @Input()
    get pageNumber(): number | null {
        return this._inputPageNumber;
    }
    set pageNumber(value: number | null) {
        this._inputPageNumber = value;
        this.pageNumberChange.emit(value);
        this._pageNumber = this.sanitize(value);
    }
    get _pageNumber() {
        return this.__pageNumber;
    }
    set _pageNumber(value: number | null) {
        this.__pageNumber = value;
        if (this.pageNumber !== value) {
            this.pageNumber = value;
        }
    }

    /**
     * Event for when page number changes
     */
    @Output() readonly pageNumberChange = new EventEmitter<number | null>();

    ngOnChanges(changes: SimpleChanges) {
        if (changes.totalPages && !changes.inputPageNumber) {
            /*
             * when total pages is changed the page number is reset to 1
             */
            this._pageNumber = 1;
        } else if (changes.inputPageNumber) {
            /*
             * Validate current page, making sure it is in the valid range.
             * values to large are set to the last page, while all other
             * invalid values are set to 1.  If there are no pages there is
             * also no current page.
             */
            let value = changes.inputPageNumber.currentValue;
            this._pageNumber = this.sanitize(value);
        }
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
        this._pageNumber = pageNum;
    }

    _nextPage() {
        if (this._isLastPage) {
            return;
        }
        this._goToPage((this._pageNumber || 1) + 1);
    }

    private sanitize(pageNumber: any): number | null {
        /*
         * Validate current page, making sure it is in the valid range.
         * values to large are set to the last page, while all other
         * invalid values are set to 1.  If there are no pages there is
         * also no current page.
         */
        if (!!this.totalPages) {
            if (typeof pageNumber !== 'number' || isNaN(pageNumber) || !pageNumber || pageNumber < 1) {
                pageNumber = 1;
            }
            if (pageNumber > this.totalPages) {
                pageNumber = this.totalPages;
            }
        } else {
            pageNumber = null;
        }
        return pageNumber;
    }
}
