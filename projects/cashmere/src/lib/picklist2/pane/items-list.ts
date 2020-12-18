import { PickPaneComponent } from './pick-pane.component';
import { PickOption } from '../pick.types';
import { PickSelectionModel } from './selection-model';
import { isDefined, isFunction, isObject, newId } from '../value-utils';

/** Keys may be a unique string or an HcOption itself. HcOption will be used as a key when the developer provides pregrouped options. */
type ChildrenByGroupKeyMap = Map<string | PickOption, Array<PickOption>>;

/** Helps manage the state of the list */
export class ItemsList {
    constructor(private _pickPane: PickPaneComponent, private _selectionModel: PickSelectionModel) {}

    get itemsShownCountStr(): string { return this._itemsShownCountStr; }
    private _itemsShownCountStr = '';
    
    get itemsTotalCountStr(): string { return this._itemsTotalCountStr; }
    private _itemsTotalCountStr = '';
    
    get itemsTotalCount(): number { return this._itemsTotalCount; }
    private _itemsTotalCount = 0;

    /** containts all items in the list, including parent items */
    get items(): Array<PickOption> { return this._items; }
    private _items = new Array<PickOption>();

    get filteredItems(): Array<PickOption> { return this._filteredItems; }
    private _filteredItems = new Array<PickOption>();

    private _optionGroups = new Array<PickOption>();
    private readonly DEFAULT_GROUP_KEY = 'HC_PICK_PANE_DEFAULT_GROUP_KEY';
    private _markedIndex = -1;

    /** Represents the "focused" item */
    get markedIndex(): number { return this._markedIndex; }
    /** Return true if some item in the list should have focus. -1 means nothing is focused. */
    get hasMarkedItem(): boolean { return this._markedIndex !== -1; }
    /** The highlighted options in this list */
    get selectedItems(): Array<PickOption> { return this._selectionModel.value; }
    /** The HcOption that currently has focus */
    get markedItem(): PickOption { return this._filteredItems[this._markedIndex]; }
    /** The last option in the list to be highlighted */
    get lastSelectedItem(): PickOption | null {
        let i = this.selectedItems.length - 1;
        for (; i >= 0; i--) {
            let item = this.selectedItems[i];
            if (!item.disabled) {
                return item;
            }
        }
        return null;
    }

    /** Remove all options from the list */
    clearList() {
        this._items = [];
        this._filteredItems = [];
        this._optionGroups = [];
    }

    /** Converts an array of raw values into HcOptions and set them on the list */
    setItems(items: any[]) {
        const hcOptionItems = items.map((item, index) => this._createHcOption(item, index));
        this._optionGroups = this._groupItems(hcOptionItems, this._pickPane.groupBy);
        this._items = this.sortAndIndex(this._optionGroups);
        this._filteredItems = [...this._items];
        this.updateCounts();
    }

    /** Reset the indexes on each HcOption */
    reIndex() {
        this._items.forEach((o, index) => o.index = index);
    }

    /** Highlight a given option in the list */
    select(item: PickOption) {
        if (item.selected) { return; }
        if (item.children) {
            const availableChildren = item.children.filter(i => this._filteredItems.some(fi => fi.htmlId === i.htmlId && !i.disabled));
            availableChildren.forEach(child => this._selectionModel.select(child));
        } else {
            this._selectionModel.select(item);
        }
    }

    /** Remove highlight from a given option in the list */
    unselect(item: PickOption) {
        if (!item.selected) { return; }
        this._selectionModel.unselect(item);
    }

    /**
     * Find the option in this list for a given value
     */
    findOption(value: any): PickOption | undefined {
        let findBy: (item: PickOption) => boolean;
        if (this._pickPane.compareWith) {
            findBy = item => this._pickPane.compareWith(item.value, value)
        } else if (this._pickPane.bindValue) {
            findBy = item => !item.children && this.resolveNested(item.value, this._pickPane.bindValue) === value
        } else {
            findBy = item => item.value === value ||
                !item.children && !!item.label && item.label === this.resolveNested(value, this._pickPane.bindLabel)
        }
        return this._items.filter(i => !i.isParent).find(item => findBy(item));
    }

