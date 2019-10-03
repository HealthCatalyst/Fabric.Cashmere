import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'hc-file-input-custom-label-and-color-example',
    templateUrl: 'file-input-custom-label-and-color-example.component.html'
})
export class FileInputCustomLabelAndColorExampleComponent {
    formGroup = new FormGroup({
        file: new FormControl()
    });
    submittedValue: any;

    onSubmit() {
        this.submittedValue = this.formGroup.value;
    }
}
