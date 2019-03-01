import {fileSizeValidator} from './file-size.validator';
import {ValidatorFn, FormControl} from '@angular/forms';
import {FileUpload} from '../file-upload';

describe('fileTypeValidator', () => {
    describe('which allows files up to 1MB', () => {
        const maxFileSize = 1024 * 1024;
        let validator: ValidatorFn;
        beforeEach(() => {
            validator = fileSizeValidator(maxFileSize);
        });
        it(`should not return an error for file size 0 bytes`, () => {
            expect(validate(0, validator)).toBe(null);
        });
        it(`should not return an error for file size 1 byte`, () => {
            expect(validate(1, validator)).toBe(null);
        });
        it(`should not return an error for file size 1KB`, () => {
            expect(validate(1024, validator)).toBe(null);
        });
        it(`should not return an error for file size 1023KB`, () => {
            expect(validate(maxFileSize - 1, validator)).toBe(null);
        });
        it(`should not return an error for file size 1MB`, () => {
            expect(validate(maxFileSize, validator)).toBe(null);
        });
        it(`should return an error for 1MB + 1 byte`, () => {
            expect(validate(maxFileSize + 1, validator)).toEqual({fileSize: true});
        });

        describe('when no file is selected', () => {
            let formControl: FormControl;
            beforeEach(() => {
                formControl = ({value: undefined} as Partial<FormControl>) as FormControl;
            });
            it('should not return an error', () => {
                expect(validator(formControl)).toBe(null);
            });
        });
    });
});

function validate(size: number, validator: ValidatorFn) {
    const fileUpload: FileUpload = {
        name: 'test.doc',
        lastModified: Date.now(),
        size: size,
        type: 'test'
    };
    const formControl = ({
        value: fileUpload
    } as Partial<FormControl>) as FormControl;
    return validator(formControl);
}
