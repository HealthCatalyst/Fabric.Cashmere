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
        const result = pipe.transform(`
        `, 'alternate text');
        expect(result).toEqual('alternate text');
    });

    it('return alternate text if empty string', () => {
        const result = pipe.transform('', 'alternate text');
        expect(result).toEqual('alternate text');
    });

    it('return alternate text if null', () => {
        const input = null;
        const result = pipe.transform(input, 'alternate text');
        expect(result).toEqual('alternate text');
    });

    it('return alternate text if undefined', () => {
        const input = undefined;
        const result = pipe.transform(input, 'alternate text');
        expect(result).toEqual('alternate text');
    });

    it('return NaN as is', () => {
        const input = NaN;
        const result = pipe.transform(input, 'alternate text');
        expect(result).toEqual(input);
    });

    it('return number as is', () => {
        const input = 0;
        const result = pipe.transform(input, 'alternate text');
        expect(result).toEqual(0);
    });

    it('return object as is', () => {
        const input = { foo: 'bar' };
        const result = pipe.transform(input, 'alternate text');
        expect(result).toEqual(input);
    });

    it('return boolean as is', () => {
        const input = false;
        const result = pipe.transform(input, 'alternate text');
        expect(result).toEqual(input);
    });

    it('return function as is', () => {
        const input = () => "foo";
        const result = pipe.transform(input, 'alternate text');
        expect(result).toEqual(input);
    });
});
