import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { FilterableSelectList, SelectListOption, ValueSetListOption, ValueListOption, PicklistValueType } from '../picklist.model';
import { WorkTrackerService } from './work-tracker.service';
import { PicklistService } from './picklist.service';
import { PicklistFilterRemoteService } from './picklist-filter-remote.service';

@Injectable()
export class PicklistFilterService {
    public listService: PicklistService;
    public get valueList(): FilterableSelectList<ValueListOption> { return this.listService.valueList; }
    public get valueSetList(): FilterableSelectList<ValueSetListOption> { return this.listService.valueSetList; }
    public get codeIsSignificant(): boolean { return this.listService.pane.codeIsSignificant; }
    public searchTerm = '';
    public get searchTokens(): string[] { return this.searchTerm.toLocaleLowerCase().replace(/\s+/g, ' ').split(' '); }
    public valueListFilterFields = ['title'];
    public valueSetListFilterFields = ['title'];

    constructor(private workTracker: WorkTrackerService, private remoteFilterService: PicklistFilterRemoteService) {}

    public reset(listService: PicklistService) {
        this.remoteFilterService.reset(this, listService);
        this.listService = listService;
        this.searchTerm = '';
        this.setUpLists();
    }

    public runFilter(searchTerm: string) {
        this.searchTerm = searchTerm;
        if (!this.listService.optionsSource.isPaged) {
            this.filterListLocally(this.valueList);
            this.filterListLocally(this.valueSetList);
        } else {
            this.remoteFilterService.currentValuePage = 1;
            this.remoteFilterService.currentValueSetPage = 1;
            const workTracker = this.workTracker.startObservable(() => this.remoteFilterService.filterOptionsRemote());
            this.listService.showListLoadingIndicators(workTracker, 'both');
        }
        this.listService.pane.selectNone();
    }

    public filterListLocally<T extends SelectListOption>(list: FilterableSelectList<T>) {
        list.filteredOptions = [];
        list.options.forEach(item => {
            if (this.itemHasSearchTokens(list, item, this.searchTokens)) {
                list.filteredOptions.push(item);
            }
        });
        list.filteredOptions.sort(list.sortFunc);
    }

    public filterOptionsRemote(
        type: PicklistValueType = 'both',
        shouldAppend = false,
        numberToLoadForSelectAll: number | null = null): Subscription {
            return this.remoteFilterService.filterOptionsRemote(type, shouldAppend, numberToLoadForSelectAll);
    }

    public itemHasSearchTokens<T extends SelectListOption>(list: FilterableSelectList<T>, item: T, searchTokens: string[]) {
        const valuesToSearchIn = list.optionFieldsToSearch
            .map(fieldName => item.option[fieldName])
            .filter(val => !!val);
        return searchTokens.every(token => valuesToSearchIn.some(value => value.toLocaleLowerCase().indexOf(token) > -1));
    }

    public loadMore(type: PicklistValueType = 'both', autoLoadMore = false) {
        if (type === 'both' || type === 'values') { this.remoteFilterService.currentValuePage++; }
        if (type === 'both' || type === 'valuesets') { this.remoteFilterService.currentValueSetPage++; }
        const loading$ = this.workTracker.startObservable(() => this.filterOptionsRemote(type, true));
        this.listService.showListLoadingIndicators(loading$, type, !autoLoadMore);
    }

    public loadForSelectAll(numberToLoad: number): Observable<boolean> {
        const loading$ = this.workTracker.startObservable(() => this.filterOptionsRemote('values', false, numberToLoad));
        this.listService.showListLoadingIndicators(loading$, 'values');
        return loading$;
    }

    public reloadIfEmpty() {
        const valuesNeedReload = this.valueList.options.size === 0 && this.valueList.additionalRemoteOptions > 0;
        const valueSetsNeedReload = this.valueSetList.options.size === 0 && this.valueSetList.additionalRemoteOptions > 0;
        if (valuesNeedReload || valueSetsNeedReload) {
            this.runFilter(this.searchTerm);
        }
    }

    private setUpLists() {
        // specify the filterable fields for each list
        this.valueList.optionFieldsToSearch = this.valueListFilterFields.slice();
        this.valueSetList.optionFieldsToSearch = this.valueSetListFilterFields.slice();
        if (this.codeIsSignificant) {
            this.valueList.optionFieldsToSearch.push('code');
        }

        // specify the sort functions
        this.valueList.sortFunc = this.localeSorter((x) => x.code);
        this.valueSetList.sortFunc = this.localeSorter((x) => x.code);
    }

    private localeSorter(getProp: (x) => string): (a, b) => number {
        return (a, b) => getProp(a).localeCompare(getProp(b));
    }
}