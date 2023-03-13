import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * @title Disabled Inputs with Prefix and Suffix
 */
@Component({
    selector: 'hc-input-prefix-example',
    templateUrl: 'input-prefix-example.component.html',
    styleUrls: ['input-prefix-example.component.scss']
})
export class InputPrefixExampleComponent {
    inputPrefix = new FormControl({value: 'disable working', disabled: true});
}