    /** Adds an existing HcOption to the list. */
    addOption(option: PickOption) {
        if (option.isParent) { throw new Error(`Trying to add an option that has children: ${option}`); }
        if (!option.parent) { throw new Error(`Trying to add an option that does not have a parent: ${option}`); }
        const parentKey = option.parent.groupKey;
        const parentGroup = this._optionGroups.find(pg => pg.groupKey === parentKey);
        if (parentGroup) {
            parentGroup?.children?.push(option);
            option.parent = parentGroup;
        } else {
            const newParentGroup = new PickOption({
                groupKey: parentKey,
                label: option.parent.label,
                children: [option],
                parent: undefined,
                disabled: option.parent.disabled,
                htmlId: newId(),
                isClosed: option.parent.isClosed,
                value: option.parent.value
            });
            option.parent = newParentGroup;
            this._optionGroups.push(newParentGroup);
        }

        this._items = this.sortAndIndex(this._optionGroups);
    }

    /** Removes an existing HcOption from the list */
    removeOption(option: PickOption) {
        if (!option.parent) { throw new Error(`Trying to remove an option that does not have a parent: ${option}`); }
        this._deleteItem(option, this._items);

        const parentGroup = this._optionGroups.find(pg => pg.groupKey === option?.parent?.groupKey);
        this._deleteItem(option, parentGroup?.children || []);
        if (parentGroup?.children?.length === 0) {
            this._deleteItem(parentGroup, this._items);
            this._deleteItem(parentGroup, this._optionGroups);
        }

        this._items = this.sortAndIndex(this._optionGroups);
    }

    /** Create a new HcOption and add it to the list from a given raw value. Also returns the newly created option */
    addNewOption(item: any): PickOption {
        const newOption = this._createHcOption(item);
        this._groupItems([newOption], this._pickPane.groupBy);
        this.addOption(newOption);
        return newOption;
    }

    /** Maps the given raw value into an HcOption. */
    _createHcOption(item: any, index?: number): PickOption {
        // $hcOptionLabel and $hcOptionValue will be used in the case of <hc-pick-option> components
        const label = isDefined(item.$hcOptionLabel) ? item.$hcOptionLabel : this.resolveNested(item, this._pickPane.bindLabel);
        const value = isDefined(item.$hcOptionValue) ? item.$hcOptionValue : item;
        index = Number.isFinite(index) ? index : this._items.length;
        return new PickOption({
            index: index,
            label: isDefined(label) ? label.toString() : '',
            value: value,
            disabled: item.disabled,
            htmlId: `${this._pickPane.paneId}-${index}`,
        });
    }

    _addNewCustomOptionToTop(newOption: PickOption) {
        this._filteredItems = [newOption, ...this._filteredItems];
    }

    private _deleteItem(item: PickOption, list: Array<PickOption>) {
        const findIndexFunc = (i: PickOption) => i.index === item.index;
        let indexToRemove = list.findIndex(findIndexFunc);
        if (indexToRemove === -1) { console.error(`Couldn't find the item to remove: ${item}`); return; }
        list.splice(indexToRemove, 1);
    }

    /** Create item groups. If we're not grouping, everything just gets placed in one default group. */
    private _groupItems(items: Array<PickOption>, groupBy: string | Function | undefined): Array<PickOption> {
        const childOptsGroupedByKey = this._groupBy(items, groupBy);
        return this._createParentHcOptions(childOptsGroupedByKey);
    }

    /** If a sort function was provided, sort at the child and group level*/
    private _sortOptions(groups: Array<PickOption>) {
        if (!this._pickPane.sortFn) { return; }
        groups.forEach(g => { g.children?.sort(this._pickPane.sortFn); });
        groups.sort(this._pickPane.sortFn);

        // if default group exists, sort it at the bottom
        const defaultGroupIndex = groups.findIndex(g => g.groupKey === this.DEFAULT_GROUP_KEY);
        if (defaultGroupIndex === -1) { return; }
        const defaultGroup = groups.splice(defaultGroupIndex, 1);
        groups.push(...defaultGroup);
    }

    /**
     * Removed highlight from all items in the list.
     * @param keepDisabled if true, don't deselect any options that are currently disabled
    */
    clearSelected(keepDisabled = false) {
        this._selectionModel.clear(keepDisabled);
        this._items.forEach(item => {
            item.selected = keepDisabled && item.selected && item.disabled;
            item.marked = false;
        });
    }

