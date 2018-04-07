import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'hc-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
    private _totalPages: number | null | undefined = null;
    private _inputPageNumber: number | null = null;
    private _pageNumber: number | null = null;

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
     * The current page number (one-based)
     */
    @Input('pageNumber')
    get inputPageNumber(): number | null {
        return this._inputPageNumber;
    }
    set inputPageNumber(value: number | null) {
        this._inputPageNumber = value;
        this.pageNumberChange.emit(value);
        this._pageNumber = this.sanitize(value);
    }
    get pageNumber() {
        return this._pageNumber;
    }
    set pageNumber(value: number | null) {
        this._pageNumber = value;
        if (this.inputPageNumber !== value) {
            this.inputPageNumber = value;
        }
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

    /**
     * Event for when page number changes
     */
    @Output()
    readonly pageNumberChange = new EventEmitter<number | null>();

    get isFirstPage() {
        return this.pageNumber === 1;
    }

    get isLastPage() {
        return !!(this.totalPages && this.pageNumber === this.totalPages);
    }

    get visiblePages(): Array<number | null> {
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
            const visiblePages: number[] = [ ];
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
            return [ 1, 2, 3, 4, 5, 6, null, n - 1, n ];
        } else if (p >= n - 4) {
            return [ 1, 2, null, n - 5, n - 4, n - 3, n - 2, n - 1, n ];
        } else {
            return [ 1, 2, null, p - 1, p, p + 1, null, n - 1, n ];
        }
    }

    get collapsedVisiblePages(): Array<number | null> {
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
            const visiblePages: number[] = [ ];
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
            return [ 1, 2, 3, null, n ];
        } else if (p >= n - 2) {
            return [ 1, null, n - 2, n - 1, n ];
        } else {
            return [ 1, null, p, null, n ];
        }
    }

    previousPage() {
        if (this.isFirstPage) {
            return;
        }
        this.goToPage((this.pageNumber || 1) - 1);
    }

    goToPage(pageNum: number) {
        this.pageNumber = pageNum;
    }

    nextPage() {
        if (this.isLastPage) {
            return;
        }
        this.goToPage((this.pageNumber || 1) + 1);
    }
}
