import {Component} from '@angular/core';
import {UntypedFormControl, Validators} from '@angular/forms';

/**
 * @title Required Input
 */
@Component({
    selector: 'hc-input-required-example',
    templateUrl: 'input-required-example.component.html',
    styleUrls: ['input-required-example.component.scss']
})
export class InputRequiredExampleComponent {
    formDemo = new UntypedFormControl('', [Validators.email, Validators.required]);
}
