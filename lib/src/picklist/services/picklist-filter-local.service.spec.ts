import { TestBed, getTestBed } from '@angular/core/testing';
import { PicklistFilterLocalService } from './picklist-filter-local.service';
import { ValueListOption, FilterableSelectList } from '../pane/picklist-pane.model';

let service = new PicklistFilterLocalService();

describe('Picklist',
    () => {
        beforeEach(() => {
            this.listItem = new ValueListOption({ code: 'testing1212', title: 'This is not a test zy' }, 'testing1212');
            this.listItem2 = new ValueListOption({ code: 'zyzyzy', title: 'zyzyzy' }, 'zyzyzy');
            this.list = new FilterableSelectList<ValueListOption>();
            this.list.codeIsSignificant = true;
            this.list.options.set(this.listItem.code, this.listItem);
            this.list.options.set(this.listItem2.code, this.listItem2);
        });

        describe('filter()',
            () => {
                it('empties filteredOptions array if it finds nothing',
                    () => {
                        const searchTerms = ['nope'];
                        service.filter(this.list, searchTerms);
                        expect(this.list.filteredOptions.length).toBe(0);
                    });

                it('keeps options that have the search term tokens in the title',
                    () => {
                        const searchTerms = ['zy'];
                        service.filter(this.list, searchTerms);
                        expect(this.list.filteredOptions.length).toBe(2);
                    });

                it('keeps options that have the search term tokens in the code',
                    () => {
                        const searchTerms = ['1212'];
                        service.filter(this.list, searchTerms);
                        expect(this.list.filteredOptions.length).toBe(1);
                    });

                it('will not keep options when the token are only in the code, but code is not marked as significant',
                    () => {
                        const searchTerms = ['1212'];
                        this.list.codeIsSignificant = false;
                        service.filter(this.list, searchTerms);
                        expect(this.list.filteredOptions.length).toBe(0);
                    });

                describe('accepts multiple tokens, must find them all',
                    () => {
                        it('if it finds some but not all, you\'ll get nothing back',
                            () => {
                                const searchTerms = ['testing', 'not', 'nope'];
                                service.filter(this.list, searchTerms);
                                expect(this.list.filteredOptions.length).toBe(0);
                            });

                        it('if it finds none of the tokens, you\'ll get nothing back',
                            () => {
                                const searchTerms = ['nope', 'nah', 'sorry'];
                                service.filter(this.list, searchTerms);
                                expect(this.list.filteredOptions.length).toBe(0);
                            });

                        it('if it finds all of the tokens, you\'ll get something back',
                            () => {
                                const searchTerms = ['testing', 'this', 'is', 'a', 'test', '1212'];
                                service.filter(this.list, searchTerms);
                                expect(this.list.filteredOptions.length).toBe(1);
                            });
                    });
            });
    }
);