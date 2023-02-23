import {Component} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

/**
 * @title Filter menu
 */
@Component({
    selector: 'hc-drawer-menu-example',
    templateUrl: 'drawer-menu-example.component.html',
    styleUrls: ['drawer-menu-example.component.scss']
})
export class DrawerMenuExampleComponent {
    isAnimated = new UntypedFormControl(true);
}
