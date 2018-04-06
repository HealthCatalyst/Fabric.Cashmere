import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs/Rx';

import { PicklistFilterService } from './picklist-filter.service';
import { FilterableSelectList, ValueSetListOption, ValueListOption, ISelectOptionGroup, IFilterComponentValueBase,
    PicklistValueType, RemoteMultiselectQueryParams, MultiselectQueryOptions, IPagedSelectOptionGroup,
    PickListOptions, ISelectOption } from '../picklist.model';
import { PicklistService } from './picklist.service';
import * as OptionGuards from '../picklist-model-guards';

@Injectable()
export class PicklistFilterRemoteService {
    public filterService: PicklistFilterService;
    public listService: PicklistService;
    public get valueList(): FilterableSelectList<ValueListOption> { return this.listService.valueList; }
    public get valueSetList(): FilterableSelectList<ValueSetListOption> { return this.listService.valueSetList; }
    public get codeIsSignificant(): boolean { return this.listService.pane.codeIsSignificant; }
    public get searchTerm(): string { return this.filterService.searchTerm; }
    public currentValuePage = 1;
    public currentValueSetPage = 1;
    private defaultItemsPerPage = 100;
    private cancelSearch = new Subject<void>();
    private get cancelSearch$(): Observable<void> { return this.cancelSearch.asObservable(); };
    private options$: Observable<IFilterComponentValueBase>;

    public reset(filterService: PicklistFilterService, listService: PicklistService) {
        this.filterService = filterService;
        this.listService = listService;
        this.currentValuePage = 1;
        this.currentValueSetPage = 1;
    }

    public filterOptionsRemote(
        type: PicklistValueType = 'both',
        shouldAppend = false,
        numberToLoadForSelectAll: number | null = null): Subscription {
            if (this.options$) { this.cancelSearch.next(); }
            const params = this.buildRemoteOptionsQueryParams(numberToLoadForSelectAll, type);
            this.options$ = this.listService.optionsSource.getOptions(params).takeUntil(this.cancelSearch$);
            if (!shouldAppend) { this.clearFilteredOptions(type); }
            this.resetPagingIfNeeded(numberToLoadForSelectAll);

            return this.options$.subscribe((options) => {
                    this.processIncomingRemoteOptions(options, type, shouldAppend);
                }, () => {
                    console.warn('unable to filter options') // todo: need a better way to handle this
                    this.clearListsIfNeeded('both', false);
                    return Observable.of({});
                }, () => {
                    // this.options$ = null;
                });
    }

    private processIncomingRemoteOptions(options: IFilterComponentValueBase, type: PicklistValueType = 'both', shouldAppend = false) {
        this.clearListsIfNeeded(type, shouldAppend);
        if (OptionGuards.isPaged(options)) {
            if (type === 'values' || type === 'both') { this.processPagedValues(options); }
            if (type === 'valuesets' || type === 'both') { this.processPagedValueSets(options); }
        } else {
            const optionGroup = options as ISelectOptionGroup;
            this.listService.updateValueList(optionGroup.selectOptions);
            this.listService.updateValueSetList(optionGroup.compatibleValueSets);
            this.valueList.additionalRemoteOptions = 0;
            this.valueSetList.additionalRemoteOptions = 0;
        }
    }

    private processPagedValues(options: IPagedSelectOptionGroup) {
        this.listService.updateValueList(options.pagedValues.values);
        if (options.pagedValues.values.length > 0) {
            this.valueList.additionalRemoteOptions = options.pagedValues.totalItems - this.valueList.options.size;
        }
    }

    private processPagedValueSets(options: IFilterComponentValueBase) {
        let valueSets = new Array<ISelectOption>(), totalItems = 0;
        if (OptionGuards.isPagedWithValueSets(options)) {
            valueSets = options.pagedValueSets.values;
            totalItems = options.pagedValueSets.totalItems;
        }
        this.listService.updateValueSetList(valueSets);
        this.valueSetList.additionalRemoteOptions = totalItems - this.valueSetList.options.size;
    }

    private buildRemoteOptionsQueryParams(
        numberToLoadForSelectAll: number | null = null,
        type: PicklistValueType): RemoteMultiselectQueryParams {

        const params = new RemoteMultiselectQueryParams();
        if (type === 'values' || type === 'both') {
            params.valueQueryOptions = this.buildQueryOptions(this.listService.pane.companion.valueList);
            params.valuePagerSettings = this.buildPagerSettings(this.currentValuePage, numberToLoadForSelectAll);
        }

        if (type === 'valuesets' || type === 'both') {
            params.valueSetQueryOptions = this.buildQueryOptions(this.listService.pane.companion.valueSetList);
            params.valueSetPagerSettings = this.buildPagerSettings(this.currentValueSetPage, numberToLoadForSelectAll);
        }

        return params;
    }

    private buildQueryOptions(list: FilterableSelectList<any>): MultiselectQueryOptions {
        const queryOptions = new MultiselectQueryOptions();
        queryOptions.search = this.searchTerm;
        queryOptions.shouldSearchCodes = this.codeIsSignificant;
        queryOptions.sorting = { field: this.codeIsSignificant ? 'code' : 'title'};
        queryOptions.alreadySelected = this.getAlreadySelectedOptionIds(list);
        return queryOptions;
    }

    private buildPagerSettings(currentPage: number, numberToLoadForSelectAll: number | null) {
        const pagerSettings = { currentPage: 1, itemsPerPage: this.defaultItemsPerPage };
        pagerSettings.currentPage = numberToLoadForSelectAll ? 1 : currentPage;
        pagerSettings.itemsPerPage = numberToLoadForSelectAll || pagerSettings.itemsPerPage;
        return pagerSettings;
    }

    private getAlreadySelectedOptionIds(list: FilterableSelectList<any>): string[] {
        if (!this.listService.pane.shouldExcludeCompanion) { return []; }
        const codes = new Array<string>();
        list.options.forEach(e => codes.push(e.code));
        return codes;
    }

    private resetPagingIfNeeded(numberToLoadForSelectAll: number | null = null) {
        if (numberToLoadForSelectAll) {
            this.currentValuePage = Math.floor(numberToLoadForSelectAll / this.defaultItemsPerPage);
        }
    }

    private clearListsIfNeeded(type: PicklistValueType, shouldAppend: boolean) {
        if (!shouldAppend) {
            if (type === 'both' || type === 'values') { this.listService.clearList(this.valueList); }
            if (type === 'both' || type === 'valuesets') { this.listService.clearList(this.valueSetList); }
        }
    }

    private clearFilteredOptions(type: PicklistValueType) {
        if (type === 'both' || type === 'values') { this.valueList.filteredOptions.length = 0; }
        if (type === 'both' || type === 'valuesets') { this.valueSetList.filteredOptions.length = 0; }
    }
}