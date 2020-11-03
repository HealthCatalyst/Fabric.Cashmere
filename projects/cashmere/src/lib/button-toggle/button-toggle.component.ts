import {Component, Input, ViewEncapsulation } from '@angular/core';
import { ButtonToggleGroupComponent } from './button-toggle-group.component';

/** Notification banners are used for general information about the state of the application or upcoming events. For instant
 * feedback responding to user actions, use a toaster message.*/
@Component({
    selector: 'hc-button-toggle',
    templateUrl: './button-toggle.component.html',
    styleUrls: ['./button-toggle.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ButtonToggleComponent {
    @Input() public selected: boolean;
    @Input() public uniqueId: number;
    @Input() public value: string;

    buttonToggleGroup: ButtonToggleGroupComponent;


    constructor(group: ButtonToggleGroupComponent) {
        this.buttonToggleGroup = group;
    };

    public selectButton() {
        this.buttonToggleGroup.onSelectedChanged(this.uniqueId);
    }
}
