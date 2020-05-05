import { NullOrEmptyStringPipe } from './null-or-empty-string.pipe';

describe('NullOrEmptyStringPipe', () => {
    let pipe: NullOrEmptyStringPipe;

    beforeEach(() => {
        pipe = new NullOrEmptyStringPipe();
    });

    it('should create', () => {
        expect(pipe).toBeTruthy();
    });

    it('return source text if not null or empty', () => {
        const result = pipe.transform('source data', 'alternate text');
        expect(result).toEqual('source data');
    });

    it('return alternate text contains just white space characters', () => {
        // tslint:disable-next-line: no-trailing-whitespace
        const result = pipe.transform(`   
        `, 'alternate text');
        expect(result).toEqual('alternate text');
    });

    it('return alternate text if empty string', () => {
        const result = pipe.transform('', 'alternate text');
        expect(result).toEqual('alternate text');
    });

    it('return alternate text if null', () => {
        const input: any = null;
        const result = pipe.transform(input, 'alternate text');
        expect(result).toEqual('alternate text');
    });

    it('return alternate text if undefined', () => {
        const input: any = undefined;
        const result = pipe.transform(input, 'alternate text');
        expect(result).toEqual('alternate text');
    });

    it('return NaN as is', () => {
        const input: any = NaN;
        const result = pipe.transform(input, 'alternate text');
        expect(result).toEqual(input);
    });

    it('return number as is', () => {
        const input: any = 0;
        const result = pipe.transform(input, 'alternate text');
        expect(result).toEqual(0);
    });

    it('return object as is', () => {
        const input: any = { foo: 'bar' };
        const result = pipe.transform(input, 'alternate text');
        expect(result).toEqual(input);
    });

    it('return boolean as is', () => {
        const input: any = false;
        const result = pipe.transform(input, 'alternate text');
        expect(result).toEqual(input);
    });

    it('return function as is', () => {
        const input: any = () => "foo";
        const result = pipe.transform(input, 'alternate text');
        expect(result).toEqual(input);
    });
});
