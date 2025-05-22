import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * @title Tight Form Field Elements
 */
@Component({
    selector: 'hc-form-field-tight-example',
    templateUrl: 'form-field-tight-example.component.html',
    styleUrls: ['form-field-tight-example.component.scss'],
    standalone: false
})
export class FormFieldTightExampleComponent {
    selectControl = new FormControl('daily', {nonNullable: true});
    inputControl = new FormControl('', {nonNullable: true});
    radioControl = new FormControl('SM', {nonNullable: true});
    checkControl = new FormControl('', {nonNullable: true});
}
