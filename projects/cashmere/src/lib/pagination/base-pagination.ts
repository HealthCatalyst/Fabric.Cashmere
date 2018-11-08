import {EventEmitter, Input, Output, OnInit, Component} from '@angular/core';
import {coerceNumberProperty} from '@angular/cdk/coercion';
import {Initailizable} from '../shared/initializable';
import {PageEvent} from './page-event';

/**
 * Base Pagination class for shared functionality
 * */
@Component({
    template: ''
})
export class BasePaginationComponent extends Initailizable implements OnInit {
    public static _DEFAULT_PAGE_SIZE = 20;

    /**
     * The total number of items to be paged through
     */
    @Input()
    get length(): number {
        return this._length;
    }
    set length(value: number) {
        this._length = coerceNumberProperty(value);
    }
    private _length: number = 0;

    /** The currently displayed page. *Defaults to 1.* */
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

    /** Number of items to display on a page. *Defaults to 20.* */
    @Input()
    get pageSize(): number {
        return this._pageSize;
    }
    set pageSize(value: number) {
        this._pageSize = coerceNumberProperty(value);
        this._pageSizeUpdated();
    }
    private _pageSize: number = BasePaginationComponent._DEFAULT_PAGE_SIZE;

    /** Event emitted when the paginator changes the page size or page index. */
    @Output()
    readonly page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

    ngOnInit() {
        this._markInitialized();
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

    _pageSizeUpdated() {}

    private _sanitizePageNumber(pageNumber: any): number {
        const number = Math.max(coerceNumberProperty(pageNumber), 1);
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
