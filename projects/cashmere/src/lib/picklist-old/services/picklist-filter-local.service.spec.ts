import {PicklistFilterLocalService} from './picklist-filter-local.service';
import {FilterableSelectList, ValueListOption} from '../pane/picklist-pane.model';

let service = new PicklistFilterLocalService();

describe('Picklist', () => {
    let listItem = new ValueListOption({code: 'testing1212', title: 'This is not a test zy'}, 'testing1212');
    let listItem2 = new ValueListOption({code: 'zyzyzy', title: 'zyzyzy'}, 'zyzyzy');
    let list = new FilterableSelectList<ValueListOption>();

    beforeEach(() => {
        list.codeIsSignificant = true;
        list.options.set(listItem.code, listItem);
        list.options.set(listItem2.code, listItem2);
    });

    describe('filter()', () => {
        it('empties filteredOptions array if it finds nothing', () => {
            const searchTerms = ['nope'];
            service.filter(list, searchTerms);
            expect(list.filteredOptions.length).toBe(0);
        });

        it('keeps options that have the search term tokens in the title', () => {
            const searchTerms = ['zy'];
            service.filter(list, searchTerms);
            expect(list.filteredOptions.length).toBe(2);
        });

        it('keeps options that have the search term tokens in the code', () => {
            const searchTerms = ['1212'];
            service.filter(list, searchTerms);
            expect(list.filteredOptions.length).toBe(1);
        });

        it('will not keep options when the token are only in the code, but code is not marked as significant', () => {
            const searchTerms = ['1212'];
            list.codeIsSignificant = false;
            service.filter(list, searchTerms);
            expect(list.filteredOptions.length).toBe(0);
        });

        describe('accepts multiple tokens, must find them all', () => {
            it("if it finds some but not all, you'll get nothing back", () => {
                const searchTerms = ['testing', 'not', 'nope'];
                service.filter(list, searchTerms);
                expect(list.filteredOptions.length).toBe(0);
            });

            it("if it finds none of the tokens, you'll get nothing back", () => {
                const searchTerms = ['nope', 'nah', 'sorry'];
                service.filter(list, searchTerms);
                expect(list.filteredOptions.length).toBe(0);
            });

            it("if it finds all of the tokens, you'll get something back", () => {
                const searchTerms = ['testing', 'this', 'is', 'a', 'test', '1212'];
                service.filter(list, searchTerms);
                expect(list.filteredOptions.length).toBe(1);
            });
        });
    });
});
