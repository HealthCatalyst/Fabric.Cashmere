import {async, inject, TestBed} from '@angular/core/testing';

import {EllipsisPipe} from './ellipsis.pipe';

describe('EllipsisPipe', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [EllipsisPipe]
        }).compileComponents();
    }));

    it(
        'Should truncate string',
        inject([EllipsisPipe], pipe => {
            // arrange

            // act
            const result: any = pipe.transform('A long string', 4);

            // assert
            expect(result).toBe('A lo...', 'String was not truncated properly');
        })
    );

    it(
        'Should not truncate a short string',
        inject([EllipsisPipe], pipe => {
            // arrange
            const testString: string = 'A long string';

            // act
            const result: any = pipe.transform(testString, 100);

            // assert
            expect(result).toBe(testString, 'String should not be truncated');
        })
    );

    it(
        'Should return string if arg is undefined',
        inject([EllipsisPipe], pipe => {
            // arrange
            const testString: string = 'A long string';

            // act
            const result: string = pipe.transform(testString, undefined);

            // assert
            expect(result).toBe(testString, 'String should not be truncated');
        })
    );

    it(
        'Should return same value if falsey',
        inject([EllipsisPipe], pipe => {
            // arrange

            // act
            const nullResult: string = pipe.transform(null, 10);
            const undefinedResult: string = pipe.transform(undefined, 10);

            // assert
            expect(nullResult).toBeNull('Falsey value should return same value');
            expect(undefinedResult).toBeUndefined('Falsey value should return same value');
        })
    );
});
