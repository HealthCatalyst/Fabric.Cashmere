import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileInputComponent} from './file-input.component';
import {FileSizePipe} from './pipes/file-size.pipe';
import {BrowserFileReaderFactory, FileReaderFactory} from './file-reader-factory.service';
import {ButtonModule} from '../button/index';
import {ChipModule} from '../chip/index';

@NgModule({
    imports: [CommonModule, ChipModule, ButtonModule],
    declarations: [FileInputComponent, FileSizePipe],
    exports: [FileInputComponent, FileSizePipe],
    providers: [{provide: FileReaderFactory, useClass: BrowserFileReaderFactory}]
})
export class FileInputModule {}
