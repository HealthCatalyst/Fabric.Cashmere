import {Component, QueryList, ViewChildren} from '@angular/core';
import {HcPopComponent} from '@healthcatalyst/cashmere';

/**
 * @title Popover Menu
 */
@Component({
    selector: 'hc-popover-menu-example',
    templateUrl: 'popover-menu-example.component.html'
})
export class PopoverMenuExampleComponent {
    @ViewChildren(HcPopComponent)
    _menus: QueryList<HcPopComponent>;

    closeAllMenus() {
        this._menus.forEach((menu: HcPopComponent) => {
            menu.close();
        });
    }
}
