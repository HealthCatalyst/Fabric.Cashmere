import {Injectable} from '@angular/core';

import {PicklistOptionsSource, IValueOption, IValueSetOption, PicklistSettings} from '../picklist.model';
import {FilterableSelectList, SelectListOption, ValueSetListOption, ValueListOption} from '../pane/picklist-pane.model';
import {PicklistPaneComponent} from '../pane/picklist-pane.component';
import {PicklistFilterLocalService} from './picklist-filter-local.service';

@Injectable()
export class PicklistStateService {
    public pane: PicklistPaneComponent;
    public picklist = new PicklistSettings();
    public optionsSource = new PicklistOptionsSource();
    public valueList = new FilterableSelectList<ValueListOption>();
    public valueSetList = new FilterableSelectList<ValueSetListOption>();

    public constructor(private localFilterService: PicklistFilterLocalService) {}

    public reset(settings: PicklistSettings, optionsSource: PicklistOptionsSource, pane: PicklistPaneComponent) {
        this.picklist = settings;
        this.pane = pane;
        this.optionsSource = optionsSource;
        this.clearList(this.valueList);
        this.clearList(this.valueSetList);
    }

    public updateValueList(options: IValueOption[], searchTokens: string[] = []) {
        const listOptions = options.map(v => new ValueListOption(v, v.code));
        const companionList = this.pane.companion ? this.pane.companion.valueList : null;
        this.valueList.codeIsSignificant = this.pane.codeIsSignificant;
        this.updateList(listOptions, this.valueList, companionList, searchTokens);
    }

    public updateValueSetList(options: IValueSetOption[], searchTokens: string[] = []) {
        const listOptions = new Array<ValueSetListOption>();
        const companionList = this.pane.companion ? this.pane.companion.valueSetList : null;
        options.forEach(v => {
            const listOption = new ValueSetListOption(v, v.code);
            if (v.subValues && v.subValues.length > 0) {
                const subValueListOptions = v.subValues.map((sv: IValueOption) => new ValueListOption(sv, sv.code));
                this.updateList(subValueListOptions, listOption.subValuesSelectList, null, searchTokens);
            }
            listOptions.push(listOption);
        });
        this.updateList(listOptions, this.valueSetList, companionList, searchTokens);
    }

    public clearList<T extends SelectListOption>(list: FilterableSelectList<T>) {
        list.options.clear();
        list.filteredOptions.length = 0;
        list.selectedOptions.clear();
        list.lastClickedOption = null;
        list.additionalRemoteOptions = 0;
    }

    private updateList<T extends SelectListOption>(
        options: T[],
        list: FilterableSelectList<T>,
        companionList: FilterableSelectList<T> | null = null,
        searchTokens: string[] = []
    ) {
        if (!this.optionsSource.isPaged && this.pane.shouldExcludeCompanion && companionList) {
            options = options.filter(o => !companionList.options.get(o.code));
        }
        options.forEach(o => {
            list.options.set(o.code, o);
            list.filteredOptions.push(o);
        });
        this.localFilterService.filter(list, searchTokens);
    }
}
