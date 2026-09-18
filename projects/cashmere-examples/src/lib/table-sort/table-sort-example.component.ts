import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {HcSort, HcSortable, HcTableDataSource} from '@healthcatalyst/cashmere';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    discovered: Date;
    symbol: string;
}

interface SortMenuContext {
    sort?: HcSort;
    sortable?: HcSortable;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, discovered: new Date('January 1 1776'), symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, discovered: new Date('January 1 1895'), symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, discovered: new Date('January 1 1817'), symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, discovered: new Date('January 1 1797'), symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, discovered: new Date('January 1 1808'), symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, discovered: new Date('January 1 1694'), symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, discovered: new Date('January 1 1772'), symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, discovered: new Date('January 1 1774'), symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, discovered: new Date('January 1 1886'), symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, discovered: new Date('January 1 1898'), symbol: 'Ne'}
];

const MULTI_SORT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 4, discovered: new Date('January 1 1776'), symbol: 'H'},
    {position: 2, name: 'Hydrogen', weight: 2, discovered: new Date('January 1 1776'), symbol: 'H'},
    {position: 3, name: 'Hydrogen', weight: 1, discovered: new Date('January 1 1776'), symbol: 'H'},
    {position: 4, name: 'Helium', weight: 3, discovered: new Date('January 1 1895'), symbol: 'He'},
    {position: 5, name: 'Helium', weight: 1, discovered: new Date('January 1 1895'), symbol: 'He'},
    {position: 6, name: 'Lithium', weight: 2, discovered: new Date('January 1 1817'), symbol: 'Li'}
];

/**
 * @title Table sorting
 */
@Component({
    selector: 'hc-table-sort-example',
    templateUrl: 'table-sort-example.component.html',
    styleUrls: ['table-sort-example.component.scss'],
    standalone: false
})
export class TableSortExampleComponent implements AfterViewInit, OnInit {
    displayedColumns: string[] = ['position', 'name', 'weight', 'discovered', 'symbol'];
    multiSortColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource!: HcTableDataSource<PeriodicElement>;
    multiSortDataSource!: HcTableDataSource<PeriodicElement>;
    sortMenuContext: SortMenuContext = {};

    @ViewChildren(HcSort)
    sorts!: QueryList<HcSort>;

    ngOnInit(): void {
        this.dataSource = new HcTableDataSource(ELEMENT_DATA);
        this.multiSortDataSource = new HcTableDataSource(MULTI_SORT_DATA);
    }

    ngAfterViewInit(): void {
        const sortList = this.sorts.toArray();
        this.dataSource.sort = sortList[0];
        this.multiSortDataSource.sort = sortList[1];
    }
}
