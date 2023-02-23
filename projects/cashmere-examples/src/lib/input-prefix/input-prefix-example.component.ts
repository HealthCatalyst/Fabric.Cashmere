import {Component} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

/**
 * @title Disabled Inputs with Prefix and Suffix
 */
@Component({
    selector: 'hc-input-prefix-example',
    templateUrl: 'input-prefix-example.component.html',
    styleUrls: ['input-prefix-example.component.scss']
})
export class InputPrefixExampleComponent {
    inputPrefix = new UntypedFormControl({value: 'disable working', disabled: true});
}
