import { GridOptions } from './grid-options';
import { UpdatePageEvent } from './update-page-event';
import { PaginatorComponent } from './paginator.component';
/* tslint:disable:component-selector */
/* tslint:disable:use-host-property-decorator */
// tslint:disable:no-input-rename
// https://github.com/mgechev/codelyzer/issues/178#issuecomment-265154480
import {
    Component,
    HostBinding,
    HostListener,
    QueryList,
    ViewChildren,
    AfterViewInit,
    AfterContentInit,
    Input,
    ContentChildren,
    ContentChild,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { SortEvent } from './sort-event';
import { SortableComponent } from './sortable.component';
import { SelectableComponent } from './selectable.component';
import { SelectEvent } from './select-event';

@Component({
    selector: 'table[hc-grid]',
    template: `<ng-content></ng-content> <p> {{ selectedRows | json }}</p>`
})
export class GridComponent implements OnChanges, AfterContentInit {
    @Input('hc-grid') fullDataSet: any[] = [];
    @Input() gridOptions: GridOptions = { rowsPerPage: 10 };
    @HostBinding('class.hc-table') public hcTable = true;
    @ContentChildren(SortableComponent) public sortableHeaders: QueryList<SortableComponent>;
    @ContentChildren(SelectableComponent) public selectableRows: QueryList<SelectableComponent>;
    @ContentChild(PaginatorComponent) public paginator: PaginatorComponent;
    pages: number[] = [];
    rows: any[] = [];
    selectedRows: any[] = [];
    currentPage: number = 1;
    rowsPerPage: number = 10;
    pageCount: number | undefined;
    showChecks: boolean = false;
    sortEvent: SortEvent = new SortEvent();

    ngOnChanges(simpleChanges: SimpleChanges) {
        if (simpleChanges['gridOptions']) {
            this.rowsPerPage = this.gridOptions.rowsPerPage || this.rowsPerPage;
            this.pageCount = this.gridOptions.pageCount;
            this.showChecks = this.gridOptions.showChecks || this.showChecks;
            this.currentPage = this.gridOptions.pageNumber || this.currentPage;
            if (this.gridOptions.sortByColumn) {
                this.sortEvent.sortColumn = this.gridOptions.sortByColumn;
                this.sortEvent.sortDirection = this.gridOptions.sortDirection || 'asc';
            }
        }

        this.updateData();
    }

    ngAfterContentInit() {
        this.sortableHeaders.map(sh => sh.sortEvent.subscribe(se => this.sort(se)));
        this.selectableRows.map(sr => sr.selectEvent.subscribe(se => this.selectRow(se)));
        this.paginator.updatePageEvent.subscribe(pe => this.updatePage(pe));
        this.updateData();
    }

    private updateData() {
        this.paginator.pageNumber = this.currentPage || this.paginator.pageNumber;
        this.calculatePages();
        this.updatePage({ pageNumber: this.currentPage });
        if (this.sortEvent.sortColumn) {
            this.sort(this.sortEvent);
        }
    }

    private selectRow(selectEvent: SelectEvent) {
        let row = this.fullDataSet.find(r => r === selectEvent.row);
        row.isSelected = selectEvent.selected;
        if (!row.isSelected) {
            let index = this.selectedRows.findIndex(r => r === row);
            if (index > -1) {
                this.selectedRows.splice(index, 1);
            } else {
                this.selectedRows.push(row);
            }
        }
    }

    private sort(sortEvent: SortEvent) {
        if (this.sortableHeaders) {
            this.sortableHeaders
            .filter(sh => sh.sortableKey !== sortEvent.sortColumn)
                .map(sh => sh.resetHeader());

            let sortedHeader: SortableComponent | undefined = this.sortableHeaders.find(sh => sh.sortableKey === sortEvent.sortColumn);
            if (sortedHeader) {
                sortedHeader.activeSort = true;
                sortedHeader.sortAsc = sortEvent.sortDirection === 'asc';
                sortedHeader.sortDesc = sortEvent.sortDirection === 'desc';
            }

            this.sortEvent = new SortEvent();

            let sortOrderLeft = sortEvent.sortDirection === 'asc' ? 1 : -1;
            let sortOrderRight = sortEvent.sortDirection === 'desc' ? 1 : -1;

            this.fullDataSet.sort(
                (prev, curr) =>
                prev[sortEvent.sortColumn] > curr[sortEvent.sortColumn]
                ? sortOrderLeft
                : sortOrderRight
            );
            this.currentPage = 1;
            if (this.paginator) {
                this.paginator.pageNumber = 1;
            }
            this.updatePage({ pageNumber: this.currentPage });
        }
    }

    private calculatePages() {
        let pageCount = this.pageCount || Math.ceil(this.fullDataSet.length / this.rowsPerPage);
        this.pages = [];
        for (let i = 1; i <= pageCount; i++) {
            this.pages.push(i);
        }
        if (this.paginator) {
            this.paginator.pages = this.pages;
        }
    }

    private updatePage(updatePageEvent: UpdatePageEvent) {
        let startingValue = updatePageEvent.appendResults
            ? 0
            : (updatePageEvent.pageNumber - 1) * this.rowsPerPage;
        let endingValue = updatePageEvent.pageNumber * this.rowsPerPage;
        this.rows = [...this.fullDataSet.slice(startingValue, endingValue)];
    }
}
