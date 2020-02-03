import {Component, HostBinding, ViewEncapsulation, Input} from '@angular/core';
import {parseBooleanAttribute} from '../../util';

/**
 * Represents a row within a `<hc-list>`. Multiple `[hcListLine]` can be used
 * per `<hc-list-item>`. You can also prefix a `[hcListAvatar]` or `[hcListIcon]`
 * to the beginning of the `<hc-list-item>`.
 */
@Component({
    selector: 'hc-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ListItemComponent {
    @HostBinding('class.hc-list-item')
    _hostClass = true;

    @HostBinding('class.hc-list-height')
    _hasPadding = true;

    /** If true, remove the default height on the list item. Defaults to false  */
    @Input()
    get tight(): boolean {
        return !this._hasPadding;
    }
    set tight(value) {
        this._hasPadding = !parseBooleanAttribute(value);
    }
}
