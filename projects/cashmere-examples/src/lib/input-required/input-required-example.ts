import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

/**
 * @title Required Input
 */
@Component({
    selector: 'input-required-example',
    templateUrl: 'input-required-example.html',
    styles: ['.form-container { width: 300px; }', '.hc-form-field { width: 100%; }']
})
export class InputRequiredExample {
    formDemo = new FormControl('', Validators.required);
}
