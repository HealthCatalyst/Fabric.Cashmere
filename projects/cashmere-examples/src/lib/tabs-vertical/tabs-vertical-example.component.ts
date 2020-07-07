import {Component} from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * @title Vertical and Horizontal Tabs
 */
@Component({
    selector: 'hc-tabs-vertical-example',
    templateUrl: 'tabs-vertical-example.component.html',
    styleUrls: ['tabs-vertical-example.component.scss']
})
export class TabsVerticalExampleComponent {
    readonly _tight = new FormControl(false);
}
