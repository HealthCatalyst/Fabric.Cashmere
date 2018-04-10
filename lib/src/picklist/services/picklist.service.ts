import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { WorkTrackerService } from './work-tracker.service';
import { PicklistFilterService } from './picklist-filter.service';
import { PicklistValuesetMovingService } from './picklist-valueset-moving.service';
import { PicklistPaneComponent } from '../pane/picklist-pane.component';
import {
    FilterableSelectList, PicklistOptionsSource, IValueSetOption,
    SelectListOption, ValueSetListOption, ValueListOption, PicklistValueOptions, IValueOption } from '../picklist.model';
export type PicklistValueType = 'values' | 'valuesets' | 'both';

/**
 * Handles loading + moving items to/from list
 */
@Injectable()
export class PicklistService {
    public pane: PicklistPaneComponent;
    public optionsSource: PicklistOptionsSource;
    public valueList = new FilterableSelectList<ValueListOption>();
    public valueSetList = new FilterableSelectList<ValueSetListOption>();
    public get totalValuesCount(): number { return this.valueList.options.size + this.valueList.additionalRemoteOptions; }
    public get totalValueSetsCount(): number { return this.valueSetList.options.size + this.valueSetList.additionalRemoteOptions; }

    constructor(
        private workTracker: WorkTrackerService,
        private filterService: PicklistFilterService,
        private valuesetMovingService: PicklistValuesetMovingService) {}

    public reset(source: PicklistOptionsSource, pane: PicklistPaneComponent) {
        this.optionsSource = source;
        this.pane = pane;
        this.clearList(this.valueList);
        this.clearList(this.valueSetList);
        this.filterService.reset(this);
        this.valuesetMovingService.reset(this, this.filterService);

        if (this.optionsSource.optionsAreLocal) {
            this.updateValueList(source.options.values);
            this.updateValueSetList(source.options.valueSets);
            this.filterService.filterListLocally(this.valueList);
            this.filterService.filterListLocally(this.valueSetList);
        } else {
            const loading$ = this.workTracker.startObservable(() => this.filterService.filterOptionsRemote());
            this.showListLoadingIndicators(loading$, 'both');
        }
    }

    public updateValueList(options: IValueOption[]) {
        const listOptions = options.map(v => new ValueListOption(v, v.code));
        this.updateList(listOptions, this.valueList, this.pane.companion.valueList);
    }

    public updateValueSetList(options: IValueSetOption[]) {
        const listOptions = new Array<ValueSetListOption>();
        options.forEach(v => {
            const listOption = new ValueSetListOption(v, v.code);
            if (v.subValues && v.subValues.length > 0) {
                const subValueListOptions = v.subValues.map(sv => new ValueListOption(sv, sv.code));
                this.updateList(subValueListOptions, listOption.subValuesSelectList);
            }
            listOptions.push(listOption);
        });
        this.updateList(listOptions, this.valueSetList, this.pane.companion.valueSetList);
    }

    public addOptions(listOptions: PicklistValueOptions) {
        if (!this.optionsSource.optionsAreLocal) {
            this.preFilterOptionsForRemoteMode(listOptions.values, this.valueList);
            this.preFilterOptionsForRemoteMode(listOptions.valueSets, this.valueSetList);
        }

        listOptions.values.forEach(o => { this.valueList.options.set(o.code, o); });
        listOptions.valueSets.forEach(o => { this.valueSetList.options.set(o.code, o); });
        this.filterService.filterListLocally(this.valueList);
        this.filterService.filterListLocally(this.valueSetList);
        this.pane.selectNone();
    }

    public moveOutSelectedOptions(shouldBreakValuesets: boolean = false): PicklistValueOptions {
        let optionsToMove = new PicklistValueOptions();
        this.valueList.selectedOptions.forEach(o => {
            optionsToMove.values.set(o.code, o);
            this.valueList.options.delete(o.code);
        });

        this.valuesetMovingService.moveOutValuesets(optionsToMove, shouldBreakValuesets);

        this.filterService.filterListLocally(this.valueList);
        this.filterService.filterListLocally(this.valueSetList);
        this.pane.selectNone();
        return optionsToMove;
    }

    public preFilterOptionsForRemoteMode(
        valuesMap: Map<string, SelectListOption>,
        list: FilterableSelectList<SelectListOption>,
        searchTokens: string[] = this.filterService.searchTokens) {
            // if server is handling filtering, but I want to avoid the round trip to the server when moving options
            // I need to double check that those options belong before adding them, or risk errant option counts
            valuesMap.forEach( v => {
                if (!this.filterService.itemHasSearchTokens(list, v, searchTokens)) { valuesMap.delete(v.code); }
            });
    }

    public loadValuesForValueset(valueset: ValueSetListOption) {
        valueset.loadingValues = true;
        // todo: what to do here?
        // return this.optionsSource.getValuesForValueset(valueset.option.valueSetGuid)
        //     .then(values => {
        //         valueset.subValuesSelectList.filteredOptions.length = 0;
        //         values.forEach(v => {
        //             valueset.subValuesSelectList.filteredOptions.push(new ValueListOption(v, v.code));
        //         });
        //     }).catch(() => {
        //         console.warn('Unable to load values for valueset');
        //         valueset.showValues = false;
        //     }).then(() => {
        //         valueset.loadingValues = false;
        //     });
    }

    public clearList<T extends SelectListOption>(list: FilterableSelectList<T>) {
        list.options.clear();
        list.filteredOptions.length = 0;
        list.selectedOptions.clear();
        list.lastClickedOption = null;
        list.additionalRemoteOptions = 0;
    }

    public showListLoadingIndicators(workTracker: Observable<boolean>, type: PicklistValueType = 'both', isAppending = false) {
        if (type === 'both' || type === 'values') { this.showLoadingIndicatorForList(this.valueList, workTracker, isAppending); }
        if (type === 'both' || type === 'valuesets') { this.showLoadingIndicatorForList(this.valueSetList, workTracker, isAppending); }
    }

    private showLoadingIndicatorForList(list: FilterableSelectList<SelectListOption>, tracker: Observable<boolean>, isAppending = false) {
        if (isAppending) {
            list.appendingOptions = tracker;
        } else {
            list.loadingOptions = tracker;
        }
    }

    private updateList<T extends SelectListOption>(
        options: T[],
        list: FilterableSelectList<T>,
        companionList: FilterableSelectList<T> | null = null) {
            if (!this.optionsSource.isPaged && this.pane.shouldExcludeCompanion && companionList) {
                options = options.filter(o => !companionList.options.get(o.code));
            }
            options.forEach(o => {
                list.options.set(o.code, o);
                list.filteredOptions.push(o);
            });
            this.filterService.filterListLocally(list);
    }
}