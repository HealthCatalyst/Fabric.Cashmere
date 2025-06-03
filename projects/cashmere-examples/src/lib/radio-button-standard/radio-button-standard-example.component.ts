import {Component} from '@angular/core';
import { RadioButtonChangeEvent } from '@healthcatalyst/cashmere';

/**
 * @title Standard Radio Buttons
 */
@Component({
    selector: 'hc-radio-button-standard-example',
    templateUrl: 'radio-button-standard-example.component.html',
    styleUrls: ['radio-button-standard-example.component.scss'],
    standalone: false
})
export class RadioButtonStandardExampleComponent {
    selectedOption = '1';

    updateSelectedOption(event: RadioButtonChangeEvent): void {
        this.selectedOption = event.value;
    }
}
