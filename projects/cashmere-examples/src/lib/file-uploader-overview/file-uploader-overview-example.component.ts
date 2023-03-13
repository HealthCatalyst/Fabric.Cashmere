import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * @title Overview of File Uploader functionality
 */
@Component({
    selector: 'hc-file-uploader-overview-example',
    templateUrl: 'file-uploader-overview-example.component.html',
    styleUrls: ['file-uploader-overview-example.component.scss']
})
export class FileUploaderOverviewExampleComponent {
    selectedFiles = new FormControl();
    multipleFiles = new FormControl(false, {nonNullable: true});
    controlTight = new FormControl(false, {nonNullable: true});

    get selectedFileNames(): string {
        let printString = '';
        if ( this.selectedFiles.value ) {
            // The file uploader FormControl returns a FileList object
            const files: FileList = this.selectedFiles.value;
            for (let i = 0; i < files.length; i++) {
                if ( i !== 0 ) {
                    printString += ', ';
                }
                printString += files[i].name;
            }
        }
        return printString;
    }

    checkFileSize(): void {
        // The filesAdded emitter also sends a FileList if you aren't using a FormControl
        if ( this.selectedFiles.value[0].size > 2000000 ) {
            this.selectedFiles.markAsTouched();
            this.selectedFiles.setErrors({invalid: true});
        }
    }
}
