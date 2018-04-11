import { Injectable, NgModuleFactoryLoader } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs/Rx';

import { PicklistFilterService } from './picklist-filter.service';
import { FilterableSelectList, ValueSetListOption, ValueListOption } from '../pane/picklist-pane.model';
import {
    PicklistValueType,
    IValueOption,
    IValueSetOption,
    IPageSettings,
    IPagedCollection,
    IPicklistRemoteQueryResponse,
    PicklistRemoteQueryOptions } from '../picklist.model'
import { PicklistService } from './picklist.service';

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
    private options$: Observable<IPicklistRemoteQueryResponse> = Observable.from([]);

    public reset(filterService: PicklistFilterService, listService: PicklistService) {
        this.filterService = filterService;
        this.listService = listService;
        this.currentValuePage = 1;
        this.currentValueSetPage = 1;
    }

    public filterOptionsRemote(type: PicklistValueType = 'both', shouldAppend = false, selectAllCount: number | null = null): Subscription {
            if (!this.listService.paneSource.getOptions) {
                console.warn('Remote query callback not provided for this picklist.')
                return Observable.from([]).subscribe();
            }

            if (this.options$) { this.cancelSearch.next(); }
            const params = this.buildRemoteQueryParams(type, selectAllCount, );
            this.clearFilteredOptionsIfNeeded(type, shouldAppend);
            this.resetPagingForSelectAllIfNeeded(selectAllCount);
            this.options$ = this.listService.paneSource.getOptions(params).takeUntil(this.cancelSearch$);

            return this.options$.subscribe((options) => {
                    this.processIncomingRemoteOptions(options, type, shouldAppend);
                }, () => {
                    console.warn('Unable to filter options')
                    this.clearListsIfNeeded('both', false);
                    return Observable.of({});
                }, () => {
                    this.options$ = Observable.from([])
                });
    }

    private processIncomingRemoteOptions(options: IPicklistRemoteQueryResponse, type: PicklistValueType = 'both', shouldAppend = false) {
        this.clearListsIfNeeded(type, shouldAppend);

        if (this.listService.paneSource.isPaged) {
            if (options.pagedValues) { this.processPagedValues(options.pagedValues); }
            if (options.pagedValueSets) { this.processPagedValueSets(options.pagedValueSets); }
        } else {
            if (options.values) { this.listService.updateValueList(options.values); }
            if (options.valueSets) { this.listService.updateValueSetList(options.valueSets); }
            this.valueList.additionalRemoteOptions = 0;
            this.valueSetList.additionalRemoteOptions = 0;
        }
    }

    private processPagedValues(pagedValues: IPagedCollection<IValueOption>) {
        this.listService.updateValueList(pagedValues.values);
        this.valueList.additionalRemoteOptions = pagedValues.totalItems - this.valueList.options.size;
    }

    private processPagedValueSets(pagedValueSets: IPagedCollection<IValueSetOption>) {
        this.listService.updateValueSetList(pagedValueSets.values);
        this.valueSetList.additionalRemoteOptions = pagedValueSets.totalItems - this.valueSetList.options.size;
    }

    private buildRemoteQueryParams(type: PicklistValueType, selectAllCount: number | null = null, ): PicklistRemoteQueryOptions {
        const params = new PicklistRemoteQueryOptions(this.listService.picklist, this.searchTerm, type);
        if (type === 'values' || type === 'both') {
            params.valuePageSettings = this.buildPagerSettings(this.currentValuePage, selectAllCount);
        }

        if (type === 'valuesets' || type === 'both') {
            params.valueSetPageSettings = this.buildPagerSettings(this.currentValueSetPage, selectAllCount);
        }

        return params;
    }

    private buildPagerSettings(currentPage: number, selectAllCount: number | null) {
        const pagerSettings = { currentPage: 1, itemsPerPage: this.defaultItemsPerPage };
        pagerSettings.currentPage = selectAllCount ? 1 : currentPage;
        pagerSettings.itemsPerPage = selectAllCount || pagerSettings.itemsPerPage;
        return pagerSettings;
    }

    private resetPagingForSelectAllIfNeeded(selectAllCount: number | null = null) {
        if (selectAllCount) {
            this.currentValuePage = Math.floor(selectAllCount / this.defaultItemsPerPage);
        }
    }

    private clearListsIfNeeded(type: PicklistValueType, shouldAppend: boolean) {
        if (!shouldAppend) {
            if (type === 'both' || type === 'values') { this.listService.clearList(this.valueList); }
            if (type === 'both' || type === 'valuesets') { this.listService.clearList(this.valueSetList); }
        }
    }

    private clearFilteredOptionsIfNeeded(type: PicklistValueType, shouldAppend: boolean) {
        if (!shouldAppend) {
            if (type === 'both' || type === 'values') { this.valueList.filteredOptions.length = 0; }
            if (type === 'both' || type === 'valuesets') { this.valueSetList.filteredOptions.length = 0; }
        }
    }
}