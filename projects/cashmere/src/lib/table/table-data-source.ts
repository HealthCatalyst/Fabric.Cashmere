/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {_isNumberValue} from '@angular/cdk/coercion';
import {DataSource} from '@angular/cdk/table';
import {BehaviorSubject, combineLatest, merge, Observable, of as observableOf, Subscription} from 'rxjs';
import {HcSort, Sort} from '../sort/index';
import {map} from 'rxjs/operators';
import {LoadMorePaginationComponent, PageEvent} from '../pagination/index';
import {BasePaginationComponent} from '../pagination/base-pagination';

/**
 * Corresponds to `Number.MAX_SAFE_INTEGER`. Moved out into a variable here due to
 * flaky browser support and the value not being defined in Closure's typings.
 */
const MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Use to see what kind of pager we have
 */
export function _isLoadMorePaginator(pager: BasePaginationComponent): pager is LoadMorePaginationComponent {
    const loadMorePager = <LoadMorePaginationComponent>pager;
    return loadMorePager && loadMorePager.buttonText !== undefined;
}

/**
 * Data source that accepts a client-side data array and includes native support of filtering,
 * sorting (using HcSort), and pagination (using BasePaginationComponent).
 *
 * Allows for sort customization by overriding sortingDataAccessor, which defines how data
 * properties are accessed. Also allows for filter customization by overriding filterTermAccessor,
 * which defines how row data is converted to a string for filter matching.
 */
export class HcTableDataSource<T> extends DataSource<T> {
    /** Stream that emits when a new data array is set on the data source. */
    private readonly _data: BehaviorSubject<T[]>;

    /** Stream emitting render data to the table (depends on ordered data changes). */
    private readonly _renderData = new BehaviorSubject<T[]>([]);

    /** Stream that emits when a new filter string is set on the data source. */
    private readonly _filter = new BehaviorSubject<string>('');

    /**
     * Subscription to the changes that should trigger an update to the table's rendered rows, such
     * as filtering, sorting, pagination, or base data changes.
     */
    _renderChangesSubscription = Subscription.EMPTY;

    /**
     * The filtered set of data that has been matched by the filter string, or all the data if there
     * is no filter. Useful for knowing the set of data the table represents.
     * For example, a 'selectAll()' function would likely want to select the set of filtered data
     * shown to the user rather than all the data.
     */
    filteredData: T[];

    /** Array of data that should be rendered by the table, where each object represents one row. */
    get data() {
        return this._data.value;
    }
    set data(data: T[]) {
        this._data.next(data);
    }

    /**
     * Filter term that should be used to filter out objects from the data array. To override how
     * data objects match to this filter string, provide a custom function for filterPredicate.
     */
    get filter(): string {
        return this._filter.value;
    }
    set filter(filter: string) {
        this._filter.next(filter);
    }

    /**
     * Instance of the HcSort directive used by the table to control its sorting. Sort changes
     * emitted by the HcSort will trigger an update to the table's rendered data.
     */
    get sort(): HcSort | null {
        return this._sort;
    }
    set sort(sort: HcSort | null) {
        this._sort = sort;
        this._updateChangeSubscription();
    }
    private _sort: HcSort | null;

    /**
     * Instance of the PaginationComponentused by the table to control what page of the data is
     * displayed. Page changes emitted by the hc-pagination will trigger an update to the
     * table's rendered data.
     *
     * Note that the data source uses the paginator's properties to calculate which page of data
     * should be displayed. If the paginator receives its properties as template inputs,
     * e.g. `[pageLength]=100` or `[pageIndex]=1`, then be sure that the paginator's view has been
     * initialized before assigning it to this data source.
     */
    get paginator(): BasePaginationComponent | null {
        return this._paginator;
    }
    set paginator(paginator: BasePaginationComponent | null) {
        this._paginator = paginator;
        this._updateChangeSubscription();
    }
    private _paginator: BasePaginationComponent | null;

