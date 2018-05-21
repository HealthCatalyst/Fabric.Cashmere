import {SimpleChange} from '@angular/core';
import {PaginationComponent} from './pagination.component';

describe('PaginationCompoent', () => {
    let component: PaginationComponent;
    beforeEach(() => {
        component = new PaginationComponent();
    });

    describe('.pageNumber', () => {
        describe('when `totalPages === null` and `pageNumber` is set to any value', () => {
            beforeEach(() => {
                component.totalPages = null;
                component.inputPageNumber = 12;
                component.ngOnChanges({
                    totalPages: new SimpleChange(undefined, null, true),
                    inputPageNumber: new SimpleChange(undefined, 12, true)
                });
            });
            it('should be `null`', () => {
                expect(component.pageNumber).toBe(null);
            });
        });
        describe('when `totalPages === undefined` and `pageNumber` is set to any value', () => {
            beforeEach(() => {
                component.totalPages = undefined;
                component.inputPageNumber = 12;
                component.ngOnChanges({
                    totalPages: new SimpleChange(undefined, undefined, true),
                    inputPageNumber: new SimpleChange(undefined, 12, true)
                });
            });
            it('should be `null`', () => {
                expect(component.pageNumber).toBe(null);
            });
        });
        describe('when `totalPages === 12` and `pageNumber` is set to 13', () => {
            beforeEach(() => {
                component.totalPages = 12;
                component.inputPageNumber = 13;
                component.ngOnChanges({
                    totalPages: new SimpleChange(undefined, 12, true),
                    inputPageNumber: new SimpleChange(undefined, 13, true)
                });
            });
            it('should be `12`', () => {
                expect(component.pageNumber).toBe(12);
            });
        });
        describe('when `totalPages === 12` and `pageNumber` is set to 6', () => {
            beforeEach(() => {
                component.totalPages = 12;
                component.inputPageNumber = 6;
                component.ngOnChanges({
                    totalPages: new SimpleChange(undefined, 12, true),
                    inputPageNumber: new SimpleChange(undefined, 6, true)
                });
            });
            it('should be `6`', () => {
                expect(component.pageNumber).toBe(6);
            });
        });
        describe('when `totalPages === 12` and `pageNumber` is set to 1', () => {
            beforeEach(() => {
                component.totalPages = 12;
                component.inputPageNumber = 1;
                component.ngOnChanges({
                    totalPages: new SimpleChange(undefined, 12, true),
                    inputPageNumber: new SimpleChange(undefined, 1, true)
                });
            });
            it('should be `1`', () => {
                expect(component.pageNumber).toBe(1);
            });
        });
        describe('when `totalPages === 12` and `pageNumber` is set to 12', () => {
            beforeEach(() => {
                component.totalPages = 12;
                component.inputPageNumber = 12;
                component.ngOnChanges({
                    totalPages: new SimpleChange(undefined, 12, true),
                    inputPageNumber: new SimpleChange(undefined, 12, true)
                });
            });
            it('should be `12`', () => {
                expect(component.pageNumber).toBe(12);
            });
        });
        describe('when `totalPages === 12` and `pageNumber` is set to 0', () => {
            beforeEach(() => {
                component.totalPages = 12;
                component.inputPageNumber = 0;
                component.ngOnChanges({
                    totalPages: new SimpleChange(undefined, 12, true),
                    inputPageNumber: new SimpleChange(undefined, 0, true)
                });
            });
            it('should be `1`', () => {
                expect(component.pageNumber).toBe(1);
            });
        });
        describe('when `totalPages === 12` and `pageNumber` is set to -1', () => {
            beforeEach(() => {
                component.totalPages = 12;
                component.inputPageNumber = -1;
                component.ngOnChanges({
                    totalPages: new SimpleChange(undefined, 12, true),
                    inputPageNumber: new SimpleChange(undefined, -1, true)
                });
            });
            it('should be `1`', () => {
                expect(component.pageNumber).toBe(1);
            });
        });
        describe('when `totalPages === 12` and `pageNumber` is set to `null`', () => {
            beforeEach(() => {
                component.totalPages = 12;
                component.inputPageNumber = null;
                component.ngOnChanges({
                    totalPages: new SimpleChange(undefined, 12, true),
                    inputPageNumber: new SimpleChange(undefined, null, true)
                });
            });
            it('should be `1`', () => {
                expect(component.pageNumber).toBe(1);
            });
        });
        describe('when `totalPages === 12` and `pageNumber` is set to `undefined`', () => {
            beforeEach(() => {
                component.totalPages = 12;
                component.inputPageNumber = <any>undefined;
                component.ngOnChanges({
                    totalPages: new SimpleChange(undefined, 12, true),
                    inputPageNumber: new SimpleChange(undefined, undefined, true)
                });
            });
            it('should be `1`', () => {
                expect(component.pageNumber).toBe(1);
            });
        });
        describe('when `totalPages === 12` and `pageNumber` is set to `NaN`', () => {
            beforeEach(() => {
                component.totalPages = 12;
                component.inputPageNumber = NaN;
                component.ngOnChanges({
                    totalPages: new SimpleChange(undefined, 12, true),
                    inputPageNumber: new SimpleChange(undefined, NaN, true)
                });
            });
            it('should be `1`', () => {
                expect(component.pageNumber).toBe(1);
            });
        });
        describe('when `totalPages === 12` and `pageNumber` is set to `[]`', () => {
            beforeEach(() => {
                component.totalPages = 12;
                component.inputPageNumber = [] as any;
                component.ngOnChanges({
                    totalPages: new SimpleChange(undefined, 12, true),
                    inputPageNumber: new SimpleChange(undefined, [], true)
                });
            });
            it('should be `1`', () => {
                expect(component.pageNumber).toBe(1);
            });
        });
        describe('when `totalPages === 12` and `pageNumber` is set to `{}`', () => {
            beforeEach(() => {
                component.totalPages = 12;
                component.inputPageNumber = {} as any;
                component.ngOnChanges({
                    totalPages: new SimpleChange(undefined, 12, true),
                    inputPageNumber: new SimpleChange(undefined, {}, true)
                });
            });
            it('should be `1`', () => {
                expect(component.pageNumber).toBe(1);
            });
        });
        describe('when === 1 and `totalPages === 12` and .previousPage() is called', () => {
            beforeEach(() => {
                component.totalPages = 12;
                component.inputPageNumber = 1;
                component.previousPage();
            });
            it('should be `1`', () => {
                expect(component.pageNumber).toBe(1);
            });
        });
        describe('when === 2 and `totalPages === 12` and .previousPage() is called', () => {
            beforeEach(() => {
                component.totalPages = 12;
                component.inputPageNumber = 2;
                component.previousPage();
            });
            it('should be `1`', () => {
                expect(component.inputPageNumber).toBe(1);
            });
        });
        describe('when === 3 and `totalPages === 12` and .previousPage() is called', () => {
            beforeEach(() => {
                component.totalPages = 12;
                component.inputPageNumber = 3;
                component.previousPage();
            });
            it('should be `2`', () => {
                expect(component.inputPageNumber).toBe(2);
            });
        });
        describe('when === 12 and `totalPages === 12` and .nextPage() is called', () => {
            beforeEach(() => {
                component.totalPages = 12;
                component.inputPageNumber = 12;
                component.nextPage();
            });
            it('should be `12`', () => {
                expect(component.inputPageNumber).toBe(12);
            });
        });
        describe('when === 11 and `totalPages === 12` and .nextPage() is called', () => {
            beforeEach(() => {
                component.totalPages = 12;
                component.inputPageNumber = 11;
                component.nextPage();
            });
            it('should be `12`', () => {
                expect(component.inputPageNumber).toBe(12);
            });
        });
        describe('when === 10 and `totalPages === 12` and .nextPage() is called', () => {
            beforeEach(() => {
                component.totalPages = 12;
                component.inputPageNumber = 10;
                component.nextPage();
            });
            it('should be `11`', () => {
                expect(component.inputPageNumber).toBe(11);
            });
        });
    });

    describe('.isFirstPage', () => {
        describe('when `pageNumber` is `1`', () => {
            beforeEach(() => {
                component.totalPages = 10;
                component.inputPageNumber = 1;
            });
            it('should be `true`', () => {
                expect(component.isFirstPage).toBe(true);
            });
        });
        describe('when `pageNumber` is `2`', () => {
            beforeEach(() => {
                component.totalPages = 10;
                component.inputPageNumber = 2;
            });
            it('should be `false`', () => {
                expect(component.isFirstPage).toBe(false);
            });
        });
        describe('when `pageNumber` is the last page', () => {
            beforeEach(() => {
                component.totalPages = 10;
                component.inputPageNumber = 10;
            });
            it('should be `false`', () => {
                expect(component.isFirstPage).toBe(false);
            });
        });
        describe('when `pageNumber` is `null', () => {
            beforeEach(() => {
                component.totalPages = null;
                component.inputPageNumber = null;
            });
            it('should be `false`', () => {
                expect(component.isFirstPage).toBe(false);
            });
        });
    });
    describe('.isLastPage', () => {
        describe('when `pageNumber` is `1`', () => {
            beforeEach(() => {
                component.totalPages = 10;
                component.inputPageNumber = 1;
            });
            it('should be `false`', () => {
                expect(component.isLastPage).toBe(false);
            });
        });
        describe('when `pageNumber` is the penultimate value', () => {
            beforeEach(() => {
                component.totalPages = 10;
                component.inputPageNumber = 9;
            });
            it('should be `false`', () => {
                expect(component.isLastPage).toBe(false);
            });
        });
        describe('when `pageNumber` is the last page', () => {
            beforeEach(() => {
                component.totalPages = 10;
                component.inputPageNumber = 10;
            });
            it('should be `true`', () => {
                expect(component.isLastPage).toBe(true);
            });
        });
        describe('when `pageNumber` is `null', () => {
            beforeEach(() => {
                component.totalPages = null;
                component.inputPageNumber = null;
            });
            it('should be `false`', () => {
                expect(component.isLastPage).toBe(false);
            });
        });
    });

    describe('.visiblePages', () => {
        describe('when there are no pages', () => {
            describe('(totalPages === 0)', () => {
                beforeEach(() => {
                    component.totalPages = 0;
                });
                it('should be []', () => {
                    expect(component.visiblePages).toEqual([]);
                });
            });
            describe('(totalPages === null)', () => {
                beforeEach(() => {
                    component.totalPages = null;
                });
                it('should be []', () => {
                    expect(component.visiblePages).toEqual([]);
                });
            });
            describe('(totalPages === undefined)', () => {
                beforeEach(() => {
                    component.totalPages = undefined;
                });
                it('should be []', () => {
                    expect(component.visiblePages).toEqual([]);
                });
            });
            afterEach(() => {
                expect(component.visiblePages.length).toBe(0);
            });
        });

        describe('when there is one page', () => {
            beforeEach(() => {
                component.totalPages = 1;
            });
            it('should have a length of 1', () => {
                expect(component.visiblePages.length).toBe(1);
            });
            it('should be [1]', () => {
                expect(component.visiblePages).toEqual([1]);
            });
        });

        describe('when there are 8 pages', () => {
            beforeEach(() => {
                component.totalPages = 8;
            });
            it('should have a length of 8', () => {
                expect(component.visiblePages.length).toBe(8);
            });
            it('should be [1, 2, 3, 4, 5, 6, 7, 8]', () => {
                expect(component.visiblePages).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
            });
        });

        describe('when there are 9 pages', () => {
            beforeEach(() => {
                component.totalPages = 9;
            });
            it('should have a length of 9', () => {
                expect(component.visiblePages.length).toBe(9);
            });
            it('should be [1, 2, 3, 4, 5, 6, 7, 8, 9]', () => {
                expect(component.visiblePages).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            });
        });

        describe('when there are 10 pages', () => {
            beforeEach(() => {
                component.totalPages = 10;
            });
            describe('when pageNumber is 1', () => {
                beforeEach(() => {
                    component.inputPageNumber = 1;
                });
                it('should be [1, 2, 3, 4, 5, 6, ..., 9, 10]', () => {
                    expect(component.visiblePages).toEqual([1, 2, 3, 4, 5, 6, null, 9, 10]);
                });
            });
            describe('when pageNumber is 5', () => {
                beforeEach(() => {
                    component.inputPageNumber = 5;
                });
                it('should be [1, 2, 3, 4, 5, 6, ..., 9, 10]', () => {
                    expect(component.visiblePages).toEqual([1, 2, 3, 4, 5, 6, null, 9, 10]);
                });
            });
            describe('when pageNumber is 6', () => {
                beforeEach(() => {
                    component.inputPageNumber = 6;
                });
                it('should be [1, 2, ..., 5, 6, 7, 8, 9, 10]', () => {
                    expect(component.visiblePages).toEqual([1, 2, null, 5, 6, 7, 8, 9, 10]);
                });
            });
            describe('when pageNumber is 10', () => {
                beforeEach(() => {
                    component.inputPageNumber = 10;
                });
                it('should be [1, 2, ..., 5, 6, 7, 8, 9, 10]', () => {
                    expect(component.visiblePages).toEqual([1, 2, null, 5, 6, 7, 8, 9, 10]);
                });
            });
            afterEach(() => {
                expect(component.visiblePages.length).toBe(9);
            });
        });

        describe('when there are 16 pages', () => {
            beforeEach(() => {
                component.totalPages = 16;
            });
            describe('when pageNumber is 1', () => {
                beforeEach(() => {
                    component.inputPageNumber = 1;
                });
                it('should be [1, 2, 3, 4, 5, 6, ..., 15, 16]', () => {
                    expect(component.visiblePages).toEqual([1, 2, 3, 4, 5, 6, null, 15, 16]);
                });
            });
            describe('when pageNumber is 5', () => {
                beforeEach(() => {
                    component.inputPageNumber = 5;
                });
                it('should be [1, 2, 3, 4, 5, 6, ..., 15, 16]', () => {
                    expect(component.visiblePages).toEqual([1, 2, 3, 4, 5, 6, null, 15, 16]);
                });
            });
            describe('when pageNumber is 6', () => {
                beforeEach(() => {
                    component.inputPageNumber = 6;
                });
                it('should be [1, 2, ..., 5, 6, 7, ..., 15, 16]', () => {
                    expect(component.visiblePages).toEqual([1, 2, null, 5, 6, 7, null, 15, 16]);
                });
            });
            describe('when pageNumber is 11', () => {
                beforeEach(() => {
                    component.inputPageNumber = 11;
                });
                it('should be [1, 2, ..., 10, 11, 12, ..., 15, 16]', () => {
                    expect(component.visiblePages).toEqual([1, 2, null, 10, 11, 12, null, 15, 16]);
                });
            });
            describe('when pageNumber is 12', () => {
                beforeEach(() => {
                    component.inputPageNumber = 12;
                });
                it('should be [1, 2, ..., 11, 12, 13, 14, 15, 16]', () => {
                    expect(component.visiblePages).toEqual([1, 2, null, 11, 12, 13, 14, 15, 16]);
                });
            });
            describe('when pageNumber is 16', () => {
                beforeEach(() => {
                    component.inputPageNumber = 16;
                });
                it('should be [1, 2, ..., 11, 12, 13, 14, 15, 16]', () => {
                    expect(component.visiblePages).toEqual([1, 2, null, 11, 12, 13, 14, 15, 16]);
                });
            });
            afterEach(() => {
                expect(component.visiblePages.length).toBe(9);
            });
        });
    });
    describe('.collapsedVisiblePages', () => {
        describe('when there are no pages', () => {
            describe('(totalPages === 0)', () => {
                beforeEach(() => {
                    component.totalPages = 0;
                });
                it('should be []', () => {
                    expect(component.collapsedVisiblePages).toEqual([]);
                });
            });
            describe('(totalPages === null)', () => {
                beforeEach(() => {
                    component.totalPages = null;
                });
                it('should be []', () => {
                    expect(component.collapsedVisiblePages).toEqual([]);
                });
            });
            describe('(totalPages === undefined)', () => {
                beforeEach(() => {
                    component.totalPages = undefined;
                });
                it('should be []', () => {
                    expect(component.collapsedVisiblePages).toEqual([]);
                });
            });
            afterEach(() => {
                expect(component.collapsedVisiblePages.length).toBe(0);
            });
        });

        describe('when there is one page', () => {
            beforeEach(() => {
                component.totalPages = 1;
            });
            it('should have a length of 1', () => {
                expect(component.collapsedVisiblePages.length).toBe(1);
            });
            it('should be [1]', () => {
                expect(component.collapsedVisiblePages).toEqual([1]);
            });
        });

        describe('when there are 4 pages', () => {
            beforeEach(() => {
                component.totalPages = 4;
            });
            it('should have a length of 4', () => {
                expect(component.collapsedVisiblePages.length).toBe(4);
            });
            it('should be [1, 2, 3, 4]', () => {
                expect(component.collapsedVisiblePages).toEqual([1, 2, 3, 4]);
            });
        });

        describe('when there are 5 pages', () => {
            beforeEach(() => {
                component.totalPages = 5;
            });
            it('should have a length of 5', () => {
                expect(component.collapsedVisiblePages.length).toBe(5);
            });
            it('should be [1, 2, 3, 4, 5]', () => {
                expect(component.collapsedVisiblePages).toEqual([1, 2, 3, 4, 5]);
            });
        });

        describe('when there are 6 pages', () => {
            beforeEach(() => {
                component.totalPages = 6;
            });
            describe('when pageNumber is 1', () => {
                beforeEach(() => {
                    component.inputPageNumber = 1;
                });
                it('should be [1, 2, 3, ..., 6]', () => {
                    expect(component.collapsedVisiblePages).toEqual([1, 2, 3, null, 6]);
                });
            });
            describe('when pageNumber is 3', () => {
                beforeEach(() => {
                    component.inputPageNumber = 3;
                });
                it('should be [1, 2, 3, ..., 6]', () => {
                    expect(component.collapsedVisiblePages).toEqual([1, 2, 3, null, 6]);
                });
            });
            describe('when pageNumber is 4', () => {
                beforeEach(() => {
                    component.inputPageNumber = 4;
                });
                it('should be [1, ..., 4, 5, 6]', () => {
                    expect(component.collapsedVisiblePages).toEqual([1, null, 4, 5, 6]);
                });
            });
            describe('when pageNumber is 6', () => {
                beforeEach(() => {
                    component.inputPageNumber = 6;
                });
                it('should be [1, ..., 4, 5, 6]', () => {
                    expect(component.collapsedVisiblePages).toEqual([1, null, 4, 5, 6]);
                });
            });
            afterEach(() => {
                expect(component.collapsedVisiblePages.length).toBe(5);
            });
        });

        describe('when there are 16 pages', () => {
            beforeEach(() => {
                component.totalPages = 16;
            });
            describe('when pageNumber is 1', () => {
                beforeEach(() => {
                    component.inputPageNumber = 1;
                });
                it('should be [1, 2, 3, ..., 16]', () => {
                    expect(component.collapsedVisiblePages).toEqual([1, 2, 3, null, 16]);
                });
            });
            describe('when pageNumber is 3', () => {
                beforeEach(() => {
                    component.inputPageNumber = 3;
                });
                it('should be [1, 2, 3, ..., 16]', () => {
                    expect(component.collapsedVisiblePages).toEqual([1, 2, 3, null, 16]);
                });
            });
            describe('when pageNumber is 4', () => {
                beforeEach(() => {
                    component.inputPageNumber = 4;
                });
                it('should be [1, ..., 4, ..., 16]', () => {
                    expect(component.collapsedVisiblePages).toEqual([1, null, 4, null, 16]);
                });
            });
            describe('when pageNumber is 13', () => {
                beforeEach(() => {
                    component.inputPageNumber = 13;
                });
                it('should be [1, ..., 13, ..., 16]', () => {
                    expect(component.collapsedVisiblePages).toEqual([1, null, 13, null, 16]);
                });
            });
            describe('when pageNumber is 14', () => {
                beforeEach(() => {
                    component.inputPageNumber = 14;
                });
                it('should be [1, ..., 14, 15, 16]', () => {
                    expect(component.collapsedVisiblePages).toEqual([1, null, 14, 15, 16]);
                });
            });
            describe('when pageNumber is 16', () => {
                beforeEach(() => {
                    component.inputPageNumber = 16;
                });
                it('should be [1, ..., 14, 15, 16]', () => {
                    expect(component.collapsedVisiblePages).toEqual([1, null, 14, 15, 16]);
                });
            });
            afterEach(() => {
                expect(component.collapsedVisiblePages.length).toBe(5, 'the number of pages items returned must be exactly 5.');
            });
        });
    });
});
