import {Component} from '@angular/core';

/**
 * @title Left and Right Drawers
 */
@Component({
    selector: 'hc-drawer-basic-example',
    templateUrl: 'drawer-basic-example.component.html',
    styleUrls: ['drawer-basic-example.component.scss']
})
export class DrawerBasicExampleComponent {
    leftState = false;
    rightState = false;
}
