import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * @title Radio Button Alignment
 */
@Component({
    selector: 'hc-radio-button-align-example',
    templateUrl: 'radio-button-align-example.component.html',
    styleUrls: ['radio-button-align-example.component.scss'],
    standalone: false
})
export class RadioButtonAlignExampleComponent {
    alignControl = new FormControl('center', {nonNullable: true});
}
