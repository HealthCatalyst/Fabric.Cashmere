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
    ContentChild
} from '@angular/core';
import { SortEvent } from './sort-event';
import { SortableComponent } from './sortable.component';

@Component({
    selector: 'table[hc-table]',
    template: `<ng-content></ng-content>`
})
export class TableComponent implements AfterContentInit {
    @Input('hc-table') data: any[] = [];
    @HostBinding('class.hc-table') public hcTable = true;
    @HostBinding('class.hc-table-borders') public borders = true;
    @ContentChildren(SortableComponent) public sortableHeaders: QueryList<SortableComponent>;
    @ContentChild(PaginatorComponent) public paginator: PaginatorComponent;

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

        this.data.sort((prev, curr) => prev[sortEvent.sortColumn] > curr[sortEvent.sortColumn] ? sortOrderLeft : sortOrderRight)
    }

    private updatePage(updatePageEvent: UpdatePageEvent) {
        console.log(updatePageEvent);
    }

}
