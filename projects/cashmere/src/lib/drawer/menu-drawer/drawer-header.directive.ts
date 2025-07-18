import {Directive, HostBinding} from '@angular/core';

/* MenuDrawer toolbar that is fixed to the top */
@Directive({
    selector: '[hcDrawerToolbar]',
    standalone: false
})
export class DrawerToolbar {
    @HostBinding('class.hc-drawer-toolbar')
    _hostClass = true;
}
