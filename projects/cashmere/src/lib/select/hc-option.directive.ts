/* eslint-disable @angular-eslint/directive-selector */
import {Directive, Input, ElementRef, Optional, Host, Renderer2, OnDestroy} from '@angular/core';
import {SelectComponent, _buildValueString} from './select.component';

/** Utility directive to hold objects used in ngValue */
@Directive({
    selector: 'option'
})
export class HcOptionDirective implements OnDestroy {
    /** id of the option element, use in identifying stringifyied values */
    _id: string;

    constructor(
        private _element: ElementRef,
        private _renderer: Renderer2,
        @Optional() @Host() private _select: SelectComponent) {
            if (this._select) {this._id = this._select._registerOption(); }
    }

    /** Tracks the value bound to the option element. Unlike the value binding, ngValue supports binding to objects. */
    @Input('ngValue')
    set ngValue(value: unknown) {
        if (this._select == null) { return; }
        this._select._optionMap.set(this._id, value);
        this._setElementValue(_buildValueString(this._id, value));
        this._select.writeValue(this._select.value);
    }

    /** Tracks simple string values bound to the option element. For objects, use the `ngValue` input binding. */
    @Input('value')
    set value(value: string) {
        this._setElementValue(value);
        if (this._select) { this._select.writeValue(this._select.value); }
    }

    _setElementValue(value: string): void {
        this._renderer.setProperty(this._element.nativeElement, 'value', value);
    }

    ngOnDestroy(): void {
        if (this._select) {
            this._select._optionMap.delete(this._id);
            this._select.writeValue(this._select.value);
        }
    }
}
