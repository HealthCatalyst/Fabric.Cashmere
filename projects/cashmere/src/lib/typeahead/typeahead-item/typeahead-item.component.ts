import {Component, EventEmitter, Input, Output, Host} from '@angular/core';
import {TypeaheadComponent} from '../typeahead.component';

@Component({
    selector: 'hc-typeahead-item',
    templateUrl: './typeahead-item.component.html',
    styleUrls: ['./typeahead-item.component.scss'],
})
export class TypeaheadItemComponent {

    _highlighted = false;

    /** Value of the option; also will be the value of the event that is emitted when an option is selected */
    @Input()
    value: any;

    @Input()
    typedChars: string;

    @Output()
    _selected: EventEmitter<any> = new EventEmitter<any>();

    // Constructor(@Host() parent: TypeaheadComponent) {
    //     console.log('this is parent: ', parent);
    // }

    _itemSelected(item: any) {
        this._selected.emit(item);
    }

    itemHighlight(typedChars: string) {
        this.typedChars = typedChars;
    }
}
