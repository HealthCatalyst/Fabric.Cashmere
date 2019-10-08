import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

/**
 * @title Input with Phone Number Formatting
 */
@Component({
    selector: 'hc-input-phone-number-example',
    templateUrl: 'input-phone-number-example.component.html',
    styleUrls: ['input-phone-number-example.component.scss']
})
export class InputPhoneNumberExampleComponent {

    formDemoPhone = new FormControl('',[Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/),Validators.required]);
}