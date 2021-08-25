import {Component} from '@angular/core';

/**
 * @title Popover Menu
 */
@Component({
    selector: 'hc-popover-right-click-example',
    templateUrl: 'popover-right-click-example.component.html'
})
export class PopoverRightClickExampleComponent {
    items = [
        {name: 'List Item One', subtext: 'Right-click on this cell for a context menu'},
        {name: 'List Item Two', subtext: 'Right-click on this cell for another context menu'}
    ];
    context = {name: '', subtext: ''};
}
