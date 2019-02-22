import {Component} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {fileSizeValidator} from '@wcf-insurance/cashmere';

@Component({
    selector: 'hc-file-input-file-size-validation-example',
    templateUrl: 'file-input-file-size-validation-example.component.html'
})
export class FileInputFileSizeValidationExampleComponent {
    readonly maxFileSizeBytes = 1024;
    formGroup = new FormGroup({
        file: new FormControl(null, [fileSizeValidator(this.maxFileSizeBytes)])
    });
    submittedValue: any;
    onSubmit() {
        this.submittedValue = this.formGroup.value;
    }
}
