import {FileSizePipe, bytesToFileSize} from './file-size.pipe';
import {Component} from '@angular/core';
import {TestBed, ComponentFixture, async} from '@angular/core/testing';

describe('FileSizePipe when used in a template', () => {
    const fileSize = 3462734;
    @Component({template: '{{ size | hcFileSize }}'})
    class TestComponent {
        size = fileSize;
    }

    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() =>
        TestBed.configureTestingModule({
            declarations: [TestComponent, FileSizePipe]
        }).compileComponents()
    );
    beforeEach(async(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
    }));

    it('should output the expected value', () => {
        expect(fixture.nativeElement.textContent).toBe('3.3MB');
    });
});

describe('bytesToFileSize', () => {
    describe('when value is `null`', () => {
        it('should return an empty string', () => expect(bytesToFileSize(null)).toBe(''));
    });
    describe('when value is `undefined`', () => {
        it('should return an empty string', () => expect(bytesToFileSize(undefined)).toBe(''));
    });
    describe('when value is `NaN`', () => {
        it(`should return 'NaN'`, () => expect(bytesToFileSize(NaN)).toBe('NaN'));
    });
    describe('when value is not a number', () => {
        it('should return the value as a string', () => expect(bytesToFileSize(NaN)).toBe('NaN'));
    });
    describe('when value is an object', () => {
        it('should return the value as a string', () => expect(bytesToFileSize({})).toBe('[object Object]'));
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
                it(`should return '${testCase.output}'`, () => expect(bytesToFileSize(testCase.size)).toBe(testCase.output));
            });
        }
    });
});
