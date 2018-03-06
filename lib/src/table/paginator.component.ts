import { UpdatePageEvent } from './update-page-event';
/* tslint:disable:component-selector */
/* tslint:disable:no-input-rename */
/* tslint:disable:use-host-property-decorator */
// https://github.com/mgechev/codelyzer/issues/178#issuecomment-265154480

import { Component, HostBinding, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'hc-table-paginator',
    template: `<ng-container *ngIf="!showPages && pageNumber !== pages.length">
                   <button hc-button color="secondary" (click)="moreResults()">
                       Show more results
                   </button>
               </ng-container>
               <ng-container *ngIf="showPages">
               <nav aria-label="Page navigation" *ngIf="pages?.length > 1 || paginationType === 'server'">
               <ul class="pagination" id="pagination" [attr.totalpages]='pages.length'>
                   <li>
                       <a id="pageFirst" (click)="firstPage()" aria-label="First">
                           <span aria-hidden="true">&lt;&lt;</span>
                       </a>
                   </li>
                   <li>
                   <a id="pagePrevious" (click)="previousPage()" aria-label="Previous">
                       <span aria-hidden="true">&lt;</span>
                   </a>
                   </li>
                   <li *ngFor="let page of pages | slice:this.getArrayStart(): this.getArrayEnd();
                    let i = index;" [class.active]="page === pageNumber">
                      <a [attr.id]="'pageSection' + i" (click)="setPage(page)">
                          {{page}}
                      </a>
                    </li>
                    <li>
                    <a id="pageNext" (click)="nextPage()" aria-label="Next">
                        <span aria-hidden="true">&gt;</span>
                    </a>
                   </li>
                   <li>
                       <a id="pageLast" (click)="lastPage()" aria-label="Last">
                           <span aria-hidden="true">&gt;&gt;</span>
                       </a>
                   </li>
               </ul>
           </nav>

               </ng-container>`,
    styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
    @Input() public showPages: boolean = false;
    @Output() updatePageEvent: EventEmitter<UpdatePageEvent> = new EventEmitter<UpdatePageEvent>();
    public pageNumber: number = 1;
    public pages: number[] = [];
    private maxPaginationTabsLength = 5;

    moreResults() {
        this.pageNumber++;
        this.updatePageEvent.next({ pageNumber: this.pageNumber, appendResults: true });
    }

    firstPage() {
        this.pageNumber = 1;
        this.updatePage();
    }

    previousPage() {
        this.pageNumber--;
        this.updatePage();
    }

    setPage(page: number) {
        this.pageNumber = page;
        this.updatePage();
    }

    nextPage() {
        this.pageNumber++;
        this.updatePage();
    }

    lastPage() {
        this.pageNumber = this.pages.length;
        this.updatePage();
    }

    updatePage() {
        this.updatePageEvent.next({ pageNumber: this.pageNumber });
    }

    getArrayStart(): number {
        if (this.pages) {
            let length = this.pages.length;
            let activePageIndex = this.pages.findIndex(page => page === this.pageNumber);
            if (activePageIndex <= 2 || length <= this.maxPaginationTabsLength) {
                // start with first index until passed the middle
                return 0;
            }
            // show the last five
            if (activePageIndex >= length - this.maxPaginationTabsLength) {
                return length - this.maxPaginationTabsLength;
            }
            // show current index as the center of 5
            return activePageIndex - 2;
        }
        return 0;
    }

    getArrayEnd(): number {
        return this.getArrayStart() + this.maxPaginationTabsLength;
    }
}
