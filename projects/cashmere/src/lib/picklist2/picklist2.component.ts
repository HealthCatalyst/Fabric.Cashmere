import {
    Component,
    OnDestroy,
    AfterViewInit,
    forwardRef,
    ChangeDetectorRef,
    Input,
    Output,
    EventEmitter,
    ContentChild,
    TemplateRef,
    ViewEncapsulation,
    HostBinding,
    ViewChild,
    ElementRef,
    ChangeDetectionStrategy,
    ContentChildren,
    QueryList,
    Attribute
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntil, startWith } from 'rxjs/operators';
import { Subject, merge } from 'rxjs';

import {
    PickOptionTemplateDirective,
    PickPaneToolbarTemplateDirective,
    PickPaneFooterTemplateDirective,
    PickOptgroupTemplateDirective,
    PickCustomItemTemplateDirective,
    PickPaneHeaderRightTemplateDirective,
    PickPaneHeaderLeftTemplateDirective
} from './pick-templates.directive';
import { isDefined, isFunction, isObject } from './value-utils';
import { PickOptionComponent } from './pick-option.component';
import { PickPaneComponent } from './pane/pick-pane.component';
import { Picklist2Service } from './picklist2.service';
import { SortFn, GroupValueFn, CompareWithFn, AddCustomItemFn, SearchFn } from './pick.types';

