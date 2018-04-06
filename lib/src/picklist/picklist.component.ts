import { Component, ViewChild, Output, Input, EventEmitter, ViewEncapsulation } from '@angular/core';
import { PicklistPaneComponent } from './pane/picklist-pane.component';
import { PickListOptions, PicklistModel, PicklistOptionsSource } from './picklist.model';

export class SelectBoxes {
    public source: PicklistPaneComponent;
    public destination: PicklistPaneComponent;
}

@Component({
    selector: 'hc-picklist',
    templateUrl: 'picklist.component.html',
    styleUrls: ['picklist.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PicklistComponent {
    @Input() public set model(model: PicklistModel) { this.resetState(model); }
    @Output() public changed = new EventEmitter();
    @ViewChild('availableList') public available: PicklistPaneComponent;
    @ViewChild('confirmedList') public confirmed: PicklistPaneComponent;
    public picklistModel = new PicklistModel();

    public get leftToRightMoveBtnIsDisabled(): boolean {
        return !this.available.isAnySelected();
    }

    public resetState(model: PicklistModel) {
        this.picklistModel = model;
        const confirmedSource = new PicklistOptionsSource();
        confirmedSource.options.values = this.picklistModel.selectedOptions.values.slice(0);
        confirmedSource.options.valueSets = this.picklistModel.selectedOptions.valueSets.slice(0);
        confirmedSource.getValuesForValueset = this.picklistModel.optionsSource.getValuesForValueset;
        this.confirmed.reset(confirmedSource, this.available, false, this.picklistModel.codeIsSignificant);

        const availableSource = Object.assign(new PicklistOptionsSource(), this.picklistModel.optionsSource);
        this.available.reset(availableSource, this.confirmed, true, this.picklistModel.codeIsSignificant);

        if (this.picklistModel.allowValuesets) {
            this.setActivePane('valueSets');
        } else {
            this.setActivePane('values');
        }
    }

    public setActivePane(pane: 'values' | 'valueSets') {
        this.available.valueList.isActive = pane === 'values';
        this.available.valueSetList.isActive = pane === 'valueSets';
        this.available.selectNone();
        this.available.scrollToTop();
    }

    public moveSelectedItems(selectBoxes: SelectBoxes) {
        const shouldBreakValuesets = selectBoxes.source === this.confirmed;
        const selectedOptions = selectBoxes.source.listService.moveOutSelectedOptions(shouldBreakValuesets);
        selectBoxes.destination.listService.addOptions(selectedOptions);
        selectBoxes.source.filterService.reloadIfEmpty();
        this.applyConfirmed();
    }

    private applyConfirmed() {
        this.changed.emit();
        this.picklistModel.selectedOptions.values.length = 0;
        this.picklistModel.selectedOptions.valueSets.length = 0;
        this.confirmed.valueList.options.forEach(e => this.picklistModel.selectedOptions.values.push(e.option));
        this.confirmed.valueSetList.options.forEach(e => this.picklistModel.selectedOptions.valueSets
            .push(e.option));
    }
}