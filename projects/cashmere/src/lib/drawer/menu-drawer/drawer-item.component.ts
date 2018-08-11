import {Component, HostBinding, ViewEncapsulation} from '@angular/core';

/* Represents a menu item for the MenuDrawer component */
@Component({
    selector: 'hc-drawer-item',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class DrawerItem {
    @HostBinding('class.hc-drawer-item') _hostClass = true;
}
