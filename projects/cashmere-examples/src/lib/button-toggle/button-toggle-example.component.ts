import {Component, ComponentRef, ContentChildren, forwardRef, ViewChild} from '@angular/core';
import { ButtonToggleGroupComponent } from 'projects/cashmere/src/lib/button-toggle/button-toggle-group.component';
import { ButtonToggleComponent } from 'projects/cashmere/src/lib/button-toggle/button-toggle.component';

@Component({
    selector: 'hc-button-toggle-example',
    templateUrl: 'button-toggle-example.component.html',
    // TODO: delete the SCSS file if you don't need it in the example
    styleUrls: ['button-toggle-example.component.scss']
})
export class ButtonToggleExampleComponent {
    public selectedButtonToggle: ButtonToggleComponent;
    public selectedValue: any;


    @ViewChild(ButtonToggleGroupComponent, {read: false, static: true})
    buttonToggleGroupComponent: ButtonToggleGroupComponent;


}
