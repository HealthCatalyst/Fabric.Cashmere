import {Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

import {FilterableSelectList, SelectListOption, ValueListOption, ValueSetListOption} from '../pane/picklist-pane.model';
import {PicklistValueType} from '../picklist-old.model';
import {WorkTrackerService} from '../../shared/work-tracker.service';
import {PicklistFilterRemoteService} from './picklist-filter-remote.service';
import {PicklistFilterLocalService} from './picklist-filter-local.service';
import {PicklistStateService} from './picklist-state.service';

@Injectable()
export class PicklistFilterService {
    public get valueList(): FilterableSelectList<ValueListOption> {
        return this.stateService.valueList;
    }
    public get valueSetList(): FilterableSelectList<ValueSetListOption> {
        return this.stateService.valueSetList;
    }
    public get searchTokens(): string[] {
        return this.searchTerm
            .toLocaleLowerCase()
            .replace(/\s+/g, ' ')
            .split(' ');
    }
    public searchTerm = '';

    constructor(
        private workTracker: WorkTrackerService,
        private stateService: PicklistStateService,
        private remoteFilterService: PicklistFilterRemoteService,
        private localFilterService: PicklistFilterLocalService
    ) {}

    public reset() {
        this.remoteFilterService.reset(this);
        this.searchTerm = '';
    }

    public runFilter(searchTerm: string) {
        this.searchTerm = searchTerm;
        if (!this.stateService.optionsSource.isPaged) {
            this.localFilterService.filter(this.valueList, this.searchTokens);
            this.localFilterService.filter(this.valueSetList, this.searchTokens);
        } else {
            this.remoteFilterService.currentValuePage = 1;
            this.remoteFilterService.currentValueSetPage = 1;
            const workTracker = this.workTracker.startObservable(() => this.remoteFilterService.filter());
            this.showListLoadingIndicators(workTracker, 'both');
        }
    }

    public filterOptionsRemote(type: PicklistValueType = 'both', shouldAppend = false, selectAllCount: number | null = null): Subscription {
        return this.remoteFilterService.filter(type, shouldAppend, selectAllCount);
    }

    public loadMore(type: PicklistValueType = 'both', autoLoadMore = false) {
        if (type === 'both' || type === 'values') {
            this.remoteFilterService.currentValuePage++;
        }
        if (type === 'both' || type === 'valuesets') {
            this.remoteFilterService.currentValueSetPage++;
        }
        const loading$ = this.workTracker.startObservable(() => this.filterOptionsRemote(type, true));
        this.showListLoadingIndicators(loading$, type, !autoLoadMore);
    }

    public loadForSelectAll(numberToLoad: number): Observable<boolean> {
        const loading$ = this.workTracker.startObservable(() => this.filterOptionsRemote('values', false, numberToLoad));
        this.showListLoadingIndicators(loading$, 'values');
        return loading$;
    }

    public reloadIfEmpty() {
        const valuesNeedReload = this.valueList.options.size === 0 && this.valueList.additionalRemoteOptions > 0;
        const valueSetsNeedReload = this.valueSetList.options.size === 0 && this.valueSetList.additionalRemoteOptions > 0;
        if (valuesNeedReload || valueSetsNeedReload) {
            this.runFilter(this.searchTerm);
        }
    }

    public preFilterOptionsForRemoteMode(valuesMap: Map<string, SelectListOption>, list: FilterableSelectList<SelectListOption>) {
        // if server is handling filtering, but I want to avoid the round trip to the server when moving options
        // I need to double check that those options belong before adding them, or risk errant option counts
        valuesMap.forEach(v => {
            if (!this.localFilterService.itemHasSearchTokens(list, v, this.searchTokens)) {
                valuesMap.delete(v.code);
            }
        });
    }

    public showListLoadingIndicators(workTracker: Observable<boolean>, type: PicklistValueType = 'both', isAppending = false) {
        if (type === 'both' || type === 'values') {
            this.showLoadingIndicatorForList(this.valueList, workTracker, isAppending);
        }
        if (type === 'both' || type === 'valuesets') {
            this.showLoadingIndicatorForList(this.valueSetList, workTracker, isAppending);
        }
    }

    private showLoadingIndicatorForList(list: FilterableSelectList<SelectListOption>, tracker: Observable<boolean>, isAppending = false) {
        if (isAppending) {
            list.appendingOptions = tracker;
        } else {
            list.loadingOptions = tracker;
        }
    }
}