    /** Highlight all the items in the list */
    selectAll() {
        this._selectionModel.selectAll(this._filteredItems, this._pickPane.canSelectGroup);
    }

    /** Find an item in the list by its label */
    findByLabel(term: string): PickOption | undefined{
        term = term.toLocaleLowerCase();
        return this.filteredItems.find(item => {
            const label = item.label?.toLocaleLowerCase();
            return label?.substr(0, term.length) === term;
        });
    }

    /** Filter the options in the list with the given search term */
    filter(term: string): void {
        if (!term) { this.resetFilteredItems(); return; }
        this._filteredItems = [];
        term = this._pickPane.searchFn ? term : term.toLocaleLowerCase();
        const searchFn = this._pickPane.searchFn || this._defaultSearchFn;

        this._optionGroups.forEach(pg => {
            const matchedItems = new Array<any>();
            pg.children?.forEach(item => {
                const searchItem = this._pickPane.searchFn ? item.value : item;
                if (searchFn(term, searchItem)) {
                    matchedItems.push(item);
                }
            });
            if (matchedItems.length > 0) {
                this._filteredItems.push(...[pg, ...matchedItems]);
            }
        })
        this.updateCounts();
    }

    /** Unfilter the list */
    resetFilteredItems() {
        if (this._filteredItems.length === this._items.length) { this.updateCounts(); return; }
        this._filteredItems = [...this._items];
        this.updateCounts();
    }

    /** Wipe out selection state and marked state, then mark the first selectable option */
    resetListSelectionState() {
        this.clearSelected();
        this.markFirst();
    }

    /** Remove focus from any of the options */
    unmark() {
        this._markedIndex = -1;
    }

    /** Move focus up or down in the list */
    markNextItem(stepIsDown: boolean) {
        this._stepToItem(stepIsDown ? 1 : -1);
    }

    /** Focus the given item in the list */
    markItem(item: PickOption) {
        this._markedIndex = this._filteredItems.indexOf(item);
    }

    /** Focus on the last selected item, or the first item in the list */
    markSelectedOrDefault() {
        if (this._filteredItems.length === 0) { return; }
        const lastMarkedIndex = this._getLastMarkedIndex();
        if (lastMarkedIndex > -1) {
            this._markedIndex = lastMarkedIndex;
        } else {
            this.markFirst();
        }
    }

    /** Unmarks what ever is currently marked and then marks the first selectable item */
    markFirst() {
        this.unmark();
        this.markNextItem(true);
    }

    /** Obtain a nested value from a given object. It could be a direct property, or a nested property */
    resolveNested(option: any, key: string): any {
        if (!isObject(option)) { return option; }
        if (!key || key.indexOf('.') === -1) {
            return option[key];
        } else {
            let keys: string[] = key.split('.');
            let value = option;
            for (let i = 0, len = keys.length; i < len; ++i) {
                if (value == null) {
                    return null;
                }
                value = value[keys[i]];
            }
            return value;
        }
    }

    /** Update the 'Showing x of y' counts */
    updateCounts() {
        this._itemsShownCountStr = this.filteredItems.filter(i => !i.isParent).length.toLocaleString();
        this._itemsTotalCount = this.items.filter(i => !i.isParent).length;
        this._itemsTotalCountStr = this._itemsTotalCount.toLocaleString();
    }

    /** If picklist is not configured with a search function, use this one. */
    private _defaultSearchFn(searchTerm: string, opt: PickOption): boolean {
        const label = opt.label?.toLocaleLowerCase() || "";
        return label.indexOf(searchTerm) > -1
    }

    /** Get index of an item a given number of steps above or below the current focus item */
    private _getNextItemIndex(steps: number): number {
        if (steps > 0) {
            return (this._markedIndex === this._filteredItems.length - 1) ? 0 : (this._markedIndex + 1);
        }
        return (this._markedIndex <= 0) ? (this._filteredItems.length - 1) : (this._markedIndex - 1);
    }

