import {Injectable} from '@angular/core';
import {FilterableSelectList, isSubList, SelectListOption, ValueListOption, ValueSetListOption} from '../pane/picklist-pane.model';
import {PicklistOldService} from './picklist-old.service';

@Injectable()
export class PicklistActionService {
    public get valueList(): FilterableSelectList<ValueListOption> {
        return this.listService.valueList;
    }
    public get valueSetList(): FilterableSelectList<ValueSetListOption> {
        return this.listService.valueSetList;
    }
    public constructor(private listService: PicklistOldService) {}

    public onItemClicked<T extends SelectListOption>(event: MouseEvent, index: number, list: FilterableSelectList<T>, item: T) {
        if (event.shiftKey && list.lastClickedOption && !(item.code === list.lastClickedOption.code)) {
            this.shiftClick(index, list, item, list.lastClickedOption);
        } else if (event.ctrlKey) {
            this.ctrlClick(list, item);
        } else {
            // regular click
            this.selectNone();
            this.selectItem(list, item);
            list.lastClickedOption = item;
        }
    }

    public onItemDoubleClicked<T extends SelectListOption>(event: MouseEvent, list: FilterableSelectList<T>, item: T) {
        this.selectNone();
        this.selectItem(list, item);
    }

    public onValuesetCaretClicked(event: MouseEvent, valueset: ValueSetListOption) {
        if (!valueset.showValues && valueset.subValuesSelectList.filteredOptions.length === 0) {
            this.listService.loadValuesForValueset(valueset);
        }
        valueset.showValues = !valueset.showValues;
    }

    public selectAll() {
        this.valueSetList.filteredOptions.forEach(v => {
            this.clearListSelection(v.subValuesSelectList);
        }); // deselect sublist items
        this.selectAllInList(this.valueList);
        this.selectAllInList(this.valueSetList);
    }

    public selectNone() {
        this.valueSetList.filteredOptions.forEach(v => {
            this.clearListSelection(v.subValuesSelectList);
        });
        this.clearListSelection(this.valueList);
        this.clearListSelection(this.valueSetList);
    }

    public selectAllInList<T extends SelectListOption>(list: FilterableSelectList<T>) {
        if (!list.isActive) {
            return;
        }

        list.selectedOptions.clear();
        list.lastClickedOption = null;

        list.filteredOptions.forEach(item => {
            item.selected = true;
            list.selectedOptions.set(item.code, item);
        });
    }

    private clearListSelection<T extends SelectListOption>(list: FilterableSelectList<T>) {
        list.selectedOptions.clear();
        list.lastClickedOption = null;

        list.filteredOptions.forEach(item => {
            item.selected = false;
        });
    }

    private shiftClick<T extends SelectListOption>(index: number, list: FilterableSelectList<T>, item: T, lastClickedItem: T) {
        const lastIndex = list.filteredOptions.indexOf(lastClickedItem);
        const largeIndex = Math.max(index, lastIndex);
        const smallIndex = Math.min(index, lastIndex);

        const formerLastClicked = list.lastClickedOption;
        this.selectNone();
        list.lastClickedOption = formerLastClicked;

        for (let i = smallIndex; i <= largeIndex; i++) {
            this.selectItem(list, list.filteredOptions[i]);
        }
    }

    private ctrlClick<T extends SelectListOption>(list: FilterableSelectList<T>, item: T) {
        // if ctrl clicking a sub value of a valueset that is selected (such that all subvalues appear selected)
        if (isSubList(list) && list.parentValueSet.selected) {
            this.selectAllInList<ValueListOption>(list);
            this.deselectItem(this.valueSetList, list.parentValueSet);
            this.deselectItem<ValueListOption>(list, item);
        } else {
            this.toggleItemSelection(list, item);
        }

        list.lastClickedOption = item;
    }

    private deselectItem<T extends SelectListOption>(list: FilterableSelectList<T>, item: T) {
        item.selected = false;
        list.selectedOptions.delete(item.code);
    }

    private selectItem<T extends SelectListOption>(list: FilterableSelectList<T>, item: T) {
        item.selected = true;
        list.selectedOptions.set(item.code, item);
    }

    private toggleItemSelection<T extends SelectListOption>(list: FilterableSelectList<T>, item: T) {
        if (item.selected) {
            this.deselectItem(list, item);
        } else {
            this.selectItem(list, item);
        }
    }
}
