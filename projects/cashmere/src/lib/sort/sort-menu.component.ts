import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {HcSort, HcSortable} from './sort';

/** Displays standard context-menu actions for a sortable column. */
@Component({
    selector: 'hc-sort-menu',
    templateUrl: './sort-menu.component.html',
    styleUrls: ['./sort-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class HcSortMenuComponent {
    /** The sort controller that owns the column state. */
    @Input() sort: HcSort;

    /** The column represented by this menu. */
    @Input() sortable: HcSortable;

    /** Whether this column currently has an active sort. */
    get isSorted(): boolean {
        if (!this.sort || !this.sortable) {
            return false;
        }

        return this.sort.multiSort
            ? !!this.sort.getSort(this.sortable.id)
            : this.sort.active === this.sortable.id && this.sort.direction !== '';
    }

    /** Whether this column can be added as the secondary sort. */
    get canAddSecondarySort(): boolean {
        return !!this.sort?.multiSort && this.sort.sorts.length === 1 && !this.isSorted;
    }

    /** Whether this column can be removed without leaving the table unsorted. */
    get canRemoveSort(): boolean {
        return !!this.sort?.multiSort && this.sort.sorts.length === 2 && this.isSorted;
    }

    /** Current priority of this column, if it is sorted. */
    get priority(): number | null {
        return this.sort?.getSort(this.sortable?.id)?.priority || null;
    }

    /** Sets ascending order for this column. */
    sortAscending(): void { this.sort.setSortDirection(this.sortable, 'asc'); }

    /** Sets descending order for this column. */
    sortDescending(): void { this.sort.setSortDirection(this.sortable, 'desc'); }

    /** Adds this column as the secondary sort. */
    addSecondarySort(): void { this.sort.addSecondarySort(this.sortable); }

    /** Removes this column from the active sorts. */
    removeSort(): void { this.sort.removeSort(this.sortable.id); }

    /** Changes this column's sort priority. */
    setPriority(priority: number): void { this.sort.setSortPriority(this.sortable.id, priority); }
}
