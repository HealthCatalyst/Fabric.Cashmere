import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * @title Filter menu
 */
@Component({
    selector: 'hc-drawer-menu-example',
    templateUrl: 'drawer-menu-example.component.html',
    styleUrls: ['drawer-menu-example.component.scss']
})
export class DrawerMenuExampleComponent {
    isAnimated = new FormControl(true, {nonNullable: true});
    useBackdrop = new FormControl(false, {nonNullable: true});
    isOpen = false;
}
