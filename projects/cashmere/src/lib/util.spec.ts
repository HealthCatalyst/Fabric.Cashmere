import {parseBooleanAttribute} from './util';

describe('parseBooleanAttribute', () => {
    describe('when value is boolean true', () => {
        it('should return boolean true', () => {
            const result = parseBooleanAttribute(true);
            expect(result).toBe(true);
        });
    });
    describe('when value is boolean false', () => {
        it('should return boolean false', () => {
            const result = parseBooleanAttribute(false);
            expect(result).toBe(false);
        });
    });
    describe('when value is string true', () => {
        it('should return boolean true', () => {
            const result = parseBooleanAttribute('true');
            expect(result).toBe(true);
        });
    });
    describe('when value is string TRUE', () => {
        it('should return boolean true', () => {
            const result = parseBooleanAttribute('TRUE');
            expect(result).toBe(true);
        });
    });
    describe('when value is string false', () => {
        it('should return boolean false', () => {
            const result = parseBooleanAttribute('false');
            expect(result).toBe(false);
        });
    });
    describe('when value is string FALSE', () => {
        it('should return boolean false', () => {
            const result = parseBooleanAttribute('FALSE');
            expect(result).toBe(false);
        });
    });
    describe('when value is empty string', () => {
        it('should return boolean true', () => {
            const result = parseBooleanAttribute('');
            expect(result).toBe(true);
        });
    });
    describe('when value is any other value', () => {
        it('should throw an error', () => {
            const wrap = () => parseBooleanAttribute('1234');
            expect(wrap).toThrowError('1234 is not a boolean value');
        });
    });
});
