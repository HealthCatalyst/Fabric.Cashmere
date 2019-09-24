import {Component} from '@angular/core';
import {CheckboxChangeEvent} from '@healthcatalyst/cashmere';
import {FormGroup, FormArray, FormControl, FormBuilder} from '@angular/forms';

/**
 * @title Indeterminate Checkbox
 */
@Component({
    selector: 'hc-checkbox-indeterminate-example',
    templateUrl: 'checkbox-indeterminate-example.component.html',
    styleUrls: ['checkbox-indeterminate-example.component.scss']
})
export class CheckboxIndeterminateExampleComponent {
    checkboxGroup: FormGroup;

    constructor(_fb: FormBuilder) {
        let checkboxArray = new FormArray([new FormControl(false), new FormControl(true), new FormControl(false), new FormControl(true)]);
        this.checkboxGroup = _fb.group({
            checkValues: checkboxArray
        });
    }

    getChecks() {
        const formArray = this.checkboxGroup.get('checkValues') as FormArray;
        const controls = formArray.controls as FormControl[];
        return controls;
    }

    isChecked() {
        const checkedCount = this.checkboxGroup.controls['checkValues'].value.filter(c => c).length;
        return checkedCount === this.checkboxGroup.controls['checkValues'].value.length;
    }

    isIndeterminate() {
        const checkedCount = this.checkboxGroup.controls['checkValues'].value.filter(c => c).length;
        return !(checkedCount === 0 || checkedCount === this.checkboxGroup.controls['checkValues'].value.length);
    }

    parentClick() {
        const checkedCount = this.checkboxGroup.controls['checkValues'].value.filter(c => c).length;
        const valueArray = new Array(this.checkboxGroup.controls['checkValues'].value.length);

        if (checkedCount !== this.checkboxGroup.controls['checkValues'].value.length) {
            valueArray.fill(true);
        } else {
            valueArray.fill(false);
        }

        this.checkboxGroup.controls['checkValues'].setValue(valueArray);
    }
}
