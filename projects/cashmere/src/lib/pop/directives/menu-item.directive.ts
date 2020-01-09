import {Directive, HostBinding, ElementRef, HostListener} from '@angular/core';

/** Use `hcMenuItem` for a selectable item in an hcMenu. */
@Directive({
    selector: '[hcMenuItem], [hcButtonItem]'
})
export class MenuItemDirective {
    @HostBinding('class.hc-menu-item')
    _hostClass = true;

    // Menu Item uses focus for hover highlighting to sync with keyboard navigation of the menu
    @HostListener('mouseenter')
    focus(): void {
        this.ref.nativeElement.focus();
    }

    @HostListener('touchend')
    @HostListener('touchcancel')
    @HostListener('mouseleave')
    blur(): void {
        this.ref.nativeElement.blur();
    }

    constructor(public ref: ElementRef) {}
}
