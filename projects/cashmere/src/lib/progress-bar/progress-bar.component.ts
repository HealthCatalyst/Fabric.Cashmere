import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProgressItem} from './progress-item.interface';

@Component({
    selector: 'hc-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
    @Input() allowSkipAhead: boolean = true;
    @Input() height: string;
    private _items: ProgressItem[] = [];
    @Input() set items(itemsList: ProgressItem[]) {
        if (itemsList && itemsList.length) {
            this._items = itemsList;
            this.greatestCompletedItemIndex = this.findGreatestCompletedIndexFromItems(itemsList);
            const itemToSelect = this.getNextItemToSelectFromItems(itemsList, this.greatestCompletedItemIndex);
            this.selectProgressItem(itemToSelect, true);
        } else {
            this._items = [];
        }
    }

    get items(): ProgressItem[] {
        return this._items;
    }

    @Output() progressItemSelected = new EventEmitter<ProgressItem>();
    @Output() progressBarCompleted = new EventEmitter<boolean>();
    currentSelectedItem: ProgressItem;
    greatestCompletedItemIndex: number;
    allItemsCompleted: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    /**
     * Finds the index of the last (right-most) completed item in the given array
     * @param items
     */
    findGreatestCompletedIndexFromItems(items: ProgressItem[]): number {
        let greatestIndex = -1;
        items.forEach((item, index) => {
            if (item.status === 'completed') {
                greatestIndex = index;
            }
        });
        return greatestIndex;
    }

    /**
     * Determines which item should be selected. Prefers the item after the last item to have been completed.
     */
    getNextItemToSelectFromItems(items: ProgressItem[], greatestCompletedItemIndex: number): ProgressItem {
        return greatestCompletedItemIndex < items.length - 1
            ? items[greatestCompletedItemIndex + 1] // get the first uncompleted item
            : items[greatestCompletedItemIndex]; // last completed is the last item left
    }

    selectProgressItem(itemToSelect: ProgressItem, emit: boolean): void {
        // TODO logic could be placed here to determine if navigation to this step is allowed by consuming component
        let previouslySelectedItem = this.currentSelectedItem;
        // Update progressItem entries to have proper focus
        let beforeSelected = true;
        this._items = this._items.map((item, index) => {
            // Set clicked item as focused
            if (item.id === itemToSelect.id) {
                beforeSelected = false;
                this.currentSelectedItem = {...itemToSelect, focused: true};
                return this.currentSelectedItem;
            }

            // toggle whether the item should be red or not
            if (beforeSelected) {
                item.beforeSelected = true;
            } else {
                delete item.beforeSelected;
            }

            // unset focus on previously selected item
            if (previouslySelectedItem && item.id === previouslySelectedItem.id) {
                delete item.focused;
                return {...item};
            }
            // no change on other items
            return item;
        });
        if (emit) {
            this.progressItemSelected.emit(this.currentSelectedItem);
        }
    }

    /**
     * Mark the current item as completed and select the next uncompleted item
     */
    completeCurrent(): void {
        if (this.currentSelectedItem.status === 'completed') {
            return; // can't complete an already completed item
        }
        let nextUncompletedItem;
        let index = -1;
        this._items = this._items.map(item => {
            index++;
            let itemToReturn = item;
            if (item.id === this.currentSelectedItem.id) {
                itemToReturn = {...this.currentSelectedItem, status: 'completed'};
                this.greatestCompletedItemIndex = this.greatestCompletedItemIndex < index ? index : this.greatestCompletedItemIndex;
            } else if (!nextUncompletedItem && item.status === 'uncompleted') {
                nextUncompletedItem = item;
            }
            return itemToReturn;
        });
        if (nextUncompletedItem) {
            this.selectProgressItem(nextUncompletedItem, true);
        } else {
            this.allItemsCompleted = true;
            this.progressBarCompleted.emit(true);
        }
    }

    itemClicked(item: ProgressItem, index: number): void {
        if (this.allowSkipAhead || index <= this.greatestCompletedItemIndex + 1) {
            this.selectProgressItem(item, true);
        }
    }
}
