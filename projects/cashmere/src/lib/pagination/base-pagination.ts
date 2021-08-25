import {EventEmitter, Input, Output, OnInit, Component} from '@angular/core';
import {coerceNumberProperty} from '@angular/cdk/coercion';
import {Initializable} from '../shared/initializable';
import {PageEvent} from './page-event';

/**
 * Base Pagination class for shared functionality
 * */
@Component({
    template: ''
})
export class BasePaginationComponent extends Initializable implements OnInit {
    public static _DEFAULT_PAGE_SIZE = 20;
    private _inputCheckTimeoutSet = false;

    /**
     * The total number of items to be paged through
     */
    get length(): number {
        return this._length;
    }
    @Input()
    set length(value: number) {
        this._length = coerceNumberProperty(value);
        this.ensureInputCheckTimeoutSet();
    }
    private _length = 0;

    private _prevPageNumber?: number;
    private _pageNumber = 1;
    /** The currently displayed page. *Defaults to 1.* */
    get pageNumber(): number {
        return this._pageNumber;
    }
    @Input()
    set pageNumber(value: number) {
        this._pageNumber = coerceNumberProperty(value);
        this.ensureInputCheckTimeoutSet();
    }

    /** Number of items to display on a page. *Defaults to 20.* */
    get pageSize(): number {
        return this._pageSize;
    }
    @Input()
    set pageSize(value: number) {
        this._pageSize = coerceNumberProperty(value);
        this._pageSizeUpdated();
        this.ensureInputCheckTimeoutSet();
    }
    private _prevPageSize?: number;
    private _pageSize: number = BasePaginationComponent._DEFAULT_PAGE_SIZE;

    /** Event emitted when the paginator changes the page size or page index. */
    @Output()
    readonly page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

    /** Emits the new page number when the page number changes. */
    @Output()
    readonly pageNumberChange: EventEmitter<number> = new EventEmitter<number>();
    /** Emits the new page size when the page size changes. */
    @Output()
    readonly pageSizeChange: EventEmitter<number> = new EventEmitter<number>();

    ngOnInit(): void {
        this._markInitialized();
    }

    private ensureInputCheckTimeoutSet(): void {
        if (this._inputCheckTimeoutSet) {
            return;
        }

        this._inputCheckTimeoutSet = true;

        setTimeout(() => {
            this._pageNumber = this._sanitizePageNumber(this._pageNumber);
            const hasPageNumberChanges: boolean = this.shouldEmitPageNumberChangeEvent();
            const hasPageSizeChanges: boolean = this.shouldEmitPageSizeChangeEvent();

            if (hasPageNumberChanges) {
                this.pageNumberChange.emit(this._pageNumber);
            }

            if (hasPageSizeChanges) {
                this.pageSizeChange.emit(this.pageSize);
            }

            if (hasPageNumberChanges || hasPageSizeChanges) {
                this._emitPageEvent(<number>this._prevPageNumber);
            }

            this._prevPageNumber = this._pageNumber;
            this._prevPageSize = this._pageSize;

            this._inputCheckTimeoutSet = false;
        });
    }

    private shouldEmitPageNumberChangeEvent(): boolean {
        const firstPageNumberToBeSet: boolean = this._prevPageNumber === undefined;
        const pageNumberHasChanged: boolean = this._prevPageNumber !== this._pageNumber;
        return !firstPageNumberToBeSet && pageNumberHasChanged;
    }

    private shouldEmitPageSizeChangeEvent(): boolean {
        const firstPageSizeToBeSet: boolean = this._prevPageSize === undefined;
        const pageSizeHasChanged: boolean = this._prevPageSize !== this._pageSize;
        return !firstPageSizeToBeSet && pageSizeHasChanged;
    }

    /**
     * The computed total number of pages
     */
    get totalPages(): number {
        return Math.ceil(this._length / this._pageSize);
    }

    get _isFirstPage(): boolean {
        return this._pageNumber === 1;
    }

    get _isLastPage(): boolean {
        return !!(this.totalPages && this._pageNumber === this.totalPages);
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
        const startIndex = (this.pageNumber - 1) * this.pageSize;
        this.pageSize = pageSize;
        this.pageNumber = Math.ceil(startIndex / pageSize) + 1;
    }

    _pageSizeUpdated(): void {
        // do nothing.
    }

    private _sanitizePageNumber(pageNumber: number): number {
        const positivePageNumber = Math.max(pageNumber, 1);
        const upperBound: number = Math.max(this.totalPages, 1);
        return positivePageNumber > upperBound ? upperBound : positivePageNumber;
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
