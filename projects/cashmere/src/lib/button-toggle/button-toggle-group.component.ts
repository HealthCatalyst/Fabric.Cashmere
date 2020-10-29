import {Component, ViewEncapsulation} from '@angular/core';
import * as util from '../util';

/** Notification banners are used for general information about the state of the application or upcoming events. For instant
 * feedback responding to user actions, use a toaster message.*/
@Component({
    selector: 'hc-button-toggle-group',
    templateUrl: './button-toggle-group.component.html',
    styleUrls: ['./button-toggle.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ButtonToggleGroupComponent {}
