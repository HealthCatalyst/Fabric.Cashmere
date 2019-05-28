import {Component} from '@angular/core';
import {CellResizeEvent} from '@wcf-insurance/cashmere';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

export interface ColumnModel {
    title: string;
    width: number;
    minWidth: number;
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
 * @title Table with Resizeable Columns
 */
@Component({
    selector: 'hc-resizable-columns-example',
    templateUrl: 'resizable-columns-example.component.html',
    styleUrls: ['resizable-columns-example.component.scss']
})
export class ResizableColumnsExampleComponent {
    columnObjects: ColumnModel[] = [
        {title: 'No.', width: 200, minWidth: 40},
        {title: 'Name', width: 328, minWidth: 70},
        {title: 'Weight', width: 200, minWidth: 60},
        {title: 'Symbol', width: 200, minWidth: 60}
    ];
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = ELEMENT_DATA;

    totalPositions = 'Totals';
    totalNames = ELEMENT_DATA.length;
    totalWeight = ELEMENT_DATA.reduce((sum, el) => sum + el.weight, 0);
    totalSymbols = 'N/A';

    isResizing = false;

    columnResized(column: number, cellChange: CellResizeEvent): void {
        let sizeChange = this.columnObjects[column].width - cellChange.width;
        let direction = cellChange.directionLeft ? -1 : 1;

        if (
            cellChange.width >= this.columnObjects[column].minWidth &&
            this.columnObjects[column + direction].width + sizeChange >= this.columnObjects[column + direction].minWidth
        ) {
            this.columnObjects[column + direction].width += sizeChange;
            this.columnObjects[column].width = cellChange.width;
        }
    }
}