    /**
     * Data accessor function that is used for accessing data properties for sorting through
     * the default sortData function.
     * This default function assumes that the sort header IDs (which defaults to the column name)
     * matches the data's properties (e.g. column Xyz represents data['Xyz']).
     * Converts strings to lowercase characters
     * May be set to a custom function for different behavior.
     * @param data Data object that is being accessed.
     * @param sortHeaderId The name of the column that represents the data.
     */
    sortingDataAccessor: (data: T, sortHeaderId: string) => string | number = (data: T, sortHeaderId: string): string | number => {
        const value: any = data[sortHeaderId];

        if (_isNumberValue(value)) {
            const numberValue = Number(value);

            // Numbers beyond `MAX_SAFE_INTEGER` can't be compared reliably so we
            // return them as strings. For more info: https://goo.gl/y5vbSg
            return numberValue < MAX_SAFE_INTEGER ? numberValue : `${value}`;
        }

        // lowercase strings
        if (typeof value === 'string') {
            return value.toLocaleLowerCase();
        }

        // convert null/undefined to an empty string so they sort first
        if (value === null || value === undefined) {
            return '';
        }

        // leave dates or other values as is
        return value;
    };

    // sortingDataAccessor: ((data: T, sortHeaderId: string) => string) = (data: T, sortHeaderId: string): string => {
    //     return `${data[sortHeaderId]}`.toLocaleLowerCase();
    // };

