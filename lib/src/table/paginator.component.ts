import { UpdatePageEvent } from './update-page-event';
/* tslint:disable:component-selector */
/* tslint:disable:no-input-rename */
/* tslint:disable:use-host-property-decorator */
// https://github.com/mgechev/codelyzer/issues/178#issuecomment-265154480

import { Component, HostBinding, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'hc-table-paginator',
    template: `<ng-container *ngIf="!showPages">
                   <button hc-button color="secondary" (click)="moreResults()">
                       Show more results
                   </button>
               </ng-container>
               <ng-container *ngIf="showPages">
                   <button *ngFor="let page of pages" (click)="setPage(page)">{{page}}</button>
               </ng-container>`,
    styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
    @Input() public showPages: boolean = false;
    @Output() updatePageEvent: EventEmitter<UpdatePageEvent> = new EventEmitter<UpdatePageEvent>();
    public pageNumber: number = 1;
    public pages: number[];

    moreResults() {
        this.pageNumber++;
        this.updatePage();
    }

    setPage(page: number) {
        this.pageNumber = page;
        this.updatePage();
    }

    updatePage() {
        this.updatePageEvent.next({ pageNumber: this.pageNumber });
    }
}
