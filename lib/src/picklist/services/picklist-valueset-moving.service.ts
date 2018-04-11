import { Injectable } from '@angular/core';

import { PicklistFilterService } from './picklist-filter.service';
import { PicklistService } from './picklist.service';
import { PicklistPaneComponent } from '../pane/picklist-pane.component';
import { FilterableSelectList, ValueSetListOption, ValueListOption, PicklistValueOptions } from '../pane/picklist-pane.model';

@Injectable()
export class PicklistValuesetMovingService {
    public listService: PicklistService;
    public filterService: PicklistFilterService;
    public get valueList(): FilterableSelectList<ValueListOption> { return this.listService.valueList; }
    public get valueSetList(): FilterableSelectList<ValueSetListOption> { return this.listService.valueSetList; }

    public reset(listService: PicklistService, filterService: PicklistFilterService) {
        this.listService = listService;
        this.filterService = filterService;
    }

    public moveOutValuesets(optionsToMove: PicklistValueOptions, shouldBreakValuesets: boolean = false) {
        this.valueSetList.selectedOptions.forEach(v => {
            v.showValues = false;
            optionsToMove.valueSets.set(v.code, v);
            this.valueSetList.options.delete(v.code);
        });

        this.valueSetList.filteredOptions.forEach(valueset => {
            if (valueset.selected || valueset.subValuesSelectList.selectedOptions.size < 1) { return; }

            if (shouldBreakValuesets) {
                this.breakValueset(valueset, optionsToMove);
            } else {
                this.moveSubValues(valueset.subValuesSelectList.selectedOptions, this.listService.pane);
            }
        });
    }

    private breakValueset(valueset: ValueSetListOption, optionsToMove: PicklistValueOptions) {
        valueset.showValues = false;
        optionsToMove.valueSets.set(valueset.code, valueset);
        this.valueSetList.options.delete(valueset.code);

        const unselectedSubValues = new Map<string, ValueListOption>();
        valueset.subValuesSelectList.filteredOptions
            .filter(o => !o.selected)
            .forEach(o => { unselectedSubValues.set(o.code, new ValueListOption(o.option, o.code)); });

        this.moveSubValues(unselectedSubValues, this.listService.pane.companion);
    }

    private moveSubValues(valuesMap: Map<string, ValueListOption>, source: PicklistPaneComponent) {
        this.removeValuesFromPane(valuesMap, source);
        valuesMap.forEach(o => { source.companion.valueList.options.set(o.code, new ValueListOption(o.option, o.code)); });
    }

    /**
     * Handles complex logic for when one pane is paged, and we want to keep the "x of y" counts accurate without a round trip to the server
     */
    private removeValuesFromPane(valuesMap: Map<string, ValueListOption>, pane: PicklistPaneComponent) {
        if (pane.isPaged) { // don't bother trying to remove values or decrement count for options that are already filtered out
            this.listService.preFilterOptionsForRemoteMode(valuesMap, pane.valueList, pane.filterService.searchTokens);
        }

        valuesMap.forEach(v => {
            const optionDeleted = pane.valueList.options.delete(v.code);
            const optionAlreadyInCompanionList = pane.companion.valueList.options.has(v.code);
            if (!optionDeleted && pane.isPaged && !optionAlreadyInCompanionList) { pane.valueList.additionalRemoteOptions--; }
        });
    }
}