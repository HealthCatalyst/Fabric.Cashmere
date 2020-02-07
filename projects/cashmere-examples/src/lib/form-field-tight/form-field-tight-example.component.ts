import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * @title Tight Form Field Elements
 */
@Component({
    selector: 'hc-form-field-tight-example',
    templateUrl: 'form-field-tight-example.component.html',
    styleUrls: ['form-field-tight-example.component.scss']
})
export class FormFieldTightExampleComponent {
    selectControl = new FormControl('daily');
    inputControl = new FormControl('');
    radioControl = new FormControl('SM');
    checkControl = new FormControl('');
}
