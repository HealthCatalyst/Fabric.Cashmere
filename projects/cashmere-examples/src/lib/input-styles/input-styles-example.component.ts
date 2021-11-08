import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * @title Example of various styles of inputs
 */
@Component({
    selector: 'hc-input-styles-example',
    templateUrl: 'input-styles-example.component.html',
    styleUrls: ['input-styles-example.component.scss']
})
export class InputStylesExampleComponent {
    inlineState = new FormControl(false);
    tightState =  new FormControl(false);
    mobileState = new FormControl(false);
}
