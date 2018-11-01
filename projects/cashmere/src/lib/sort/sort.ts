/* tslint:disable:no-output-rename no-input-rename directive-class-suffix */

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
import {Observable, Subject, Subscriber} from 'rxjs';

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
}

/** Container for HcSortables to manage the sort state and provide default sort parameters. */
@Directive({
    selector: '[hcSort]',
    exportAs: 'hcSort'
})
export class HcSort implements OnChanges, OnDestroy, OnInit {
    /** Collection of all registered sortables that this directive manages. */
    sortables = new Map<string, HcSortable>();

    /** Used to notify any child components listening to state changes. */
    readonly _stateChanges = new Subject<never>();

    /** The id of the most recently sorted HcSortable. */
    @Input('hcSortActive') active: string;

    /**
     * The direction to set when an HcSortable is initially sorted.
     * May be overriden by the HcSortable's sort start.
     */
    @Input('hcSortStart') start: 'asc' | 'desc' = 'asc';

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
    get disabled() {
        return this._disabled;
    }
    set disabled(value: any) {
        this._disabled = coerceBooleanProperty(value);
    }
    private _disabled: boolean = false;

    /** Event emitted when the user changes either the active sort or sort direction. */
    @Output('hcSortChange') readonly sortChange: EventEmitter<Sort> = new EventEmitter<Sort>();

    /** Whether this directive has been marked as initialized. */
    _isInitialized = false;

    /**
     * List of subscribers that subscribed before the directive was initialized. Should be notified
     * during _markInitialized. Set to null after pending subscribers are notified, and should
     * not expect to be populated after.
     */
    _pendingSubscribers: Subscriber<never>[] | null = [];

    /**
     * Observable stream that emits when the directive initializes. If already initialized, the
     * subscriber is stored to be notified once _markInitialized is called.
     */
    initialized = new Observable<never>(subscriber => {
        // If initialized, immediately notify the subscriber. Otherwise store the subscriber to notify
        // when _markInitialized is called.
        if (this._isInitialized) {
            this._notifySubscriber(subscriber);
        } else {
            this._pendingSubscribers!.push(subscriber);
        }
    });

    /**
     * Marks the state as initialized and notifies pending subscribers. Should be called at the end
     * of ngOnInit.
     * @docs-private
     */
    _markInitialized(): void {
        if (this._isInitialized) {
            throw Error('This directive has already been marked as initialized and ' + 'should not be called twice.');
        }

        this._isInitialized = true;

        this._pendingSubscribers!.forEach(this._notifySubscriber);
        this._pendingSubscribers = null;
    }

    /** Emits and completes the subscriber stream (should only emit once). */
    _notifySubscriber(subscriber: Subscriber<never>): void {
        subscriber.next();
        subscriber.complete();
    }

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
        if (this.active !== sortable.id) {
            this.active = sortable.id;
            this.direction = sortable.start ? sortable.start : this.start;
        } else {
            this.direction = this.getNextSortDirection(sortable);
        }

        this.sortChange.emit({active: this.active, direction: this.direction});
    }

    /** Returns the next sort direction of the active sortable, checking for potential overrides. */
    getNextSortDirection(sortable: HcSortable): SortDirection {
        if (!sortable) {
            return '';
        }

        // Get the sort direction cycle with the potential sortable overrides.
        const disableClear = sortable.disableClear != null ? sortable.disableClear : this.disableClear;
        let sortDirectionCycle = getSortDirectionCycle(sortable.start || this.start, disableClear);

        // Get and return the next direction in the cycle
        let nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
        if (nextDirectionIndex >= sortDirectionCycle.length) {
            nextDirectionIndex = 0;
        }
        return sortDirectionCycle[nextDirectionIndex];
    }

    ngOnInit() {
        this._markInitialized();
    }

    ngOnChanges() {
        this._stateChanges.next();
    }

    ngOnDestroy() {
        this._stateChanges.complete();
    }
}

/** Returns the sort direction cycle to use given the provided parameters of order and clear. */
function getSortDirectionCycle(start: 'asc' | 'desc', disableClear: boolean): SortDirection[] {
    let sortOrder: SortDirection[] = ['asc', 'desc'];
    if (start === 'desc') {
        sortOrder.reverse();
    }
    if (!disableClear) {
        sortOrder.push('');
    }

    return sortOrder;
}
