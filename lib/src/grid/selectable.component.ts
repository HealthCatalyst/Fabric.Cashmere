/* tslint:disable:component-selector */
/* tslint:disable:no-input-rename */
/* tslint:disable:use-host-property-decorator */
// https://github.com/mgechev/codelyzer/issues/178#issuecomment-265154480
import { SelectEvent } from './select-event';
import { Component, HostBinding, HostListener, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
    selector: 'tr[hc-selectable]',
    template: `<td *ngIf="includeCheckbox">Checkbox here</td>
               <ng-content></ng-content>`
})
export class SelectableComponent implements OnChanges {
    @HostBinding('class.hc-row-selected') public selected = false;
    @Input('hc-selectable') row: any;
    @Input() includeCheckbox: boolean = false;
    @Output() selectEvent: EventEmitter<SelectEvent> = new EventEmitter<SelectEvent>();

    ngOnChanges() {
        this.selected = this.row.selected;
    }

    @HostListener('click', ['$event'])
    onTableRowClick(event: any) {
        if (this.row) {
            this.row.selected = !this.row.selected;
            this.selected = this.row.selected;
            let se: SelectEvent = {
                row: this.row,
                selected: this.selected
            };
            this.selectEvent.emit(se);
        }
    }
}