    /** Move focus a certain number of steps above or below the current focused item */
    private _stepToItem(steps: number) {
        if (this._filteredItems.every(x => x.disabled)) { this.unmark(); return; }
        this._markedIndex = this._getNextItemIndex(steps);
        if (this.markedItem.disabled) { this._stepToItem(steps); }
    }

    /** Find the index of the item in the list was marked most recently */
    private _getLastMarkedIndex(): number {
        if (this._markedIndex > -1 && this.markedItem === undefined) { return -1; }

        const selectedIndex = this._filteredItems.indexOf(this.lastSelectedItem as PickOption);
        if (this.lastSelectedItem && selectedIndex < 0) { return -1; }
        return Math.max(this.markedIndex, selectedIndex);
    }

    /** Group the items in the list as configured */
    private _groupBy(items: Array<PickOption>, groupBy: string | Function | undefined): ChildrenByGroupKeyMap {
        const groups: ChildrenByGroupKeyMap = new Map<string | PickOption, Array<PickOption>>();
        if (items.length === 0) { return groups; }
        
        // if not asked to group, everything goes into a hidden default group
        if (!groupBy) { groups.set(this.DEFAULT_GROUP_KEY, items); return groups; }

        // Check if items are already grouped by given key.
        if (Array.isArray(items[0].value?.[<string>groupBy])) {
            for (const item of items) {
                const children = (item.value?.[<string>groupBy] || []).map((x, index) => this._createHcOption(x, index));
                groups.set(item, children);
            }
            return groups;
        }

        // Generate groups by given key or grouper function
        const isFnKey = isFunction(this._pickPane.groupBy);
        const keyFn = (item: PickOption) => {
            let key = isFnKey ? (<Function>groupBy)(item.value) : item.value?.[<string>groupBy];
            return isDefined(key) ? key : this.DEFAULT_GROUP_KEY;
        };

        // Group items by key.
        for (const item of items) {
            let key = keyFn(item);
            const group = groups.get(key);
            if (group) {
                group.push(item);
            } else {
                groups.set(key, [item]);
            }
        }
        return groups;
    }

    /** Creates parent HcOption as needed */
    private _createParentHcOptions(groups: ChildrenByGroupKeyMap): Array<PickOption> {
        const isGroupByFn = isFunction(this._pickPane.groupBy);
        const parentOptions = new Array<PickOption>();
        for (const key of Array.from(groups.keys())) {
            const isObjectKey = isObject(key);
            const parent = this.createOptionGroup(key, isObjectKey);
            const keyForGroupVal = isGroupByFn ? this._pickPane.bindLabel : <string>this._pickPane.groupBy;
            const groupValue = this._pickPane.groupValue || (() => {
                if (isObjectKey) { return (<PickOption>key).value; }
                return { [keyForGroupVal]: this.getStringForKey(key) };
            });
            const children = groups.get(key)?.map(x => {
                x.parent = parent;
                x.children = undefined;
                return x;
            });
            parent.children = children;
            parent.value = groupValue(key, children?.map(x => x.value) || []);
            parentOptions.push(parent)
        }
        return parentOptions;
    }

    private createOptionGroup(key: string | PickOption, isObjectKey: boolean = false): PickOption {
        return new PickOption({
            groupKey: key,
            label: isObjectKey ? '' : this.getStringForKey(key),
            children: undefined,
            parent: undefined,
            disabled: !this._pickPane.canSelectGroup,
            htmlId: newId(),
            isClosed: !!this._pickPane.groupBy && this._pickPane.canCloseGroup && this._pickPane.closeGroupsByDefault
        });
    }

    private getStringForKey(key: any) {
        if (key === this.DEFAULT_GROUP_KEY) {
            return this._pickPane.orphanItemsGroupName;
        } else {
            return key.toString();
        }
    }

    private sortAndIndex(groups: Array<PickOption>): Array<PickOption> {
        const flattenedSortedItems = new Array<PickOption>()
        this._sortOptions(groups);

        groups.forEach(group => {
            let i = flattenedSortedItems.length;
            group.index = i++;
            flattenedSortedItems.push(group)
            group.children?.forEach(childItem => {
                childItem.index = i++;
                flattenedSortedItems.push(childItem);
            });
        });

        return flattenedSortedItems;
    }
}
