import { Component, ViewChild, Output, Input, EventEmitter, ViewEncapsulation } from '@angular/core';
import { PicklistPaneComponent } from './pane/picklist-pane.component';
import { PicklistSettings, PicklistOptionsSource, IPicklistSettings, IPicklistOptions } from './picklist.model';

@Component({
    selector: 'hc-picklist',
    templateUrl: 'picklist.component.html',
    styleUrls: ['picklist.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PicklistComponent {
    @Input() public set settings(settings: PicklistSettings) { this.resetState(settings); }
    @Output() public changed = new EventEmitter();
    @ViewChild('availableList') public available: PicklistPaneComponent | undefined;
    @ViewChild('confirmedList') public confirmed: PicklistPaneComponent | undefined;
    public picklistSettings = new PicklistSettings();
    public get leftToRightMoveBtnIsDisabled(): boolean { return this.available ? !this.available.isAnySelected() : false; }

    public resetState(settings: IPicklistSettings) {
        this.picklistSettings = Object.assign(new PicklistSettings(), settings);
        this.resetPanes(this.picklistSettings);
        this.resetActiveValueTypeAsNeeded();
    }

    public getValue(): IPicklistOptions {
        return this.picklistSettings.selected;
    }

    public setActiveValueType(pane: 'values' | 'valueSets') {
        if (!this.available) { console.warn('Available picklist pane not available yet.'); return; }

        this.available.valueList.isActive = pane === 'values';
        this.available.valueSetList.isActive = pane === 'valueSets';
        this.available.selectNone();
        this.available.scrollToTop();
    }

    public moveSelectedItems(pane: PicklistPaneComponent) {
        const shouldBreakValuesets = pane === this.confirmed;
        const selectedOptions = pane.listService.moveOutSelectedOptions(shouldBreakValuesets);
        if (pane.companion) {
            pane.companion.listService.addOptions(selectedOptions);
        } else {
            console.warn('This pane does not have a companion pane to move the select options in to.');
        }
        pane.filterService.reloadIfEmpty();
        this.applyChangeToModel();
    }

    private resetPanes(settings: IPicklistSettings) {
        if (!(this.available && this.confirmed)) { console.warn('Picklist panes not available yet.'); return; }

        const confirmedSource = new PicklistOptionsSource();
        confirmedSource.values = this.picklistSettings.selected.values.slice(0);
        confirmedSource.valueSets = this.picklistSettings.selected.valueSets.slice(0);
        confirmedSource.getValuesForValueset = this.picklistSettings.options.getValuesForValueset;
        this.confirmed.reset(confirmedSource, this.picklistSettings, this.available, false, this.picklistSettings.codeIsSignificant);

        const availableSource = Object.assign(new PicklistOptionsSource(), this.picklistSettings.options);
        this.available.reset(availableSource, this.picklistSettings, this.confirmed, true, this.picklistSettings.codeIsSignificant);
    }

    private resetActiveValueTypeAsNeeded() {
        if (this.picklistSettings.useValuesets) {
            this.setActiveValueType('valueSets');
        } else {
            this.setActiveValueType('values');
        }
    }

    private applyChangeToModel() {
        if (!(this.available && this.confirmed)) { console.warn('Picklist panes not available yet.'); return; }

        this.changed.emit();
        this.picklistSettings.selected.values.length = 0;
        this.picklistSettings.selected.valueSets.length = 0;
        this.confirmed.valueList.options.forEach(e => this.picklistSettings.selected.values.push(e.option));
        this.confirmed.valueSetList.options.forEach(e => this.picklistSettings.selected.valueSets
            .push(e.option));
    }
}