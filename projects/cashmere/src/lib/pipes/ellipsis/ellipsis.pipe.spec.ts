import {EllipsisPipe} from './ellipsis.pipe';

describe('EllipsisPipe.transform', () => {
    let pipe: EllipsisPipe;

    beforeEach(() => {
        pipe = new EllipsisPipe();
    });

    describe('in character mode', () => {
        it('should truncate a string longer than the length', () => {
            // act
            const result: unknown = pipe.transform('A long string', 4);

            // assert
            expect(result).toBe('A lo…');
        });

        it('should return the input string when length is greater than the input length', () => {
            // arrange
            const testString = 'A long string';

            // act
            const result: unknown = pipe.transform(testString, 100);

            // assert
            expect(result).toBe(testString);
        });
    });

    describe('in word mode', () => {
        it('should truncate a string longer than the specified number of words', () => {
            // act
            const result: unknown = pipe.transform('A long string', 2, 'words');

            // assert
            expect(result).toBe('A long…');
        });

        it('should return the input string when length is greater than the number of words in the input', () => {
            // arrange
            const testString = 'A long string';

            // act
            const result: unknown = pipe.transform(testString, 5, 'words');

            // assert
            expect(result).toBe(testString);
        });

        it('should respect all whitespace from the original value when truncating', () => {
            // act
            const result: unknown = pipe.transform('A  \r\n   long string', 2, 'words');

            // assert
            expect(result).toBe('A  \r\n   long…');
        });
    });

    describe('when the input value is not a string', () => {
        const nonStringValues: any = [null, undefined, 12, false, {}, []];
        nonStringValues.forEach(value => {
            describe(`(${value})`, () => {
                it('should return the input', () => {
                    const result: unknown = pipe.transform(value, 10);
                    expect(result).toBe(value);
                });
            });
        });
    });

    describe('when the length is not a valid number', () => {
        const nonNumberLengths: any[] = [null, undefined, '12', false, {}, [], NaN, -12, Math.PI];
        nonNumberLengths.forEach(length => {
            describe(`(${length})`, () => {
                it('should return the input value', () => {
                    const value = 'lorem ipsum';
                    const result: unknown = pipe.transform(value, length);
                    expect(result).toBe(value);
                });
            });
        });
    });
});
