import { Directive, HostBinding, Input } from '@angular/core';
import { parseBooleanAttribute } from '../util';

/** Can be added to the parent element containing resizable and static elements */
@Directive({
    selector: '[hcResizableContainer]',
    standalone: false
})
export class ResizableContainerDirective {
    _vertical = true;

    @HostBinding('class.hc-resizable-container-parent-horizontal')
    _horizontalClass = false;

    @HostBinding('class.hc-resizable-container-parent-vertical')
    _verticalClass = true;

    /** Orients the container for horizontal or vertical resizing; defaults to `true` */
    @Input()
    get vertical(): boolean {
        return this._vertical;
    }
    set vertical(value: boolean | string ) {
        this._vertical = parseBooleanAttribute( value );
        this._verticalClass = this._vertical;
        this._horizontalClass = !this._vertical;
    }
}
