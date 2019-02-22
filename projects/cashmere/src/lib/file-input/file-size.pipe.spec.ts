import {FileSizePipe} from './file-size.pipe';

fdescribe('FileSizePipe', () => {
    let pipe: FileSizePipe;
    beforeEach(() => {
        pipe = new FileSizePipe();
    });
    describe('when value is `null`', () => {
        it('should return an empty string', () => expect(pipe.transform(null)).toBe(''));
    });
    describe('when value is `undefined`', () => {
        it('should return an empty string', () => expect(pipe.transform(undefined)).toBe(''));
    });
    describe('when value is `NaN`', () => {
        it(`should return 'NaN'`, () => expect(pipe.transform(NaN)).toBe('NaN'));
    });
    describe('when value is not a number', () => {
        it('should return the value as a string', () => expect(pipe.transform(NaN)).toBe('NaN'));
    });
    describe('when value is an object', () => {
        it('should return the value as a string', () => expect(pipe.transform({})).toBe('[object Object]'));
    });
    describe('when value is a number', () => {
        const testCases = [
            {size: 0, output: '0 bytes'},
            {size: 1024, output: '1KB'},
            {size: 1024 * 1024, output: '1MB'},
            {size: 1024 * 1024 * 1024, output: '1GB'},
            {size: 1024 * 1024 * 1024 * 1024, output: '1024GB'},
            {size: 832, output: '832 bytes'},
            {size: 47383, output: '46.3KB'},
            {size: 239847, output: '234.2KB'},
            {size: 3462734, output: '3.3MB'},
            {size: 45698392, output: '43.6MB'}
        ];
        for (let testCase of testCases) {
            describe(`with size of ${testCase.size}`, () => {
                it(`should return '${testCase.output}'`, () => expect(pipe.transform(testCase.size)).toBe(testCase.output));
            });
        }
    });
});
