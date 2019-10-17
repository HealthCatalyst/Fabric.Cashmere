import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

/**
 * @title Input with Currency Formatting
 */
@Component({
    selector: 'hc-input-currency-example',
    templateUrl: 'input-currency-example.component.html',
    styleUrls: ['input-currency-example.component.scss']
})
export class InputCurrencyExampleComponent {
    formDemoCurrency = new FormControl('', [Validators.pattern(/^(\d{0,3},)?(\d{0,3},)?(\d{1,3})(\.\d{2})/), Validators.required]);
}