import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

/**
 * @title Required Input
 */
@Component({
    selector: 'input-required-example',
    templateUrl: 'input-required-example.html',
    styleUrls: ['input-required-example.css']
})
export class InputRequiredExample {
    formDemo = new FormControl('', Validators.required);
}
