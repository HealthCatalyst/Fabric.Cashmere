/* eslint-disable @typescript-eslint/no-explicit-any */
import {ChangeCasePipe} from './change-case.pipe';
import {ChangeCaseLib} from './change-case-lib';

describe('ChangeCasePipe', () => {
    let pipe: ChangeCasePipe;
    let changeCaseLib: ChangeCaseLib;

    beforeEach(() => {
        changeCaseLib = {pascalCase: jest.fn()} as any;
        pipe = new ChangeCasePipe(changeCaseLib);
    });

    describe('when provided a valid case parameter', () => {
        it('(pascalCase) should transform the input to PascalCase', () => {
            pipe.transform('hello world', 'pascalCase');
            expect(changeCaseLib.pascalCase).toHaveBeenCalled();
        });
    });

    describe('when provided an invalid case parameter', () => {
        it('should throw an error', () => {
            expect(() => pipe.transform('hello world', 'insideOutCase' as any)).toThrow();
        });
    });
});
