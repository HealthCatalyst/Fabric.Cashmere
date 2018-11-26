import {Component, OnInit, ViewChild} from '@angular/core';
import {HcTableDataSource, LoadMorePaginationComponent} from '@wcf/cashmere';

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
    {position: 11, name: 'CasHydrogen', weight: 10.0079, symbol: 'CH'},
    {position: 12, name: 'CasHelium', weight: 40.0026, symbol: 'CHe'},
    {position: 13, name: 'CasLithium', weight: 60.941, symbol: 'CLi'},
    {position: 14, name: 'CasBeryllium', weight: 90.0122, symbol: 'CBe'},
    {position: 15, name: 'CasBoron', weight: 100.811, symbol: 'CB'},
    {position: 16, name: 'CasCarbon', weight: 120.0107, symbol: 'CC'},
    {position: 17, name: 'CasNitrogen', weight: 140.0067, symbol: 'CN'},
    {position: 18, name: 'CasOxygen', weight: 150.9994, symbol: 'CO'},
    {position: 19, name: 'CasFluorine', weight: 180.9984, symbol: 'CF'},
    {position: 20, name: 'CasNeon', weight: 200.1797, symbol: 'CNe'}
];

/**
 * @title Simple button pagination
 */
@Component({
    selector: 'pagination-load-more-example',
    templateUrl: 'pagination-load-more-example.html',
    styleUrls: ['pagination-load-more-example.css']
})
export class PaginationLoadMoreExample implements OnInit {
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource: HcTableDataSource<PeriodicElement>;

    get length(): number {
        return ELEMENT_DATA.length;
    }

    @ViewChild(LoadMorePaginationComponent)
    loadMoreBtn: LoadMorePaginationComponent;

    ngOnInit(): void {
        this.dataSource = new HcTableDataSource(ELEMENT_DATA);
        this.dataSource.paginator = this.loadMoreBtn;
    }
}
