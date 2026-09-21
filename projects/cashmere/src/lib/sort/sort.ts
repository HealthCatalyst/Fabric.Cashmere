/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, EventEmitter, Input, isDevMode, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {SortDirection} from './sort-direction';
import {getSortDuplicateSortableIdError, getSortHeaderMissingIdError, getSortInvalidDirectionError} from './sort-errors';
import {Subject} from 'rxjs';
import {Initializable} from '../shared/initializable';

/** Interface for a directive that holds sorting state consumed by `HcSortHeaderComponent`. */
export interface HcSortable {
    /** The id of the column being sorted. */
    id: string;

    /** Starting sort direction. */
    start: 'asc' | 'desc';

    /** Whether to disable clearing the sorting state. */
    disableClear: boolean;
}

/** The current sort state. */
export interface Sort {
    /** The id of the column being sorted. */
    active: string;

    /** The sort direction. */
    direction: SortDirection;

    /** The priority of this sort when multi-level sorting is enabled. */
    priority?: number;
}

/** Container for HcSortables to manage the sort state and provide default sort parameters. */
@Directive({
    selector: '[hcSort]',
    exportAs: 'hcSort',
    standalone: false
})
export class HcSort extends Initializable implements OnChanges, OnDestroy, OnInit {
    /** Collection of all registered sortables that this directive manages. */
    sortables = new Map<string, HcSortable>();

    /** Used to notify any child components listening to state changes. */
    readonly _stateChanges = new Subject<never>();

    /** The id of the most recently sorted HcSortable. */
    @Input('hcSortActive')
    active: string;

    /**
     * The direction to set when an HcSortable is initially sorted.
     * May be overriden by the HcSortable's sort start.
     */
    @Input('hcSortStart')
    start: 'asc' | 'desc' = 'asc';

    /** The sort direction of the currently active HcSortable. */
    @Input('hcSortDirection')
    get direction(): SortDirection {
        return this._direction;
    }
    set direction(direction: SortDirection) {
        if (isDevMode() && direction && direction !== 'asc' && direction !== 'desc') {
            throw getSortInvalidDirectionError(direction);
        }
        this._direction = direction;
    }
    private _direction: SortDirection = '';

    /**
     * Whether to disable the user from clearing the sort by finishing the sort direction cycle.
     * May be overriden by the HcSortable's disable clear input.
     */
    @Input('hcSortDisableClear')
    get disableClear(): boolean {
        return this._disableClear;
    }
    set disableClear(v: boolean) {
        this._disableClear = coerceBooleanProperty(v);
    }
    private _disableClear: boolean;