/** Control for selecting multiple items from a very large set of options. `<hc-picklist2>` */
@Component({
    selector: 'hc-picklist2',
    templateUrl: './picklist2.component.html',
    styleUrls: ['./picklist2.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => Picklist2Component),
        multi: true
    }, Picklist2Service],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Picklist2Component implements OnDestroy, AfterViewInit, ControlValueAccessor {
    /** If options are objects, this matches the object property to use for display in the list.
     * Can use nested properties. Example: `'property.nestedProperty'`. *Defaults to `'label'`.* */
    @Input() bindLabel: string;
    /** If options are objects, this matches the object property to use for the selected model.
     * Can use nested properties. Example: `'property.nestedProperty'`. *By default, binds to whole object.* */
    @Input() bindValue: string;
    /** When addCustomItem is true, this changes the default message for adding a new item. *Defaults to `"Add custom option."`* */
    @Input() addCustomItemText = 'Add custom option.';
    /** True if user should be able to add custom items. The button to add an option will appear when a search term is not exactly matched.
     * Can optionally provide a function that will generate a value for the custom option based on the given search term. *Defaults to false.*
     * If a function is provided, must follow this signature: `((term: string) => any | Promise<any>)`. The function is passed the search term
     * string and returns a value that should match the type of options in the picklist. */
    @Input() addCustomItem: boolean | AddCustomItemFn = false;
    /** Group items by property or function expression. *Grouping is off by default.* */
    @Input() groupBy: string | Function;
    /** Function expression to provide group value: `(key: string | object, children: any[]) => string | object`. Same as described in ng-select component. https://ng-select.github.io/ng-select#/grouping */
    @Input() groupValue: GroupValueFn;
    /** True if group should be clickable. Clicking the group will select all its children. *Defaults to false.* */
    @Input() canSelectGroup = false;
    /** True if group can be closed to hide its children options. *Defaults to false.* */
    @Input() canCloseGroup = false;
    /** True if groups should be closed to begin with. Must have `canCloseGroup` set to true to use. *Defaults to true.* */
    @Input() closeGroupsByDefault = true;
    /** Items that cannot be grouped are placed in an orphan group.
     * This property sets a name for that group. *Defaults to `"Other Items"`* */
    @Input() orphanItemsGroupName = 'Other Items';
    /** True to enable virtual scroll for better performance when rendering a lot of data. *Defaults to false.* */
    @Input() virtualScroll = false;
    /** When using virtual scroll, determines how many extra items on top and bottom should be rendered outside the viewport. *Defaults to 4.* */
    @Input() bufferAmount = 4;
    /** Provide custom trackBy function for better DOM reusage by Angular's *ngFor in the items list. */
    @Input() trackByFn = null;
    /** Function used to sort the groups and items in the list: `(a: PickOption, b: PickOption) => number`. If the function result is negative,
     * a is sorted before b. If it's positive, b is sorted before a. If the result is 0, no changes are done with the sort order of the two values. */
    @Input() sortFn: SortFn;
    /** If true, items can be viewed but not highlighted or moved from pane to pane. Same as adding `disabled` attribute. *Defaults to false.* */
    @Input() readonly = false;
    /** True if search bar should be present. *Defaults to true.* */
    @Input() hasSearch = true;
    /** Placeholder for the search input. *Defaults to 'Search'.* */
    @Input() searchPlaceholder = 'Search';
    /** A custom search function: `(term: string, item: any) => boolean`. *Default function does a simple scan for entire given term within the options label.* */
    @Input() searchFn: SearchFn;
    /** True if items should be filtered while user is still typing. *Defaults to true.* */
    @Input() searchWhileComposing = true;
    /** Number of characters required for search to be fired. Only applies when using `externalSearchSubject`. *Defaults to 0.* */
    @Input() externalSearchTermMinLength = 0;
    /** A subject through which an updated search term will be sent. Use for advanced searching functionality, like searching over http. */
    @Input() externalSearchSubject: Subject<string>;
    /** For the left pane, force the 'Showing x of y' message to be the given number. Useful when using external search and you want
     * to display the total number of items available on the server rather than just those currently available in the component. */
    @Input() externalTotalOptionCount: number;
    /** Message shown in each pane when empty. *Defaults to 'No options to show.'* */
    @Input() notFoundText = 'No options to show.';
    /** True when pane left pane should show as loading. *Defaults to false.* */
    @Input() leftPaneLoading = false;
    /** True when right left pane should show as loading. *Defaults to false.* */
    @Input() rightPaneLoading = false;
    /** True if each pane should have a header. *Defaults to true.* */
    @Input() hasHeader = true;
    /** True if each pane should have a toolbar section. *Defaults to true.* */
    @Input() hasToolbar = true;
    /** True if each pane should have a footer section. *Defaults to true.* */
    @Input() hasFooter = true;
    /** Set a limit to the number of selected items.
     * Note: This will not prevent more than limit from being added to the model outside the component. *No limit by default.* */
    @Input() maxSelectedItems: number;
    /** Total height of the picklist control in pixels, percentage, rem, etc. *Defaults to '400px'.* */
    @Input() height = '400px';

    /** An array of options for the picklist. Options can be of any type, and the array can be an observable stream. Can alternatively use
     * `<hc-pick-option>` components to pass in options. */
    @Input() get items() { return this._items };
    set items(value: any[]) {
        this._itemsAreUsed = true;
        this._items = value;
    }
    /** A function to compare the option values with the selected values. `(a: any, b: any) => boolean;`
     * The first argument is a value from an option. The second is a value from the selection (model).
     * A boolean should be returned.
     * Same as used by https://angular.io/api/forms/SelectControlValueAccessor */
    @Input() get compareWith() { return this._compareWith; }
    set compareWith(fn: CompareWithFn) {
        if (!isFunction(fn)) {
            throw Error('`compareWith` must be a function.');
        }
        this._compareWith = fn;
    }

    /** Fires when model is updated. Sends an array of the currently selected values. */
    @Output('change') changeEvent = new EventEmitter<Array<string|Object|undefined>>();
    /** Fires when options are added. Sends an array of the values being added. */
    @Output('add') addEvent = new EventEmitter<Array<string|Object|undefined>>();
    /** Fires when options are removed. Sends an array of the values being removed. */
    @Output('remove') removeEvent = new EventEmitter<Array<string|Object|undefined>>();

    // custom templates
    @ContentChild(PickOptionTemplateDirective, { read: TemplateRef }) _optionTemplate: TemplateRef<any>;
    @ContentChild(PickOptgroupTemplateDirective, { read: TemplateRef }) _optgroupTemplate: TemplateRef<any>;
    @ContentChild(PickPaneToolbarTemplateDirective, { read: TemplateRef }) _toolbarTemplate: TemplateRef<any>;
    @ContentChild(PickPaneFooterTemplateDirective, { read: TemplateRef }) _footerTemplate: TemplateRef<any>;
    @ContentChild(PickCustomItemTemplateDirective, { read: TemplateRef }) _customItemTemplate: TemplateRef<any>;
    @ContentChild(PickPaneHeaderRightTemplateDirective, { read: TemplateRef }) _paneHeaderRightTemplate: TemplateRef<any>;
    @ContentChild(PickPaneHeaderLeftTemplateDirective, { read: TemplateRef }) _paneHeaderLeftTemplate: TemplateRef<any>;

    /** A template-based/declarative way to pass options available in the picklist. */
    @ContentChildren(PickOptionComponent, { descendants: true }) _ngOptions: QueryList<PickOptionComponent>;

    @ViewChild('available', { static: true }) _availablePane: PickPaneComponent;
    @ViewChild('selected', { static: true }) _selectedPane: PickPaneComponent;
    /** Getter. Returns true if readonly property is true, or if disabled attribute is present on the control. */
    @HostBinding('class.hc-picklist2-disabled') get disabled() { return this.readonly || this._disabled };

    _el: HTMLElement;
    private _items = new Array<any>();
    private _itemsAreUsed: boolean;
    private _defaultLabel = 'label';
    private _disabled: boolean;
    private _compareWith: CompareWithFn;
    private _onChange = (_: any) => { };
    private _onTouched = () => { };
    private readonly _destroy$ = new Subject<void>();

    constructor(
        _elementRef: ElementRef<HTMLElement>,
        private picklistService: Picklist2Service,
        private _cd: ChangeDetectorRef,
        @Attribute('autofocus') private autoFocus: any) {
            this._el = _elementRef.nativeElement;
    }

    ngAfterViewInit() {
        this.picklistService.reset(this._availablePane, this._selectedPane);
        if (!this._itemsAreUsed) { this._setItemsFromHcPickOptions(); }
        if (isDefined(this.autoFocus)) { this._availablePane.focus(); }
        this._detectChanges();
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    writeValue(value: any | any[]): void {
        this._selectedPane.itemsList.clearList();
        this._handleWriteValue(value);
        this._cd.markForCheck();
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    setDisabledState(state: boolean): void {
        this._disabled = state;
        this._cd.markForCheck();
    }

    /** Getter. Returns true if any items are selected. */
    get hasValue(): boolean {
        return this._selectedPane.itemsList.items.length > 0;
    }

    /** Getter. Returns true if the number of selected items matches or exceeds the maximum number. Useful if you'd like to show a custom
     * warning label.
     */
    get hasMaxItemsSelected(): boolean {
        return Number.isFinite(this.maxSelectedItems) && this._selectedPane.itemsList.itemsTotalCount >= this.maxSelectedItems;
    }

    /** Getter. Returns true if the number of selected items exceeds the maximum number. UI won't normally allow this, but the model can
     * be manipulated or set outside of the component to cause this. */
    get hasExceededMaxItemsSelected(): boolean {
        return Number.isFinite(this.maxSelectedItems) && this._selectedPane.itemsList.itemsTotalCount > this.maxSelectedItems;
    }

    /** Move highlighted items from the left pane over to the right pane. */
    moveLeftToRight() {
        this._move(this._availablePane, this._selectedPane, true);
    }

    /** Move highlighted items from the right pane over to the left pane. */
    moveRightToLeft() {
        this._move(this._selectedPane, this._availablePane);
    }

    /** Move selected (highlighted) options from one pane to the other */
    _move(source: PickPaneComponent, destination: PickPaneComponent, isAdding: boolean = false) {
        let maxLimitEnforced = false;
        let overLimitBy = 0;
        if (isAdding && this.maxSelectedItems) {
            overLimitBy = this._selectedPane.itemsList.itemsTotalCount + source.selectedItems.length - this.maxSelectedItems;
            maxLimitEnforced = overLimitBy > 0;
        }
        const optionsToMove = maxLimitEnforced ? source.selectedItems.slice(0, source.selectedItems.length - overLimitBy)
            : source.selectedItems;
        optionsToMove.slice().forEach(i => {
            source.itemsList.removeOption(i);
            destination.itemsList.addOption(i);
        });

        const eventToFire = isAdding ? this.addEvent : this.removeEvent;
        eventToFire.emit(optionsToMove.map(x => x.value));
        source.itemsList.reIndex();
        this._availablePane.itemsList.clearSelected();
        this._selectedPane.itemsList.clearSelected();
        this.refreshPanes();
        this._updateNgModel();
        this._onTouched();
    }

    /** Refreshes the dimensions of the virtual scroll container and the items displayed within. Helpful when using virtual scrolling and
     * the window changes such that the picklist was resized.
     */
    public refreshScrollArea() {
        this._availablePane.refreshScrollArea();
        this._selectedPane.refreshScrollArea();
    }

    /** Manually trigger change detection to update the UI. */
    _detectChanges() {
        if (!(<any>this._cd).destroyed) {
            this._cd.detectChanges();
        }
        this._availablePane.detectChanges();
        this._selectedPane.detectChanges();
    }

    /** Convert <hc-pick-option> components into HcOptions */
    private _setItemsFromHcPickOptions() {
        const mapNgOptions = (options: QueryList<PickOptionComponent>) => {
            const items = options.map(option => ({
                $hcOptionValue: option.value,
                $hcOptionLabel: option.elementRef.nativeElement.innerHTML,
                disabled: option.disabled
            }));
            this._availablePane.itemsList.setItems(items);
            if (this.hasValue) {
                this.picklistService.mapIncomingOptionsToSelected(this.bindValue);
            }
        };

        const handleOptionChange = () => {
            const changedOrDestroyed = merge(this._ngOptions.changes, this._destroy$);
            merge(...this._ngOptions.map(option => option._stateChange$))
                .pipe(takeUntil(changedOrDestroyed))
                .subscribe(option => {
                    const item = this._availablePane.itemsList.findOption(option.value);
                    if (item) {
                        item.disabled = option.disabled;
                        item.label = option.label || item.label;
                    }
                    this._detectChanges();
                });
        };

        this._ngOptions.changes
            .pipe(startWith(this._ngOptions), takeUntil(this._destroy$))
            .subscribe(options => {
                this.bindLabel = this._defaultLabel;
                mapNgOptions(options);
                handleOptionChange();
                this._detectChanges();
            });
    }

    /** Apply value passed in from ngModel as the current selection in the component */
    private _handleWriteValue(ngModel: any[]) {
        if (!this._isValidWriteValue(ngModel)) { return; }

        const select = (val: any) => {
            let alreadySelected = this._selectedPane.itemsList.findOption(val);
            if (alreadySelected) { return; }

            let availableItem = this._availablePane.itemsList.findOption(val);
            if (availableItem) {
                this._availablePane.itemsList.removeOption(availableItem);
                this._selectedPane.itemsList.addOption(availableItem);
                this._availablePane.itemsList.reIndex();
            } else {
                // where possible, handle cases where we're adding something to the model that's not an existing option
                if (this.bindValue) { throw new Error(`Attempting to set a value (${val}) in the model that does not exist in the available options.
                    This is not allowed when the [bindValue] Input() is used. You'll need to add the option to the [items] Input().`); }
                this._selectedPane.itemsList.addNewOption(val);
            }
        };

        ngModel.forEach(item => select(item));
        this.refreshPanes();
    }

    /** Rerun filters and grouping logic in each pane, than force UI refresh. */
    private refreshPanes() {
        console.log("refresh panes");
        this._availablePane.filter();
        this._selectedPane.filter();
        this._detectChanges();
    }

    private _isValidWriteValue(value: any): boolean {
        if (!isDefined(value) || value === '') {
            return false;
        }

        if (!Array.isArray(value)) {
            console.warn('ngModel should be array.');
            return false;
        }
        return value.every(item => this.validateBinding(item));
    }

    private validateBinding = (item: any): boolean => {
        if (!isDefined(this.compareWith) && isObject(item) && this.bindValue) {
            const msg = `Setting object(${JSON.stringify(item)}) as your model with bindValue is not allowed unless [compareWith] is used.`;
            console.warn(msg);
            return false;
        }
        return true;
    };

    private _updateNgModel() {
        const model = new Array<any>();
        const selectedItems = this._selectedPane.itemsList.items.filter(i => !i.children);
        selectedItems.forEach(i => {
            let value = this.bindValue ? this._selectedPane.itemsList.resolveNested(i.value, this.bindValue) : i.value;
            model.push(value);
        });

        const selected = selectedItems.map(x => x.value);
        this._onChange(model);
        this.changeEvent.emit(selected);
        this._cd.markForCheck();
    }
}
