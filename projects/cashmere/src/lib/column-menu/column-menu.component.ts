import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HcPopComponent } from '../pop/popover.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HcDynamicColumn, HcCachedColumn } from './column-menu.models';
import { readFromStorage, writeToStorage } from '../utils/local-storage';

/** Component for toggling and reordering columns within a data grid */
@Component({
    selector: 'hc-column-menu',
    templateUrl: './column-menu.component.html',
    styleUrls: ['./column-menu.component.scss'],
})
export class ColumnMenuComponent<T> implements OnInit {
    @ViewChild('columns') menu!: HcPopComponent;
    /** Every time column settings are changed, emits an array of displayed columns in their proper order. */
    @Output() displayedColumnChange: EventEmitter<string[]> = new EventEmitter<string[]>();
    /** Fires when button to open menu is clicked. */
    @Output() onMenuIconClick: EventEmitter<void> = new EventEmitter<void>();
    /** Key used to cache the setting for column order and display in local storage. If not provided, these setting will not cache. */
    @Input() cacheKey = '';
    /** Keys for columns that cannot be moved or hidden and sit at the start of the row */
    @Input() set staticPrefixCols(prefixCols: string[]) {
        this._staticPrefixCols = prefixCols;
        this._refreshCols();
    }
    get staticPrefixCols(): string[] { return this._staticPrefixCols; }
    private _staticPrefixCols: string[] = [];

    /** Keys for columns that cannot be moved or hidden and sit at the end of the row */
    @Input() set staticSuffixCols(suffixCols: string[]) {
        this._staticSuffixCols = suffixCols;
        this._refreshCols();
    }
    get staticSuffixCols(): string[] { return this._staticSuffixCols; }
    private _staticSuffixCols: string[] = [];

    /** Collection of columns that can be hidden and reordered. */
    @Input() set dynamicCols(cols: Array<HcDynamicColumn>) {
        this._dynamicCols = cols;
        this._generateColumnSelectionForms(cols);
        this._getCachedPreferences();
    }
    get dynamicCols(): Array<HcDynamicColumn> { return this._dynamicCols; }
    private _dynamicCols = new Array<HcDynamicColumn>();

    /** An array of the currently displayed column keys sorted in their proper order. */
    displayedColumns: string[];

    /** Collection of the sortable/hidable column forms. */
    colSelectionForm = new FormGroup({});

    ngOnInit(): void {
        this._generateColumnSelectionForms(this._dynamicCols);
        this._getCachedPreferences();
    }

    /** Returns true if every hideable column is currently hidden. */
    get allHidden(): boolean {
        return !Object.values(this.colSelectionForm.controls).some(c => (c as FormControl).value);
    }

    /** Show all columns */
    selectAll(): void {
        Object.values(this.colSelectionForm.controls).forEach(c => (c as FormControl).setValue(true));
        this._onColChange();
    }

    /** Hide all columns */
    clearAll(): void {
        Object.values(this.colSelectionForm.controls).forEach(c => (c as FormControl).setValue(false));
        this._onColChange();
    }

    /** Open the column menu */
    open(): void {
        this.menu.open();
    }

    /** Close the column menu */
    close(): void {
        this.menu.close();
    }

    _onColChange(): void {
        this._refreshCols();
        this.saveCachedPreferences();
    }

    _generateColumnSelectionForms(cols: Array<HcDynamicColumn>): void {
        this.colSelectionForm = new FormGroup({});
        cols.filter(c => this._interpretOptionalBoolean(c.isHidable)).forEach((c) => {
            this.colSelectionForm.addControl(c.name, new FormControl(this._interpretOptionalBoolean(c.isShownByDefault)));
        });
        this._refreshCols();
    }

    _interpretOptionalBoolean(val?: boolean): boolean {
        return val === undefined || val === null ? true : val;
    }

    _refreshCols(): string[] {
        // merge user controlled columns with static columns
        this.displayedColumns = this.staticPrefixCols
            .concat(this._getDisplayedColumns())
            .concat(this.staticSuffixCols);

        setTimeout(() => this.displayedColumnChange.emit(this.displayedColumns));
        return this.displayedColumns;
    }

    _getDisplayedColumns(): string[] {
        return this.dynamicCols
        .filter((col) =>
        this._interpretOptionalBoolean(col.isHidable) ? this.colSelectionForm.get(col.name)?.value : true
        )
        .map((cd) => cd.name as string);
    }

    /**
     * Handle rearanging of columns via drag and drop
     * @param event contains data from the drag and drop event
     * @param isInDataGrid if true, we need to take in account the fact that some columns may currently be hidden
     */
    columnDropped(event: CdkDragDrop<any>, isInDataGrid = true): void {
        if (event) {
            const prevIndex = isInDataGrid ?
                this._dynamicCols.findIndex(c => c.name === event.item.data.name) :
                event.previousIndex;
            const adjustedIndexForPrefixes = event.currentIndex + this.staticPrefixCols.length;
            const newIndex = isInDataGrid ?
                this._dynamicCols.findIndex( c => c.name === this.displayedColumns[adjustedIndexForPrefixes]) :
                event.currentIndex;
            moveItemInArray(this._dynamicCols, prevIndex, newIndex);
            this._refreshCols();
            this.saveCachedPreferences();
        }
    }

    /**
     * Save ordered list of columns with their display status
     */
    saveCachedPreferences(): void {
        if (!this.cacheKey) { return; } // don't save if no key is provided
        const cachedColumns: HcCachedColumn[] = this.dynamicCols
            .map((col) => ({ key: col.name, isHidden: !this.colSelectionForm.get(col.name?.toString())?.value}));
        writeToStorage(this.cacheKey, cachedColumns);
    }

    /**
     * Load user preferences for columns order and display status
     */
    _getCachedPreferences(): void {
        if (!this.cacheKey) { return; } // don't load if no key is provided
        const cachedColumns: HcCachedColumn[] = readFromStorage(this.cacheKey) || new Array<HcCachedColumn>();
        const orderedAvailableColumns = new Array<HcDynamicColumn>();
        cachedColumns?.forEach((col, cachedIndex) => {
            const existingColumn = this._dynamicCols.find(c => c.name === col.key);
            if(!existingColumn) { return; } // watch for columns that don't exist anymore

            // if the cached column still exists, set display status & add at correct index
            this.colSelectionForm.get(col.key)?.setValue(!col.isHidden);
            orderedAvailableColumns.push(existingColumn);
        });

        // if available columns don't exist in cache (like a newly introduced column),
        // add them in at their default index
        this._dynamicCols.forEach((availableColumn, index) => {
            if(!cachedColumns.find(c => c.key === availableColumn.name)) {
                orderedAvailableColumns.splice(index, 0, availableColumn);
            }
        });

        this._dynamicCols = orderedAvailableColumns;
        this._refreshCols();
    }
}
