import {Component, ViewEncapsulation} from '@angular/core';

/* Represents a menu item for the MenuDrawer component */
@Component({
    selector: 'hc-drawer-item',
    template: `
        <div class="hc-drawer-item">
            <ng-content></ng-content>
        </div>
        <hr class="hc-drawer-divider" />
    `,
    encapsulation: ViewEncapsulation.None
})
export class DrawerItem {}
