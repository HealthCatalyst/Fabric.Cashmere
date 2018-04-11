import { TestBed, getTestBed } from '@angular/core/testing';
import { PicklistService } from './picklist.service';
import { PicklistFilterService } from './picklist-filter.service';
import { PicklistFilterRemoteService } from './picklist-filter-remote.service';
import { PicklistValuesetMovingService } from './picklist-valueset-moving.service';
import { WorkTrackerService } from './work-tracker.service';
import { ValueListOption, FilterableSelectList } from '../pane/picklist-pane.model';

let service: PicklistFilterService;

function testSetup() {
    TestBed.configureTestingModule({
        providers: [
            { provide: WorkTrackerService, useValue: {} },
            PicklistFilterRemoteService,
            PicklistValuesetMovingService,
            PicklistFilterService,
            PicklistService
        ]
    });

    service = getTestBed().get(PicklistFilterService);
    const listService = getTestBed().get(PicklistService);
    listService.pane = { codeIsSignificant: true };
    service.reset(listService);
}

describe('Picklist',
    () => {
        beforeEach(() => {
            testSetup();
            this.listItem = new ValueListOption({ code: 'testing1212', title: 'This is not a test zy' }, 'testing1212');
            this.listItem2 = new ValueListOption({ code: 'zyzyzy', title: 'zyzyzy' }, 'zyzyzy');
            this.list = new FilterableSelectList<ValueListOption>();
            this.list.options.set(this.listItem.code, this.listItem);
            this.list.options.set(this.listItem2.code, this.listItem2);
            this.list.optionFieldsToSearch = ['code', 'title'];
        });

        describe('filterListLocally()',
            () => {
                it('empties filteredOptions array if it finds nothing',
                    () => {
                        service.searchTerm = 'nope';
                        service.filterListLocally(this.list);
                        expect(this.list.filteredOptions.length).toBe(0);
                    });

                it('keeps options that have the search term tokens in the title',
                    () => {
                        service.searchTerm = 'zy';
                        service.filterListLocally(this.list);
                        expect(this.list.filteredOptions.length).toBe(2);
                    });

                it('keeps options that have the search term tokens in the code',
                    () => {
                        service.searchTerm = '1212';
                        service.filterListLocally(this.list);
                        expect(this.list.filteredOptions.length).toBe(1);
                    });

                it('will not keep options when the token are only in the code, but code is not included in optionFieldsToSearch',
                    () => {
                        service.searchTerm = '1212';
                        this.list.optionFieldsToSearch = ['title'];
                        service.filterListLocally(this.list);
                        expect(this.list.filteredOptions.length).toBe(0);
                    });

                describe('accepts multiple tokens, must find them all',
                    () => {
                        it('if it finds some but not all, you\'ll get nothing back',
                            () => {
                                service.searchTerm = 'testing not nope';
                                service.filterListLocally(this.list);
                                expect(this.list.filteredOptions.length).toBe(0);
                            });

                        it('if it finds none of the tokens, you\'ll get nothing back',
                            () => {
                                service.searchTerm = 'nope nah sorry';
                                service.filterListLocally(this.list);
                                expect(this.list.filteredOptions.length).toBe(0);
                            });

                        it('if it finds all of the tokens, you\'ll get something back',
                            () => {
                                service.searchTerm = 'testing this is a test 1212';
                                service.filterListLocally(this.list);
                                expect(this.list.filteredOptions.length).toBe(1);
                            });
                    });
            });
    }
);