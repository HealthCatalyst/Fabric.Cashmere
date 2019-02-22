import {ValidatorFn, FormControl} from '@angular/forms';
import {FileUpload} from '../file-upload';

/**
 * validator which checks to make sure that the file does not exceed
 * the maximum specified size
 * designed to work with a FormControl attached to a FileInputComponent
 * @param maxFileSizeBytes the maximum valid file size, in bytes
 */
export function fileSizeValidator(maxFileSizeBytes: number): ValidatorFn {
    return (control: FormControl) => {
        const value: FileUpload = control.value || {};
        if (value.size > maxFileSizeBytes) {
            return {fileSize: true};
        }
        return null;
    };
}
