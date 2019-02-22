import {Component} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {fileTypeValidator} from '@wcf-insurance/cashmere';

@Component({
    selector: 'hc-file-input-file-type-validation-example',
    templateUrl: 'file-input-file-type-validation-example.component.html'
})
export class FileInputFileTypeValidationExampleComponent {
    allowedFileExtensions = ['pdf'];
    get displayAllowedFileExtensions() {
        return this.allowedFileExtensions.map(e => e.toUpperCase()).join(', ');
    }
    formGroup = new FormGroup({
        file: new FormControl(null, [fileTypeValidator(this.allowedFileExtensions)])
    });
    submittedValue: any;
    onSubmit() {
        this.submittedValue = this.formGroup.value;
    }
}
