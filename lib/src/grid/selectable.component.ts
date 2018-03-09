/* tslint:disable:component-selector */
/* tslint:disable:no-input-rename */
/* tslint:disable:use-host-property-decorator */
// https://github.com/mgechev/codelyzer/issues/178#issuecomment-265154480
import { SelectEvent } from './select-event';
import { Component, HostBinding, HostListener, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
    selector: 'tr[hc-selectable]',
    template: `<td *ngIf="showCheckbox">
                   <hc-checkbox (click)="selectRow()" [ngModel]="row.selected"></hc-checkbox>
               </td>
               <ng-content></ng-content>`
})
export class SelectableComponent implements OnChanges {
    @HostBinding('class.hc-row-selected') public selected = false;
    @Input('hc-selectable') row: any;
    @Input() showCheckbox: boolean = false;
    @Output() selectEvent: EventEmitter<SelectEvent> = new EventEmitter<SelectEvent>();

    ngOnChanges() {
        this.updateStyles();
    }

    @HostListener('click', ['$event'])
    onTableRowClick(event: any) {
        if (!this.showCheckbox) {
            this.selectRow();
        }
    }

    public selectRow() {
        if (this.row) {
            this.row.selected = !this.row.selected;
            this.updateStyles();
            let se: SelectEvent = {
                row: this.row,
                selected: this.row.selected
            };
            this.selectEvent.emit(se);
        }
    }

    private updateStyles() {
        if (!this.showCheckbox) {
            this.selected = this.row.selected;
        }
    }
}
