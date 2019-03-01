import {fileTypeValidator} from './file-type.validator';
import {ValidatorFn, FormControl} from '@angular/forms';
import {FileUpload} from '../file-upload';

describe('fileTypeValidator', () => {
    describe('which allows image file types', () => {
        const imageFileTypeExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        let validator: ValidatorFn;
        beforeEach(() => {
            validator = fileTypeValidator(imageFileTypeExtensions);
        });
        it(`should not return an error for 'test.jpg'`, () => {
            expect(validate('test.jpg', validator)).toBe(null);
        });
        it(`should not return an error for 'test.jpeg'`, () => {
            expect(validate('test.jpeg', validator)).toBe(null);
        });
        it(`should not return an error for 'test.png'`, () => {
            expect(validate('test.png', validator)).toBe(null);
        });
        it(`should not return an error for 'test.gif'`, () => {
            expect(validate('test.gif', validator)).toBe(null);
        });
        it(`should return an error for 'test.pdf'`, () => {
            expect(validate('test.pdf', validator)).toEqual({fileType: true});
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

function validate(fileName: string, validator: ValidatorFn) {
    const fileUpload: FileUpload = {
        name: fileName,
        lastModified: Date.now(),
        size: 0,
        type: 'test'
    };
    const formControl = ({
        value: fileUpload
    } as Partial<FormControl>) as FormControl;
    return validator(formControl);
}
