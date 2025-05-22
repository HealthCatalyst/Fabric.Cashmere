import {Directive, HostBinding, ElementRef, HostListener, Output, EventEmitter} from '@angular/core';

/** Use `hcMenuItem` for a selectable item in an hcMenu. */
@Directive({
    selector: '[hcMenuItem], [hcButtonItem]',
    standalone: false
})
export class MenuItemDirective {
    @HostBinding('class.hc-menu-item')
    _hostClass = true;

    // Event fired on mouseenter (used to close submenus)
    @Output() _itemEnter = new EventEmitter<void>();

    // Menu Item uses focus for hover highlighting to sync with keyboard navigation of the menu
    @HostListener('mouseenter')
    focus(): void {
        this.ref.nativeElement.focus();
        this._itemEnter.emit();
    }

    @HostListener('touchend')
    @HostListener('touchcancel')
    @HostListener('mouseleave')
    blur(): void {
        this.ref.nativeElement.blur();
    }

    constructor(public ref: ElementRef) {}
}
