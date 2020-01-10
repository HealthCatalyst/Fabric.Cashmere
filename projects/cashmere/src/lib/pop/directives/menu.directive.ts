import {Directive, HostBinding, ContentChildren, QueryList} from '@angular/core';
import {MenuItemDirective} from './menu-item.directive';

/** The `hcMenu` directive provides a standard way of displaying a series of selectable elements in a popover. */
@Directive({
    selector: '[hcMenu]'
})
export class MenuDirective {
    @HostBinding('class.hc-menu-panel')
    _hostClass = true;

    @ContentChildren(MenuItemDirective)
    _menuItems: QueryList<MenuItemDirective>;

    keyFocus(downPress: boolean) {
        let itemArray = this._menuItems.toArray();
        if (!downPress) {
            itemArray.reverse();
        }
        let selected = false;

        // Determine if any item in the menu is currently focused, and select the next (or previous)
        for (let i = 0; i < itemArray.length; i++) {
            if (selected && !itemArray[i].ref.nativeElement.classList.contains('hc-divider') && !itemArray[i].ref.nativeElement.disabled) {
                itemArray[i].focus();
                return;
            }
            if (itemArray[i].ref.nativeElement === document.activeElement) {
                selected = true;
            }
        }

        // If no item is focused, selected the first (or last) item that isn't a divider or disabled
        for (let i = 0; i < itemArray.length; i++) {
            if (!itemArray[i].ref.nativeElement.classList.contains('hc-divider') && !itemArray[i].ref.nativeElement.disabled) {
                itemArray[i].focus();
                return;
            }
        }
    }
}
