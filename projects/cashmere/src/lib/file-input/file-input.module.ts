import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileInputComponent} from './file-input.component';
import {FileSizePipe} from './file-size.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [FileInputComponent, FileSizePipe],
    exports: [FileInputComponent, FileSizePipe]
})
export class FileInputModule {}
