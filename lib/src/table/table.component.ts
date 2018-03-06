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
    OnChanges
} from '@angular/core';
import { SortEvent } from './sort-event';
import { SortableComponent } from './sortable.component';

@Component({
    selector: 'table[hc-table]',
    template: `<ng-content></ng-content>`
})
export class TableComponent implements OnChanges, AfterContentInit {
    @Input('hc-table') data: any[] = [];
    @Input() rowsPerPage: number = 10;
    @HostBinding('class.hc-table') public hcTable = true;
    @HostBinding('class.hc-table-borders') public borders = true;
    @ContentChildren(SortableComponent) public sortableHeaders: QueryList<SortableComponent>;
    @ContentChild(PaginatorComponent) public paginator: PaginatorComponent;
    pages: number[] = [];
    rows: any[] = [];
    currentPage: number = 1;

    ngOnChanges() {
        this.calculatePages();
        this.updatePage({pageNumber: this.currentPage})
    }

    ngAfterContentInit() {
        this.sortableHeaders.map(sh => sh.sortEvent.subscribe(se => this.sort(se)));
        this.paginator.updatePageEvent.subscribe(pe => this.updatePage(pe));
    }

    private sort(sortEvent: SortEvent) {
        this.sortableHeaders
            .filter(sh => sh.sortableKey !== sortEvent.sortColumn)
            .map(sh => sh.resetHeader());

        let sortOrderLeft = sortEvent.sortDirection === 'asc' ? 1 : -1;
        let sortOrderRight = sortEvent.sortDirection === 'desc' ? 1 : -1;

        this.data.sort((prev, curr) => prev[sortEvent.sortColumn] > curr[sortEvent.sortColumn] ? sortOrderLeft : sortOrderRight);
        this.currentPage = 1;
        this.updatePage({ pageNumber: this.currentPage });
    }

    private calculatePages() {
        let pageCount = Math.ceil(this.data.length / this.rowsPerPage);
        for (let i = 1; i <= pageCount; i++) {
            this.pages.push(i);
        }
        if (this.paginator) {
            this.paginator.pages = this.pages;
        }
    }

    private updatePage(updatePageEvent: UpdatePageEvent) {
        let startingValue = (updatePageEvent.pageNumber - 1) * this.rowsPerPage;
        let endingValue = updatePageEvent.pageNumber * this.rowsPerPage;
        this.rows = [...this.data.slice(startingValue, endingValue)];
    }

}
