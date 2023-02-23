import {Component} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

/**
 * @title Radio Button Alignment
 */
@Component({
    selector: 'hc-radio-button-align-example',
    templateUrl: 'radio-button-align-example.component.html',
    styleUrls: ['radio-button-align-example.component.scss']
})
export class RadioButtonAlignExampleComponent {
    alignControl = new UntypedFormControl('center');
}
