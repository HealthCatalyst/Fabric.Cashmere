import { UpdatePageEvent } from './update-page-event';
/* tslint:disable:component-selector */
/* tslint:disable:no-input-rename */
/* tslint:disable:use-host-property-decorator */
// https://github.com/mgechev/codelyzer/issues/178#issuecomment-265154480


import { Component, HostBinding, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'hc-table-paginator',
    template: `<button hc-button color="secondary"> Show more results</button>`,
    styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
    @Output() updatePageEvent: EventEmitter<UpdatePageEvent> = new EventEmitter<UpdatePageEvent>();
    public pageNumber: number = 1;

    moreResults() {
        this.pageNumber++;
        this.updatePageEvent.next({ pageNumber: this.pageNumber });
    }

}
