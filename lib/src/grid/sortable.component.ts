import { SortEvent } from './sort-event';
/* tslint:disable:component-selector */
/* tslint:disable:no-input-rename */
/* tslint:disable:use-host-property-decorator */
// https://github.com/mgechev/codelyzer/issues/178#issuecomment-265154480


import { Component, HostBinding, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'th[hc-sortable]',
    template: `<ng-content></ng-content>`
})
export class SortableComponent {
    @HostBinding('class.hc-col-sortable') public sortable = true;
    @HostBinding('class.hc-active-sort') public activeSort = false;
    @HostBinding('class.hc-sort-asc') public sortAsc = false;
    @HostBinding('class.hc-sort-desc') public sortDesc = false;
    @Input('hc-sortable') sortableKey: string;
    @Output() sortEvent: EventEmitter<SortEvent> = new EventEmitter<SortEvent>();

    constructor() { }

    @HostListener('click', ['$event'])
    onTableHeaderClick(event: any) {
        if (this.activeSort) {
            this.sortAsc = !this.sortAsc;
            this.sortDesc = !this.sortDesc;
        } else {
            this.activeSort = true;
            this.sortAsc = true;
        }

        let sortEvent: SortEvent = {
            sortColumn: this.sortableKey,
            sortDirection: this.sortAsc ? 'asc' : 'desc'
        }

        this.sortEvent.emit(sortEvent);
    }

    public resetHeader() {
        this.sortable = true;
        this.activeSort = false;
        this.sortAsc = false;
        this.sortDesc = false;
    }
}
