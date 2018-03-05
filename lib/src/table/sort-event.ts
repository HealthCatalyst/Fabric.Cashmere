export type SortDirection = 'asc' | 'desc';

export class SortEvent {
    public sortColumn: string;
    public sortDirection: SortDirection;
}
