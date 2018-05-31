import {from, Observable, of, Subject, Subscription} from 'rxjs';

import {takeUntil} from 'rxjs/operators';
import {Injectable} from '@angular/core';

import {PicklistFilterService} from './picklist-filter.service';
import {PicklistStateService} from './picklist-state.service';
import {FilterableSelectList, ValueListOption, ValueSetListOption} from '../pane/picklist-pane.model';
import {
    IPagedCollection,
    IPicklistRemoteQueryResponse,
    IValueOption,
    IValueSetOption,
    PicklistRemoteQueryOptions,
    PicklistValueType
} from '../picklist.model';

@Injectable()
export class PicklistFilterRemoteService {
    public filterService?: PicklistFilterService;
    public get valueList(): FilterableSelectList<ValueListOption> {
        return this.stateService.valueList;
    }
    public get valueSetList(): FilterableSelectList<ValueSetListOption> {
        return this.stateService.valueSetList;
    }
    public get searchTerm(): string {
        return this.filterService ? this.filterService.searchTerm : '';
    }
    public currentValuePage = 1;
    public currentValueSetPage = 1;
    private cancelSearch = new Subject<void>();
    private get cancelSearch$(): Observable<void> {
        return this.cancelSearch.asObservable();
    }
    private options$: Observable<IPicklistRemoteQueryResponse> = from([]);

    public constructor(private stateService: PicklistStateService) {}

    public reset(filterService: PicklistFilterService) {
        this.filterService = filterService;
        this.currentValuePage = 1;
        this.currentValueSetPage = 1;
    }

    public filter(type: PicklistValueType = 'both', shouldAppend = false, selectAllCount: number | null = null): Subscription {
        if (!this.stateService.optionsSource.getOptions) {
            console.warn('Remote query callback not provided for this picklist.');
            return from([]).subscribe();
        }

        if (this.options$) {
            this.cancelSearch.next();
        }
        const params = this.buildRemoteQueryParams(type, selectAllCount);
        if (!shouldAppend) {
            this.clearFilteredOptions(type);
        }
        this.resetPagingForSelectAllIfNeeded(selectAllCount);
        this.options$ = this.stateService.optionsSource.getOptions(params).pipe(takeUntil(this.cancelSearch$));

        return this.options$.subscribe(
            options => {
                this.processIncomingRemoteOptions(options, type, shouldAppend);
            },
            () => {
                console.warn('Unable to filter options');
                this.clearLists('both');
                return of({});
            },
            () => {
                this.options$ = of({});
            }
        );
    }

    private processIncomingRemoteOptions(options: IPicklistRemoteQueryResponse, type: PicklistValueType = 'both', shouldAppend = false) {
        if (!shouldAppend) {
            this.clearLists(type);
        }

        if (this.stateService.optionsSource.isPaged) {
            if (options.pagedValues) {
                this.processPagedValues(options.pagedValues);
            }
            if (options.pagedValueSets) {
                this.processPagedValueSets(options.pagedValueSets);
            }
        } else {
            if (options.values) {
                this.stateService.updateValueList(options.values);
            }
            if (options.valueSets) {
                this.stateService.updateValueSetList(options.valueSets);
            }
            this.valueList.additionalRemoteOptions = 0;
            this.valueSetList.additionalRemoteOptions = 0;
        }
    }

    private processPagedValues(pagedValues: IPagedCollection<IValueOption>) {
        this.stateService.updateValueList(pagedValues.values);
        this.valueList.additionalRemoteOptions = pagedValues.totalItems - this.valueList.options.size;
    }

    private processPagedValueSets(pagedValueSets: IPagedCollection<IValueSetOption>) {
        this.stateService.updateValueSetList(pagedValueSets.values);
        this.valueSetList.additionalRemoteOptions = pagedValueSets.totalItems - this.valueSetList.options.size;
    }

    private buildRemoteQueryParams(type: PicklistValueType, selectAllCount: number | null = null): PicklistRemoteQueryOptions {
        const params = new PicklistRemoteQueryOptions(this.stateService.picklist, this.searchTerm, type);
        if (type === 'values' || type === 'both') {
            params.valuePageSettings = this.buildPageSettings(this.currentValuePage, selectAllCount);
        }

        if (type === 'valuesets' || type === 'both') {
            params.valueSetPageSettings = this.buildPageSettings(this.currentValueSetPage, selectAllCount);
        }
        return params;
    }

    private buildPageSettings(currentPage: number, selectAllCount: number | null) {
        const pagerSettings = {currentPage: 1, itemsPerPage: this.stateService.optionsSource.pageSize};
        pagerSettings.currentPage = selectAllCount ? 1 : currentPage;
        pagerSettings.itemsPerPage = selectAllCount || pagerSettings.itemsPerPage;
        return pagerSettings;
    }

    private resetPagingForSelectAllIfNeeded(selectAllCount: number | null = null) {
        if (selectAllCount) {
            this.currentValuePage = Math.floor(selectAllCount / this.stateService.optionsSource.pageSize);
        }
    }

    private clearLists(type: PicklistValueType) {
        if (type === 'both' || type === 'values') {
            this.stateService.clearList(this.valueList);
        }
        if (type === 'both' || type === 'valuesets') {
            this.stateService.clearList(this.valueSetList);
        }
    }

    private clearFilteredOptions(type: PicklistValueType) {
        if (type === 'both' || type === 'values') {
            this.valueList.filteredOptions.length = 0;
        }
        if (type === 'both' || type === 'valuesets') {
            this.valueSetList.filteredOptions.length = 0;
        }
    }
}
