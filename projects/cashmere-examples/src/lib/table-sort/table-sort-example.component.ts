import {Component, OnInit, ViewChild} from '@angular/core';
import {HcSort, HcTableDataSource} from '@healthcatalyst/cashmere';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    discovered: Date;
    symbol: string;
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

/**
 * @title Table sorting
 */
@Component({
    selector: 'hc-table-sort-example',
    templateUrl: 'table-sort-example.component.html',
    styleUrls: ['table-sort-example.component.scss']
})
export class TableSortExampleComponent implements OnInit {
    displayedColumns: string[] = ['position', 'name', 'weight', 'discovered', 'symbol'];
    dataSource: HcTableDataSource<PeriodicElement>;

    @ViewChild(HcSort, {static: true})
    sort: HcSort;

    ngOnInit(): void {
        this.dataSource = new HcTableDataSource(ELEMENT_DATA);
        this.dataSource.sort = this.sort;
    }
}
