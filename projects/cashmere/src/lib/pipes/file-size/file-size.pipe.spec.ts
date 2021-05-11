import {FileSizePipe} from './file-size.pipe';

describe('FileSizePipe.transform', () => {
    let pipe: FileSizePipe;

    beforeEach(() => {
        pipe = new FileSizePipe();
    });

    it(`should convert 1 to '1 bytes'`, () => {
        const testFileSize = 1;
        const result: string = pipe.transform(testFileSize);
        expect(result).toEqual('1 bytes');
    });

    it(`should convert 1024 to '1 KB'`, () => {
        const testFileSize = 1024;
        const result: string = pipe.transform(testFileSize);
        expect(result).toEqual('1 KB');
    });

    it(`should convert 1048576 to '1 MB'`, () => {
        const testFileSize = 1048576;
        const result: string = pipe.transform(testFileSize);
        expect(result).toEqual('1 MB');
    });

    it(`should convert 1073741824 to '1 GB'`, () => {
        const testFileSize = 1073741824;
        const result: string = pipe.transform(testFileSize);
        expect(result).toEqual('1 GB');
    });

    it(`should convert 1099511627776 to '1 TB'`, () => {
        const testFileSize = 1099511627776;
        const result: string = pipe.transform(testFileSize);
        expect(result).toEqual('1 TB');
    });

    it(`should convert 1125899906842624 to '1 PB'`, () => {
        const testFileSize = 1125899906842624;
        const result: string = pipe.transform(testFileSize);
        expect(result).toEqual('1 PB');
    });

    it(`should convert 260024669455461000000 to '230948.30 PB'`, () => {
        const testFileSize = 260024669455461000000;
        const result: string = pipe.transform(testFileSize);
        expect(result).toEqual('230948.30 PB');
    });

    it(`should convert "1125854654485" to '1.02 TB'`, () => {
        const testFileSize = 1125854654485;
        const result: string = pipe.transform(testFileSize);
        expect(result).toEqual('1.02 TB');
    });

    it('should reduce precision to 100 if given precision is over 100', () => {
        const testFileSize = 2000;
        const result: string = pipe.transform(testFileSize, 123);
        expect(result).toEqual('1.9531250000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 KB');
    });

    describe('when provided an invalid byte value', () => {
        const invalidByteValues: any[] = [null, undefined, 'test', false, -12, Math.PI, [], {}];
        invalidByteValues.forEach(bytes => {
            describe(`(${bytes})`, () => {
                it(`should return '?'`, () => {
                    expect(pipe.transform(bytes)).toBe(`${bytes}`);
                });
            });
        });
    });

    describe('when provided an invalid precision value', () => {
        const invalidPrecisionValues: any[] = [null, undefined, 'test', false, -12, Math.PI, [], {}];
        invalidPrecisionValues.forEach(precision => {
            describe(`(${precision})`, () => {
                it(`should use a precision of 2`, () => {
                    expect(pipe.transform(2000, precision)).toBe('1.95 KB');
                });
            });
        });
    });
});
