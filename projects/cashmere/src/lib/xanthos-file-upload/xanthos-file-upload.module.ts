import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {XanthosFileUploadComponent} from './xanthos-file-upload.component';
import {FormFieldModule} from '../form-field/index';
import {FileInputModule} from '../file-input/index';
import {SelectModule} from '../select/index';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FileInputModule, SelectModule, FormFieldModule],
    declarations: [XanthosFileUploadComponent],
    exports: [XanthosFileUploadComponent]
})
export class XanthosFileUploadModule {}
