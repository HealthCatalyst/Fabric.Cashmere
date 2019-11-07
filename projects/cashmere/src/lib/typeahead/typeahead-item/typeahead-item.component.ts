import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'hc-typeahead-item',
    templateUrl: './typeahead-item.component.html',
    styleUrls: ['./typeahead-item.component.scss']
})
export class TypeaheadItemComponent {

    _highlighted = false;

    /** Value of the option; also will be the value of the event that is emitted when an option is selected */
    @Input()
    value: any;

    @Output()
    _selected: EventEmitter<any> = new EventEmitter<any>();

    _itemSelected(item: any) {
        this._selected.emit(item);
    }
}