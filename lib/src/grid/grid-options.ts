import { SortDirection } from './sort-event';
export class GridOptions {
    public rowsPerPage?: number;
    public pageCount?: number;
    public showChecks?: boolean;
    public sortByColumn?: string;
    public sortDirection?: SortDirection;
    public pageNumber?: number;
}
