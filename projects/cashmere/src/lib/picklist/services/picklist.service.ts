import {Injectable} from '@angular/core';

import {WorkTrackerService} from '../../shared/work-tracker.service';
import {PicklistFilterService} from './picklist-filter.service';
import {PicklistValuesetMovingService} from './picklist-valueset-moving.service';
import {PicklistFilterLocalService} from './picklist-filter-local.service';
import {PicklistStateService} from './picklist-state.service';
import {PicklistPaneComponent} from '../pane/picklist-pane.component';
import {PicklistOptionsSource, PicklistSettings} from '../picklist.model';
import {FilterableSelectList, PicklistValueOptions, ValueListOption, ValueSetListOption} from '../pane/picklist-pane.model';

/**
 * Handles loading + moving items to/from list
 */
@Injectable()
export class PicklistService {
    public get pane(): PicklistPaneComponent {
        return this.stateService.pane;
    }
    public get picklist(): PicklistSettings {
        return this.stateService.picklist;
    }
    public get optionsSource(): PicklistOptionsSource {
        return this.stateService.optionsSource;
    }
    public get valueList(): FilterableSelectList<ValueListOption> {
        return this.stateService.valueList;
    }
    public get valueSetList(): FilterableSelectList<ValueSetListOption> {
        return this.stateService.valueSetList;
    }
    public get totalValuesCount(): number {
        return this.valueList.options.size + this.valueList.additionalRemoteOptions;
    }
    public get totalValueSetsCount(): number {
        return this.valueSetList.options.size + this.valueSetList.additionalRemoteOptions;
    }

    constructor(
        private workTracker: WorkTrackerService,
        private filterService: PicklistFilterService,
        private localFilterService: PicklistFilterLocalService,
        private valuesetMovingService: PicklistValuesetMovingService,
        private stateService: PicklistStateService
    ) {}

    public reset(settings: PicklistSettings, optionsSource: PicklistOptionsSource, pane: PicklistPaneComponent) {
        this.stateService.reset(settings, optionsSource, pane);
        this.filterService.reset();

        if (this.optionsSource.optionsAreLocal()) {
            this.stateService.updateValueList(this.optionsSource.values);
            this.stateService.updateValueSetList(this.optionsSource.valueSets);
            this.localFilterService.filter(this.valueList, this.filterService.searchTokens);
            this.localFilterService.filter(this.valueSetList, this.filterService.searchTokens);
        } else {
            const loading$ = this.workTracker.startObservable(() => this.filterService.filterOptionsRemote());
            this.valueList.loadingOptions = loading$;
            this.valueSetList.loadingOptions = loading$;
        }
    }

    public addOptions(listOptions: PicklistValueOptions) {
        if (!this.optionsSource.optionsAreLocal()) {
            this.filterService.preFilterOptionsForRemoteMode(listOptions.values, this.valueList);
            this.filterService.preFilterOptionsForRemoteMode(listOptions.valueSets, this.valueSetList);
        }

        listOptions.values.forEach(o => {
            this.valueList.options.set(o.code, o);
        });
        listOptions.valueSets.forEach(o => {
            this.valueSetList.options.set(o.code, o);
        });
        this.localFilterService.filter(this.valueList, this.filterService.searchTokens);
        this.localFilterService.filter(this.valueSetList, this.filterService.searchTokens);
        this.pane.selectNone();
    }

    public moveOutSelectedOptions(shouldBreakValuesets: boolean = false): PicklistValueOptions {
        let optionsToMove = new PicklistValueOptions();
        this.valueList.selectedOptions.forEach(o => {
            optionsToMove.values.set(o.code, o);
            this.valueList.options.delete(o.code);
        });

        this.valuesetMovingService.moveOutValuesets(optionsToMove, this.pane, shouldBreakValuesets);

        this.localFilterService.filter(this.valueList, this.filterService.searchTokens);
        this.localFilterService.filter(this.valueSetList, this.filterService.searchTokens);
        this.pane.selectNone();
        return optionsToMove;
    }

    public loadValuesForValueset(valueset: ValueSetListOption) {
        valueset.loadingValues = true;
        if (!this.optionsSource.getValuesForValueset) {
            return;
        }
        this.optionsSource.getValuesForValueset(valueset.option.code).subscribe(
            values => {
                valueset.subValuesSelectList.filteredOptions.length = 0;
                values.forEach(v => {
                    valueset.subValuesSelectList.filteredOptions.push(new ValueListOption(v, v.code));
                });
            },
            () => {
                console.warn('Unable to load values for valueset');
                valueset.showValues = false;
            },
            () => {
                valueset.loadingValues = false;
            }
        );
    }
}