    /**
     * Gets a sorted copy of the data array based on the state of the HcSort. Called
     * after changes are made to the filtered data or when sort changes are emitted from HcSort.
     * By default, the function retrieves the active sort and its direction and compares data
     * by retrieving data using the sortingDataAccessor. May be overridden for a custom implementation
     * of data ordering.
     * @param data The array of data that should be sorted.
     * @param sort The connected HcSort that holds the current sort state.
     */
    sortData: (data: T[], sort: HcSort) => T[] = (data: T[], sort: HcSort): T[] => {
        const active = sort.active;
        const direction = sort.direction;
        if (!active || direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            let valueA = this.sortingDataAccessor(a, active);
            let valueB = this.sortingDataAccessor(b, active);

            // If both valueA and valueB exist (truthy), then compare the two. Otherwise, check if
            // one value exists while the other doesn't. In this case, existing value should come first.
            // This avoids inconsistent results when comparing values to undefined/null.
            // If neither value exists, return 0 (equal).
            let comparatorResult = 0;
            if (valueA != null && valueB != null) {
                // Check if one value is greater than the other; if equal, comparatorResult should remain 0.
                if (valueA > valueB) {
                    comparatorResult = 1;
                } else if (valueA < valueB) {
                    comparatorResult = -1;
                }
            } else if (valueA != null) {
                comparatorResult = 1;
            } else if (valueB != null) {
                comparatorResult = -1;
            }

            return comparatorResult * (direction === 'asc' ? 1 : -1);
        });
    };

    /**
     * Checks if a data object matches the data source's filter string. By default, each data object
     * is converted to a string of its properties and returns true if the filter has
     * at least one occurrence in that string. By default, the filter string has its whitespace
     * trimmed and the match is case-insensitive. May be overridden for a custom implementation of
     * filter matching.
     * @param data Data object used to check against the filter.
     * @param filter Filter string that has been set on the data source.
     * @returns Whether the filter matches against the data
     */
    filterPredicate: (data: T, filter: string) => boolean = (data: T, filter: string): boolean => {
        // Transform the data into a lowercase string of all property values.
        const accumulator = (currentTerm, key) => `${currentTerm} ${data[key]}`;
        const dataStr = Object.keys(data)
            .reduce(accumulator, '')
            .toLowerCase();

        // Transform the filter by converting it to lowercase and removing whitespace.
        const transformedFilter = filter.trim().toLowerCase();

        return dataStr.indexOf(transformedFilter) !== -1;
    };

    constructor(initialData: T[] = []) {
        super();
        this._data = new BehaviorSubject<T[]>(initialData);
        this._updateChangeSubscription();
    }

    /**
     * Subscribe to changes that should trigger an update to the table's rendered rows. When the
     * changes occur, process the current state of the filter, sort, and pagination along with
     * the provided base data and send it to the table for rendering.
     */
    _updateChangeSubscription() {
        // Sorting and/or pagination should be watched if HcSort and/or BasePaginationComponent are provided.
        // The events should emit whenever the component emits a change or initializes, or if no
        // component is provided, a stream with just a null event should be provided.
        // The `sortChange` and `pageChange` acts as a signal to the combineLatests below so that the
        // pipeline can progress to the next step. Note that the value from these streams are not used,
        // they purely act as a signal to progress in the pipeline.
        const sortChange: Observable<Sort | null | void> = this._sort
            ? merge<Sort | void>(this._sort.sortChange, this._sort.initialized)
            : observableOf(null);
        const pageChange: Observable<PageEvent | null> = this._paginator
            ? merge<PageEvent>(this._paginator.page, this._paginator.initialized)
            : observableOf(null);

        const dataStream = this._data;
        // Watch for base data or filter changes to provide a filtered set of data.
        const filteredData = combineLatest([dataStream, this._filter])
            .pipe(map(([data]) => this._filterData(data)));
        // Watch for filtered data or sort changes to provide an ordered set of data.
        const orderedData = combineLatest([filteredData, sortChange])
            .pipe(map(([data]) => this._orderData(data)));
        // Watch for ordered data or page changes to provide a paged set of data.
        const paginatedData = combineLatest([orderedData, pageChange])
            .pipe(map(([data]) => this._pageData(data)));
        // Watched for paged data changes and send the result to the table to render.
        this._renderChangesSubscription.unsubscribe();
        this._renderChangesSubscription = paginatedData.subscribe(data => this._renderData.next(data));
    }

    /**
     * Returns a filtered data array where each filter object contains the filter string within
     * the result of the filterTermAccessor function. If no filter is set, returns the data array
     * as provided.
     */
    _filterData(data: T[]) {
        // If there is a filter string, filter out data that does not contain it.
        // Each data object is converted to a string using the function defined by filterTermAccessor.
        // May be overridden for customization.
        this.filteredData = !this.filter ? data : data.filter(obj => this.filterPredicate(obj, this.filter));

        if (this.paginator) {
            this._updatePaginator(this.filteredData.length);
        }

        return this.filteredData;
    }

    /**
     * Returns a sorted copy of the data if HcSort has a sort applied, otherwise just returns the
     * data array as provided. Uses the default data accessor for data lookup, unless a
     * sortDataAccessor function is defined.
     */
    _orderData(data: T[]): T[] {
        // If there is no active sort or direction, return the data without trying to sort.
        if (!this.sort) {
            return data;
        }

        return this.sortData(data.slice(), this.sort);
    }

    /**
     * Returns a paged splice of the provided data array according to the provided BasePaginationComponent's page
     * index and length. If there is no paginator provided, returns the data array as provided.
     */
    _pageData(data: T[]): T[] {
        const pager = this.paginator;
        if (!pager) {
            return data;
        }
        const startIndex = _isLoadMorePaginator(pager) ? 0 : (pager.pageNumber - 1) * pager.pageSize;
        const numElsToGrab = _isLoadMorePaginator(pager) ? pager.pageNumber * pager.pageSize : pager.pageSize;
        return data.slice().splice(startIndex, numElsToGrab);
    }

    /**
     * Updates the paginator to reflect the length of the filtered data, and makes sure that the page
     * index does not exceed the paginator's last page. Values are changed in a resolved promise to
     * guard against making property changes within a round of change detection.
     */
    _updatePaginator(filteredDataLength: number) {
        Promise.resolve().then(() => {
            if (!this.paginator) {
                return;
            }

            this.paginator.length = filteredDataLength;

            // If the page index is set beyond the page, reduce it to the last page.
            if (this.paginator.pageNumber > 0) {
                const lastPageIndex = Math.ceil(this.paginator.length / this.paginator.pageSize) || 1;
                this.paginator.pageNumber = Math.min(this.paginator.pageNumber, lastPageIndex);
            }
        });
    }

    /**
     * Used by the HcTable. Called when it connects to the data source.
     * @docs-private
     */
    connect() {
        return this._renderData;
    }

    /**
     * Used by the HcTable. Called when it is destroyed. No-op.
     * @docs-private
     */
    disconnect() {}
}
