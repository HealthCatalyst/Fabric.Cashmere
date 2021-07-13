import {Injectable} from '@angular/core';

import {PicklistFilterService} from './picklist-filter.service';
import {PicklistPaneComponent} from '../pane/picklist-pane.component';
import {FilterableSelectList, PicklistValueOptions, ValueListOption, ValueSetListOption} from '../pane/picklist-pane.model';
import {PicklistStateService} from './picklist-state.service';
import { IValueOption } from 'dist/cashmere/public_api';

@Injectable()
export class PicklistValuesetMovingService {
    public get valueList(): FilterableSelectList<ValueListOption> {
        return this.stateService.valueList;
    }
    public get valueSetList(): FilterableSelectList<ValueSetListOption> {
        return this.stateService.valueSetList;
    }

    public constructor(private filterService: PicklistFilterService, private stateService: PicklistStateService) {}

    public moveOutValuesets(optionsToMove: PicklistValueOptions, pane: PicklistPaneComponent, shouldBreakValuesets = false): void {
        this.valueSetList.selectedOptions.forEach(v => {
            v.showValues = false;
            optionsToMove.valueSets.set(v.code, v);
            this.valueSetList.options.delete(v.code);
        });

        this.valueSetList.filteredOptions.forEach(valueset => {
            if (valueset.selected || valueset.subValuesSelectList.selectedOptions.size < 1) {
                return;
            }

            if (shouldBreakValuesets) {
                this.breakValueset(valueset, optionsToMove, pane.companion);
            } else {
                this.moveSubValues(valueset.subValuesSelectList.selectedOptions, pane);
            }
        });
    }

    private breakValueset(valueset: ValueSetListOption, optionsToMove: PicklistValueOptions, companionPane: PicklistPaneComponent | null) {
        valueset.showValues = false;
        optionsToMove.valueSets.set(valueset.code, valueset);
        this.valueSetList.options.delete(valueset.code);

        const unselectedSubValues = new Map<string, ValueListOption>();
        valueset.subValuesSelectList.filteredOptions
            .filter(o => !o.selected)
            .forEach(o => {
                unselectedSubValues.set(o.code, new ValueListOption(o.option as IValueOption, o.code));
            });

        if (!companionPane) {
            return;
        }
        this.moveSubValues(unselectedSubValues, companionPane);
    }

    private moveSubValues(valuesMap: Map<string, ValueListOption>, sourcePane: PicklistPaneComponent) {
        this.removeValuesFromPane(valuesMap, sourcePane);
        if (!sourcePane.companion) {
            return;
        }
        valuesMap.forEach(o => {
            sourcePane.companion?.valueList.options.set(o.code, new ValueListOption(o.option as IValueOption, o.code));
        });
    }

    /**
     * Handles complex logic for when one pane is paged, and we want to keep the "x of y" counts accurate without a round trip to the server
     */
    private removeValuesFromPane(valuesMap: Map<string, ValueListOption>, pane: PicklistPaneComponent) {
        if (pane.isPaged) {
            // don't bother trying to remove values or decrement count for options that are already filtered out
            this.filterService.preFilterOptionsForRemoteMode(valuesMap, pane.valueList);
        }

        valuesMap.forEach(v => {
            const optionDeleted = pane.valueList.options.delete(v.code);
            const optionAlreadyInCompanionList = pane.companion ? pane.companion.valueList.options.has(v.code) : false;
            if (!optionDeleted && pane.isPaged && !optionAlreadyInCompanionList) {
                pane.valueList.additionalRemoteOptions--;
            }
        });
    }
}
