import {Component, OnInit} from '@angular/core';
import {HcTableDataSource} from '@healthcatalyst/cashmere';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'}
];

/**
 * @title Filtered Table without Borders
 */
@Component({
    selector: 'table-filter-example',
    templateUrl: 'table-filter-example.html',
    styleUrls: ['table-filter-example.css']
})
export class TableFilterExample implements OnInit {
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource: HcTableDataSource<PeriodicElement>;

    ngOnInit(): void {
        this.dataSource = new HcTableDataSource(ELEMENT_DATA);
    }

    applyFilter(filter: string) {
        this.dataSource.filter = filter.trim().toLowerCase();
    }
}
