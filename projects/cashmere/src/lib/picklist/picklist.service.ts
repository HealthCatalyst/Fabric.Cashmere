import { Injectable } from '@angular/core';
import { PickPaneComponent } from './pane/pick-pane.component';
import { isDefined } from '../util';

@Injectable()
/** @docs-private */
export class PicklistService {
    availablePane: PickPaneComponent;
    selectedPane: PickPaneComponent;
    public reset(availablePane: PickPaneComponent, selectedPane: PickPaneComponent): void {
        this.availablePane = availablePane;
        this.selectedPane = selectedPane;
    }

    /** When the option/items are updated, update corresponding selected options in the selected pane.
     *  Make sure they aren't duplicated in the available pane */
    public mapIncomingOptionsToSelected(bindValue?: string): void {
        if (!isDefined(this.availablePane) || !isDefined(this.selectedPane)) { return; }
        const selectedItems = this.selectedPane.itemsList.items.filter(i => !i.isParent);
        selectedItems.forEach(selected => {
            const value = bindValue ?
                this.selectedPane.itemsList.resolveNested(selected.value, bindValue) : selected.value;
            const item = isDefined(value) ? this.availablePane.itemsList.findOption(value) : null;
            if (item) { this.availablePane.itemsList.removeOption(item); }
            this.selectedPane.itemsList.removeOption(selected);
            this.selectedPane.itemsList.addOption(item || selected);
        });
        this.availablePane.itemsList.reIndex();
        this.selectedPane.itemsList.reIndex();
    }
}
