import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploaderComponent } from './file-uploader.component';
import { FormFieldModule } from '../form-field';
import { InputModule } from '../input';
import { ButtonModule } from '../button';

@NgModule({
    imports: [CommonModule, FormFieldModule, InputModule, ButtonModule, FormsModule, ReactiveFormsModule],
    exports: [FileUploaderComponent],
    declarations: [FileUploaderComponent]
})
export class FileUploaderModule {}
