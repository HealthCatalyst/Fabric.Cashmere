import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';

import {PicklistService} from '../services/picklist.service';
import {PicklistActionService} from '../services/picklist-action.service';
import {PicklistFilterService} from '../services/picklist-filter.service';
import {PicklistFilterRemoteService} from '../services/picklist-filter-remote.service';
import {PicklistFilterLocalService} from '../services/picklist-filter-local.service';
import {PicklistStateService} from '../services/picklist-state.service';
import {PicklistValuesetMovingService} from '../services/picklist-valueset-moving.service';
import {WorkTrackerService} from '../../shared/work-tracker.service';
import {PicklistOptionsSource, PicklistSettings, PicklistValueType} from '../picklist.model';
import {FilterableSelectList, SelectListOption, ValueListOption, ValueSetListOption} from './picklist-pane.model';

@Component({
    selector: 'hc-picklist-pane',
    templateUrl: 'picklist-pane.component.html',
    styleUrls: ['picklist-pane.component.scss'],
    providers: [
        PicklistService,
        PicklistStateService,
        PicklistValuesetMovingService,
        PicklistActionService,
        PicklistFilterService,
        PicklistFilterRemoteService,
        PicklistFilterLocalService,
        WorkTrackerService
    ],
    encapsulation: ViewEncapsulation.None
})
export class PicklistPaneComponent {
    @Input()
    public emptyMsg: string = 'No options';
    @Output()
    public moveSelectedItems = new EventEmitter<PicklistPaneComponent>();
    @ViewChild('listContainer', {static: false})
    public listContainerEl: ElementRef | undefined;
    @ViewChild('search', {static: false})
    public searchInputEl: ElementRef | undefined;
    public companion: PicklistPaneComponent | null = null;
    public shouldExcludeCompanion = false;
    public codeIsSignificant = false;
    public searchTerm: string = '';
    public searchTermStream = new Subject<string>();
    public selectAllWasLastClicked = false;
    public selectAllLimit = 2000;

    constructor(
        public listService: PicklistService,
        public actionService: PicklistActionService,
        public filterService: PicklistFilterService
    ) {}

    public reset(source: PicklistOptionsSource, settings: PicklistSettings, companion: PicklistPaneComponent, excludeCompanion = false) {
        this.companion = companion;
        this.shouldExcludeCompanion = excludeCompanion;
        this.codeIsSignificant = settings.codeIsSignificant;
        this.selectAllWasLastClicked = false;
        this.searchTerm = '';
        this.wireUpSearch();
        this.listService.reset(settings, source, this);
    }

    public get valueList(): FilterableSelectList<ValueListOption> {
        return this.listService.valueList;
    }
    public get valueSetList(): FilterableSelectList<ValueSetListOption> {
        return this.listService.valueSetList;
    }
    public get isPaged(): boolean {
        return this.listService.optionsSource.isPaged;
    }
    public get optionsAvailableCount(): number {
        return this.PicklistValueOptionsTotal + this.valueSetOptionsTotal;
    }
    public get PicklistValueOptionsTotal(): number {
        return this.valueList.isActive ? this.listService.totalValuesCount : 0;
    }
    public get valueSetOptionsTotal(): number {
        return this.valueSetList.isActive ? this.listService.totalValueSetsCount : 0;
    }
    public get optionsShowingCount(): number {
        const valueListShowing = this.valueList.isActive ? this.valueList.filteredOptions.length : 0;
        const valueSetListShowing = this.valueSetList.isActive ? this.valueSetList.filteredOptions.length : 0;
        return valueListShowing + valueSetListShowing;
    }

    public get showTooManyToSelectAllMsg(): boolean {
        const serverMatches = this.valueList.additionalRemoteOptions;
        return (
            this.selectAllWasLastClicked &&
            Number.isFinite(serverMatches) &&
            serverMatches + this.valueList.options.size > this.selectAllLimit
        );
    }

    public shouldShowList<T extends SelectListOption>(list: FilterableSelectList<T>): boolean {
        return list.isActive && (list.filteredOptions.length > 0 || list.additionalRemoteOptions > 0);
    }

    public listIsFilteredToEmpty<T extends SelectListOption>(list: FilterableSelectList<T>): boolean {
        return list.options.size > 0 && list.filteredOptions.length === 0 && list.isActive;
    }

    public isAnySelected(): boolean {
        const topLevelListHasSelection = this.valueList.selectedOptions.size > 0 || this.valueSetList.selectedOptions.size > 0;
        const subListHasSelection = this.valueSetList.filteredOptions.some(o => o.subValuesSelectList.selectedOptions.size > 0);
        return topLevelListHasSelection || subListHasSelection;
    }

    public focusSearch() {
        if (this.searchInputEl) {
            this.searchInputEl.nativeElement.focus();
        }
    }

    public scrollToTop() {
        if (this.listContainerEl) {
            this.listContainerEl.nativeElement.scrollTop = 0;
        }
    }

    public onSearchKeyup() {
        this.selectNone();
        this.searchTermStream.next(this.searchTerm);
    }

    public onItemClicked<T extends SelectListOption>(event: MouseEvent, index: number, list: FilterableSelectList<T>, item: T) {
        this.selectAllWasLastClicked = false;
        event.stopPropagation();
        this.actionService.onItemClicked(event, index, list, item);
    }

    public preventIEHighlightBug() {
        // for IE: https://stackoverflow.com/questions/1527751/disable-text-selection-while-pressing-shift
        (document as any).onselectstart = function() {
            return false;
        };
        setTimeout(function() {
            (document as any).onselectstart = () => null;
        }, 0);
    }

    public onValuesetCaretClicked(event: MouseEvent, valueset: ValueSetListOption) {
        this.selectAllWasLastClicked = false;
        event.stopPropagation();
        this.actionService.onValuesetCaretClicked(event, valueset);
    }

    public triggerLoadMore(type: PicklistValueType) {
        this.selectAllWasLastClicked = false;
        this.filterService.loadMore(type);
    }

    public onItemDoubleClicked<T extends SelectListOption>(event: MouseEvent, list: FilterableSelectList<T>, item: T) {
        this.selectAllWasLastClicked = false;
        event.stopPropagation();
        this.actionService.onItemDoubleClicked(event, list, item);
        this.moveSelectedItems.emit(this);
    }

    public selectAll() {
        this.selectAllWasLastClicked = true;
        const shouldLoadMoreBeforeSelectAll = this.valueList.additionalRemoteOptions && this.valueList.options.size < this.selectAllLimit;
        if (this.pagingValueList() && shouldLoadMoreBeforeSelectAll) {
            const totalMatches = this.valueList.additionalRemoteOptions + this.valueList.options.size;
            const numberToLoad = totalMatches > this.selectAllLimit ? this.selectAllLimit : totalMatches;
            this.loadAndSelectAll(numberToLoad);
        } else {
            this.actionService.selectAll();
        }
    }

    public selectNone() {
        this.selectAllWasLastClicked = false;
        this.actionService.selectNone();
    }

    private loadAndSelectAll(numberToLoad: number) {
        this.filterService.loadForSelectAll(numberToLoad).subscribe(() => {
            this.actionService.selectAllInList(this.valueList);
        });
    }

    private pagingValueList(): boolean {
        return this.isPaged && this.shouldShowList(this.valueList) && !this.shouldShowList(this.valueSetList);
    }

    private wireUpSearch() {
        this.searchTermStream.pipe(debounceTime(300), distinctUntilChanged()).subscribe(t => {
            this.filterService.runFilter(t);
            this.selectNone();
        });
    }
}
