import {
    Component,
    forwardRef,
    ChangeDetectorRef,
    Input,
    Output,
    EventEmitter,
    TemplateRef,
    ViewEncapsulation,
    ViewChild,
    ElementRef,
    ChangeDetectionStrategy,
    Inject,
    OnChanges,
    SimpleChanges,
    HostBinding
} from '@angular/core';
import { Subject } from 'rxjs';

import { isDefined, isFunction, isPromise, isObject, newId } from '../value-utils';
import { ItemsList } from './items-list';
import { PickOption, KeyCode, SearchFn } from '../pick.types';
import { PickPaneListComponent } from './pick-pane-list.component';
import { SelectionModelFactory } from './selection-model';
import { PickPaneListService } from './pick-pane-list.service';
import { Picklist2Service } from '../picklist2.service';
import { PickPaneDragService } from './pick-pane-drag.service';
import { SortFn, GroupValueFn, CompareWithFn, AddCustomItemFn, SELECTION_MODEL_FACTORY } from '../pick.types';

/** @docs-private */
@Component({
    selector: 'hc-pick-pane',
    templateUrl: './pick-pane.component.html',
    providers: [PickPaneListService, PickPaneDragService],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
/** A single pane containing the searchbar, toolbar, items list, and footer.
*/
export class PickPaneComponent implements OnChanges {
    @Input() _isLeftPane = false;
    @Input() bindLabel: string;
    @Input() bindValue: string;
    @Input() addCustomItem: boolean | AddCustomItemFn | undefined = false;
    @Input() addCustomItemText: string;
    @Input() groupBy: string | Function | undefined;
    @Input() groupValue: GroupValueFn | undefined;
    @Input() canSelectGroup = false;
    @Input() canCloseGroup = false;
    @Input() closeGroupsByDefault = true;
    @Input() orphanItemsGroupName: string;
    @Input() virtualScroll: boolean;
    @Input() bufferAmount = 4;
    @Input() trackByFn: Function;
    @Input() sortFn: SortFn | undefined;
    @Input() readonly = false;
    @Input() hasSearch = true;
    @Input() searchPlaceholder: string;
    @Input() searchFn: SearchFn | undefined;
    @Input() searchWhileComposing = true;
    @Input() externalSearchTermMinLength = 0;
    @Input() externalSearchSubject: Subject<string>;
    @Input() externalTotalOptionCount: number;
    @Input() notFoundText: string;
    @Input() loading = false;
    @Input() hasToolbar = true;
    @Input() hasFooter = true;
    @Input() escapeHTML = true;
    @Input() get items() { return this._items; }
    set items(value: any[]) { this._items = value; }
    @Input() get compareWith() { return this._compareWith; }
    set compareWith(fn: CompareWithFn) {
        if (isDefined(fn) && !isFunction(fn)) { throw Error('`compareWith` must be a function.'); }
        this._compareWith = fn;
    }

    // custom templates
    @Input() optionTemplate: TemplateRef<any>;
    @Input() optgroupTemplate: TemplateRef<any>;
    @Input() toolbarTemplate: TemplateRef<any>;
    @Input() footerTemplate: TemplateRef<any>;
    @Input() customItemTemplate: TemplateRef<any>;

    /** Fires when option are being moved via an enter keypress. */
    @Output() triggerMove = new EventEmitter();
    /** Fires when search is triggered on the pane. */
    @Output() search = new EventEmitter<{ term: string, items: any[] }>();
    /** Fires when pane is scrolled. */
    @Output() scroll = new EventEmitter<{ start: number; end: number }>();
    /** Fires when pane has been scrolled to the bottom. */
    @Output() scrollToEnd = new EventEmitter();

    @ViewChild(forwardRef(() => PickPaneListComponent)) dropdownPanel: PickPaneListComponent;
    @ViewChild('searchInput', { static: true }) searchInput: ElementRef<HTMLInputElement>;

    /** Object that manages the state of the list. */
    itemsList: ItemsList;
    /** items displayed in the viewport. important for virtual scrolling */
    viewPortItems: PickOption[] = [];
    /** what this pane is being filtered by */
    searchTerm: string;
    /** unique identifier used as the HTML id on the list element */
    paneId = newId();
    element: HTMLElement;
    /** true if an item is being dragged from this pane */
    _isDragging = false;
    /** true if the pane has an item being dragged over it from another pane */
    _willAcceptDrop = false;
    /** true if the item list has focus.
     * using this property and adding a css class works more smoothly than relying on :focus psuedo selector */
    _paneHasFocus = false;
    public get disabled() { return this.readonly || this._disabled; }
    public get externalOptionCountStr(): string | null {
        return Number.isFinite(this.externalTotalOptionCount) ? this.externalTotalOptionCount.toLocaleString() : null; }
    public get _companionPane(): PickPaneComponent {
        return this._isLeftPane ? this.picklistService.selectedPane : this.picklistService.availablePane; }

    @HostBinding('class.hc-pick-pane') useDefaultClass = true;

    private _items = new Array<any>();
    private _disabled: boolean;
    private _defaultLabel = 'label';
    private _primitive;
    private _compareWith: CompareWithFn;
    private _isComposing = false;

    constructor(
        @Inject(SELECTION_MODEL_FACTORY) newSelectionModel: SelectionModelFactory,
        _elementRef: ElementRef<HTMLElement>,
        private picklistService: Picklist2Service,
        private _cd: ChangeDetectorRef,
        public dragService: PickPaneDragService
    ) {
        this.itemsList = new ItemsList(this, newSelectionModel());
        this.element = _elementRef.nativeElement;
        this.dragService.reset(this);
    }

    get selectedItems(): PickOption[] { return this.itemsList.selectedItems; }
    get selectedValues() { return this.selectedItems.map(x => x.value); }
    get hasSelectedItems() { return this.selectedItems.length > 0; }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.items) {
            this._setItems(changes.items.currentValue || []);
            this.picklistService.mapIncomingOptionsToSelected(this.bindValue);
            this.filter();
            this.detectChanges();
        }
    }

    /** Called when a key is pressed in the search input box */
    onSearchKeydown($event: KeyboardEvent) {
        if ($event.which === KeyCode.ArrowDown || $event.which === KeyCode.Enter) {
            $event.preventDefault();
            if (this.addCustomOptionIsMarked) {
                this.addAndSelectCustomOption();
            } else {
                this.panelFocus();
            }
        }
    }

    /** Called when a key is pressed while the list has focus */
    onPanelKeydown($event: KeyboardEvent) {
        switch ($event.which) {
            case KeyCode.ArrowDown:
                this._handlePanelArrowKeyPress($event, true);
                break;
            case KeyCode.ArrowUp:
                this._handlePanelArrowKeyPress($event, false);
                break;
            case KeyCode.Enter:
                if (this.addCustomOptionIsMarked) {
                    this.addAndSelectCustomOption();
                } else {
                    this.triggerMove.emit();
                }
                break;
            case KeyCode.Esc:
                this.itemsList.resetListSelectionState();
                this.panelBlur();
                break;
        }
    }

    /** Place focus on the list pane */
    panelFocus() {
        this.dropdownPanel._panel.focus();
        if (!this.hasSelectedItems) {
            this._jumpFocusToFirstItem();
        }
    }

    /** Remove focus from the list pane */
    panelBlur() {
        this.dropdownPanel._panel.blur();
    }

    /** Focus on the first item in the list, scrolling as needed */
    private _jumpFocusToFirstItem() {
        if (this.itemsList.filteredItems.length === 0) { return; }
        this.itemsList.resetListSelectionState();
        this._selectAndScrollToItem(this.itemsList.markedItem);
    }

    /** Moves focus, or moves or expands the highlighted options in the list */
    private _handlePanelArrowKeyPress($event: KeyboardEvent, isDown: boolean) {
        if (this._nextItemIsCustomItem(isDown)) {
            this.itemsList.unmark();
            this.itemsList.clearSelected();
            this._scrollToCustomItem();
        } else {
            this.itemsList.markNextItem(isDown);
            if (!$event.shiftKey && !$event.ctrlKey) { this.itemsList.clearSelected(); }
            const nextItem = this.itemsList.markedItem;
            this._selectAndScrollToItem(nextItem);
        }
        $event.preventDefault();
    }

    /** Selects a given item, scrolling to keep it in the viewport as needed */
    private _selectAndScrollToItem(item: PickOption) {
        if (!item) { return; }
        this.itemsList.select(item);
        this._scrollToMarked();
    }

    /** Remove highlight from all items in the list */
    deselectAll() {
        this.itemsList.resetListSelectionState();
        this._cd.detectChanges();
    }

    /** Highlight all items in the list */
    selectAll() {
        this.itemsList.selectAll();
        this._cd.detectChanges();
    }

    /**
     * Shift + click selects a range
     * Ctrl + click adds to current selection
     * Regular click clears current selection and selects anew
     */
    onItemClick($event: MouseEvent, item: PickOption) {
        if (!item) { return; }
        const lastMarkedIndex = this.itemsList.markedIndex;
        if (!$event.ctrlKey) { this.itemsList.clearSelected(); }
        if (!$event.shiftKey) { this.itemsList.markItem(item); }

        if ($event.shiftKey) {
            const indexOfItemClicked = this.itemsList.filteredItems.findIndex(i => i === item);
            const start = Math.min(lastMarkedIndex, indexOfItemClicked);
            const end = Math.max(lastMarkedIndex, indexOfItemClicked);
            for (let i = start; i <= end; i++) {
                // don't shift + click select a group, as it will select all its children, and that's not likely what is wanted
                if (this.itemsList.filteredItems[i].isParent) { continue; }
                this.select(this.itemsList.filteredItems[i]);
            }
        } else {
            if ($event.ctrlKey && item.selected) {
                this.unselect(item);
            } else {
                this.select(item);
            }
        }

        this._cd.detectChanges();
    }

    /** Selects items as needed, and moves options to the companion pane */
    onItemDoubledClicked($event: MouseEvent, item: PickOption) {
        if (!$event.shiftKey) { this.itemsList.clearSelected(); }
        this.select(item);
        this.triggerMove.emit();
    }

    /** If not already selected, selects a given item if that option or the entire pane are not disabled */
    select(item: PickOption) {
        if (!item || item.disabled || this.disabled || item.selected) { return; }
        this.itemsList.select(item);
    }

    /** If not already unselected, unselects a given item if that option or the entire pane are not disabled */
    unselect(item: PickOption) {
        if (!item || item.disabled || this.disabled || !item.selected) { return; }
        this.itemsList.unselect(item);
    }

    /** Place focus in the searchbar, or the list if searchbar is not available */
    focus() {
        if (this.hasSearch) {
            this.searchInput.nativeElement.focus();
        } else {
            this.panelFocus();
        }
    }

    /** Remove focus from searchbar and list */
    blur() {
        this.searchInput.nativeElement.blur();
        this.panelBlur();
    }

    /** Create as custom item from a search term that didn't match available options from either pane */
    addAndSelectCustomOption() {
        let customItem: any;
        const hasAddCustomItemFunc = isFunction(this.addCustomItem);
        if (hasAddCustomItemFunc) {
            customItem = (<AddCustomItemFn>this.addCustomItem)(this.searchTerm);
        } else if (!hasAddCustomItemFunc && this.bindValue && this.bindValue !== this.bindLabel) {
            throw new Error(`Attempting to add a custom option, but because the [bindValue] & [bindLabel] Input() params don't match,
                you'll need to also supply a function to the [addCustomItem] Input() to create an appropriate value for the new option.
                This function should return an object that matches the shape of the options passed into the [items] array.`);
        } else {
            customItem = this._primitive ? this.searchTerm : { [this.bindLabel]: this.searchTerm };
        }

        if (isPromise(customItem)) {
            customItem.then(i => this._selectNewCustomOption(i)).catch(() => { });
        } else if (customItem) {
            this._selectNewCustomOption(customItem);
        }
    }

    /** Convert the given custom item into an HcOption, add it to the list, and then highlight it */
    _selectNewCustomOption(customItem: any) {
        const newOption = this.itemsList.addNewOption(customItem);
        this.itemsList.resetFilteredItemsForCustomOptionAdded(this._isUsingSearchSubject, this.searchTerm);
        this.itemsList.markItem(newOption);
        this._selectAndScrollToItem(newOption);
    }

    /** Used in the ngFor of the list to maximize DOM reusage */
    trackByOption = (_: number, item: PickOption) => {
        if (this.trackByFn) { return this.trackByFn(item.value); }
        return item;
    };

    /** If true, the "add custom" option should be displayed */
    get showAddCustomOption() {
        if (!this._validTerm) { return false; }
        const term = this.searchTerm.toLowerCase().trim();
        return this.addCustomItem &&
            !this.itemsList.items.some(x => x.label?.toLowerCase() === term) &&
            !this._companionPane.itemsList.items.some(x => x.label?.toLowerCase() === term) &&
            !this.loading;
    }

    /** If true, the "add custom" option currently has focus */
    get addCustomOptionIsMarked() {
        return this.showAddCustomOption && !this.itemsList.markedItem;
    }

    /** If true, the empty pane message should be displayed */
    get showNoItemsFound() {
        const empty = this.itemsList.filteredItems.length === 0;
        return ((empty && !this._isUsingSearchSubject && !this.loading) ||
            (empty && this._isUsingSearchSubject && this._validTerm && !this.loading)) &&
            !this.showAddCustomOption;
    }

    /** Called when user begins typing in the searchbox */
    _onCompositionStart() {
        this._isComposing = true;
    }

    /** Called when user finsihes typing in the searchbox */
    _onCompositionEnd(term: string) {
        this._isComposing = false;
        if (this.searchWhileComposing) { return; }
        this.filter(term);
    }

    /** Search the items in the list */
    filter(term: string = this.searchTerm) {
        if (this._isComposing && !this.searchWhileComposing) { return; }

        if (this._isUsingSearchSubject && !term || this.searchTerm === term) { this.itemsList.resetFilteredItems(); }
        if (this._isUsingSearchSubject && (this._validTerm || this.externalSearchTermMinLength === 0)) {
            this.externalSearchSubject.next(term);
            this.itemsList.updateCounts();
        }

        this.searchTerm = term;
        if (!this._isUsingSearchSubject) {
            this.itemsList.filter(this.searchTerm);
        }
        this.itemsList.markSelectedOrDefault();
        this.search.emit({ term, items: this.itemsList.filteredItems.map(x => x.value) });
    }

    /** Force change detection to refresh the UI */
    detectChanges() {
        if (!(<any>this._cd).destroyed) {
            this._cd.detectChanges();
        }
    }

    /** Refreshes the dimensions of the virtual scroll container and the items displayed within */
    refreshScrollArea() {
        this.dropdownPanel.refreshListLayout(true);
    }

    /** Creates HcOptions according to the configured options, sets them on this list, and selects the first option. */
    _setItems(items: any[]) {
        const firstItem = items[0];
        this.bindLabel = this.bindLabel || this._defaultLabel;
        this._primitive = isDefined(firstItem) ? !isObject(firstItem) : this._primitive || this.bindLabel === this._defaultLabel;
        this.itemsList.setItems(items);
        if (isDefined(this.searchTerm) && !this._isUsingSearchSubject) {
            this.itemsList.filter(this.searchTerm);
        }

        this.itemsList.markSelectedOrDefault();
    }

    /** Clear out search term if any and refresh the list */
    clearSearch() {
        if (!this.searchTerm) { return; }
        this._changeSearch("");
        this.itemsList.resetFilteredItems();
    }

    /** Update search term and notify external search as needed */
    private _changeSearch(searchTerm: string) {
        this.searchTerm = searchTerm;
        if (this._isUsingSearchSubject) {
            this.externalSearchSubject.next(searchTerm);
        }
    }

    /** Scroll the list to he currently "focused" item. */
    private _scrollToMarked() {
        this.dropdownPanel.scrollTo(this.itemsList.markedItem);
    }

    /** Scroll the list to the option a user can select to create a custom option */
    private _scrollToCustomItem() {
        this.dropdownPanel.scrollToCustomOption();
    }

    /** Returns true if the next item that would be highlighted is the "add custom" option */
    private _nextItemIsCustomItem(nextStepIsDown: boolean): boolean {
        const nextStep = nextStepIsDown ? 1 : -1;
        const nextIndex = this.itemsList.markedIndex + nextStep;
        return !!this.addCustomItem && !!this.searchTerm
            && this.itemsList.markedItem
            && (nextIndex < 0 || nextIndex === this.itemsList.filteredItems.length);
    }

    /** Returns true if external search is being used */
    private get _isUsingSearchSubject() {
        return this.externalSearchSubject && this.externalSearchSubject.observers.length > 0;
    }

    /** Returns true if the search term is long enough to be considered valid */
    private get _validTerm() {
        const term = this.searchTerm && this.searchTerm.trim();
        return term && term.length >= this.externalSearchTermMinLength;
    }
}
