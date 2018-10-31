import {Component, OnInit, ViewChild} from '@angular/core';
import {PaginationComponent, HcTableDataSource} from '@healthcatalyst/cashmere';

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
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {position: 1, name: 'CasHydrogen', weight: 10.0079, symbol: 'CH'},
    {position: 2, name: 'CasHelium', weight: 40.0026, symbol: 'CHe'},
    {position: 3, name: 'CasLithium', weight: 60.941, symbol: 'CLi'},
    {position: 4, name: 'CasBeryllium', weight: 90.0122, symbol: 'CBe'},
    {position: 5, name: 'CasBoron', weight: 100.811, symbol: 'CB'},
    {position: 6, name: 'CasCarbon', weight: 120.0107, symbol: 'CC'},
    {position: 7, name: 'CasNitrogen', weight: 140.0067, symbol: 'CN'},
    {position: 8, name: 'CasOxygen', weight: 150.9994, symbol: 'CO'},
    {position: 9, name: 'CasFluorine', weight: 180.9984, symbol: 'CF'},
    {position: 10, name: 'CasNeon', weight: 200.1797, symbol: 'CNe'}
];

/**
 * @title Table paging
 */
@Component({
    selector: 'table-page-example',
    templateUrl: 'table-page-example.html',
    styleUrls: ['table-page-example.css']
})
export class TablePageExample implements OnInit {
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource: HcTableDataSource<PeriodicElement>;
    pageNumber = 1;
    get length(): number { return ELEMENT_DATA.length; }

    @ViewChild(PaginationComponent) paginator: PaginationComponent;

    ngOnInit(): void {
        this.dataSource = new HcTableDataSource(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
    }
}
