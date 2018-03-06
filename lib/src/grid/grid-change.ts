import { SortDirection } from './sort-event';

export class GridChange {
    public selectedRows: any[];
    public sortByColumn: string;
    public sortDirection: SortDirection;
    public currentPage: number;
}