    @Input('hcSortDisabled')
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }
    private _disabled = false;

    /** Whether this sort manages a primary and secondary sort. *Defaults to false.* */
    @Input('hcSortMulti')
    get multiSort(): boolean {
        return this._multiSort;
    }
    set multiSort(value: boolean | string) {
        const multiSort = coerceBooleanProperty(value);
        if (multiSort && !this._multiSort && this.active && this.direction) {
            this._sorts = [{active: this.active, direction: this.direction, priority: 1}];
        }
        this._multiSort = multiSort;
    }
    private _multiSort = false;

    /** The active sorts ordered from highest to lowest priority. */
    get sorts(): Sort[] {
        return this._sorts.map(sort => ({...sort}));
    }
    private _sorts: Sort[] = [];

    /** Event emitted when the user changes either the active sort or sort direction. */
    @Output('hcSortChange')
    readonly sortChange: EventEmitter<Sort> = new EventEmitter<Sort>();

    /**
     * Register function to be used by the contained HcSortables. Adds the HcSortable to the
     * collection of HcSortables.
     */
    register(sortable: HcSortable): void {
        if (!sortable.id) {
            throw getSortHeaderMissingIdError();
        }

        if (this.sortables.has(sortable.id)) {
            throw getSortDuplicateSortableIdError(sortable.id);
        }
        this.sortables.set(sortable.id, sortable);
    }

    /**
     * Unregister function to be used by the contained HcSortables. Removes the HcSortable from the
     * collection of contained HcSortables.
     */
    deregister(sortable: HcSortable): void {
        this.sortables.delete(sortable.id);
    }

    /** Sets the active sort id and determines the new sort direction. */
    sort(sortable: HcSortable): void {
        if (this.multiSort) {
            this._sortMulti(sortable);
        } else {
            this._sortSingle(sortable);
        }
    }

    /** Adds or replaces a secondary sort and emits the updated primary sort. */
    addSecondarySort(sortable: HcSortable, direction: SortDirection = sortable.start || this.start): void {
        if (!this.multiSort || !direction || this._sorts.some(sort => sort.active === sortable.id) || this._sorts.length >= 2) {
            return;
        }

        this._sorts = [...this._sorts, {active: sortable.id, direction, priority: this._sorts.length + 1}];
        this._syncPrimarySort();
        this._emitSortChange();
    }

    /** Sets the direction for an active sort or makes the column the primary sort. */
    setSortDirection(sortable: HcSortable, direction: 'asc' | 'desc'): void {
        if (this.multiSort) {
            this._setMultiSortDirection(sortable, direction);
        } else {
            this._setSingleSortDirection(sortable, direction);
        }
    }

    /** Removes a sort while keeping one active sort in place. */
    removeSort(id: string): void {
        if (!this.multiSort || this._sorts.length <= 1) {
            return;
        }

        this._sorts = this._sorts.filter(sort => sort.active !== id).map((sort, index) => ({...sort, priority: index + 1}));
        this._syncPrimarySort();
        this._emitSortChange();
    }

    /** Swaps the priority of the selected sort with the other active sort. */
    setSortPriority(id: string, priority: number): void {
        if (!this.multiSort || this._sorts.length !== 2 || priority < 1 || priority > 2) {
            return;
        }

        const selectedIndex = this._sorts.findIndex(sort => sort.active === id);
        if (selectedIndex === -1 || selectedIndex === priority - 1) {
            return;
        }

        const reordered = [...this._sorts];
        const [selected] = reordered.splice(selectedIndex, 1);
        reordered.splice(priority - 1, 0, selected);
        this._sorts = reordered.map((sort, index) => ({...sort, priority: index + 1}));
        this._syncPrimarySort();
        this._emitSortChange();
    }

    /** Returns the active sort for a column, if one exists. */
    getSort(id: string): Sort | undefined {
        return this._sorts.find(sort => sort.active === id);
    }

    /** Returns the next sort direction of the active sortable, checking for potential overrides. */
    getNextSortDirection(sortable: HcSortable): SortDirection {
        if (!sortable) {
            return '';
        }

        // Get the sort direction cycle with the potential sortable overrides.
        const disableClear = sortable.disableClear != null ? sortable.disableClear : this.disableClear;
        const sortDirectionCycle = getSortDirectionCycle(sortable.start || this.start, disableClear);

        // Get and return the next direction in the cycle
        let nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
        if (nextDirectionIndex >= sortDirectionCycle.length) {
            nextDirectionIndex = 0;
        }
        return sortDirectionCycle[nextDirectionIndex];
    }

    private _sortSingle(sortable: HcSortable): void {
        if (this.active !== sortable.id) {
            this.active = sortable.id;
            this.direction = sortable.start ? sortable.start : this.start;
        } else {
            this.direction = this.getNextSortDirection(sortable);
        }

        this._emitSortChange();
    }

    private _sortMulti(sortable: HcSortable): void {
        const currentSort = this.getSort(sortable.id);
        if (!currentSort) {
            if (this._sorts.length === 1) {
                this.addSecondarySort(sortable);
                return;
            }
            this._sorts = [{active: sortable.id, direction: sortable.start || this.start, priority: 1}];
        } else {
            this._sorts = this._sorts.map(sort =>
                sort.active === sortable.id
                    ? {...sort, direction: sort.direction === 'asc' ? 'desc' : 'asc'}
                    : sort
            );
        }

        this._syncPrimarySort();
        this._emitSortChange();
    }

    private _setSingleSortDirection(sortable: HcSortable, direction: 'asc' | 'desc'): void {
        this.active = sortable.id;
        this.direction = direction;
        this._emitSortChange();
    }

    private _setMultiSortDirection(sortable: HcSortable, direction: 'asc' | 'desc'): void {
        const currentSort = this.getSort(sortable.id);
        this._sorts = currentSort
            ? this._sorts.map(sort => sort.active === sortable.id ? {...sort, direction} : sort)
            : [{active: sortable.id, direction, priority: 1}];
        this._syncPrimarySort();
        this._emitSortChange();
    }

    private _syncPrimarySort(): void {
        const primarySort = this._sorts[0];
        this.active = primarySort?.active;
        this.direction = primarySort?.direction || '';
    }

    private _emitSortChange(): void {
        this.sortChange.emit(this._sorts[0] || {active: this.active, direction: this.direction});
    }

    private _syncMultiSortFromInputs(): void {
        if (this.multiSort && this.active && this.direction) {
            this._sorts = [{active: this.active, direction: this.direction, priority: 1}];
        }
    }

    ngOnInit(): void {
        this._syncMultiSortFromInputs();
        this._markInitialized();
    }

    ngOnChanges(): void {
        this._syncMultiSortFromInputs();
        this._stateChanges.next();
    }

    ngOnDestroy(): void {
        this._stateChanges.complete();
    }
}

/** Returns the sort direction cycle to use given the provided parameters of order and clear. */
function getSortDirectionCycle(start: 'asc' | 'desc', disableClear: boolean): SortDirection[] {
    const sortOrder: SortDirection[] = ['asc', 'desc'];
    if (start === 'desc') {
        sortOrder.reverse();
    }
    if (!disableClear) {
        sortOrder.push('');
    }

    return sortOrder;
}
