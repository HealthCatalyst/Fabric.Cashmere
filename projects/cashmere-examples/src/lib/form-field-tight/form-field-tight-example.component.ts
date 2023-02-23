import {Component} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';

/**
 * @title Tight Form Field Elements
 */
@Component({
    selector: 'hc-form-field-tight-example',
    templateUrl: 'form-field-tight-example.component.html',
    styleUrls: ['form-field-tight-example.component.scss']
})
export class FormFieldTightExampleComponent {
    selectControl = new UntypedFormControl('daily');
    inputControl = new UntypedFormControl('');
    radioControl = new UntypedFormControl('SM');
    checkControl = new UntypedFormControl('');
}
