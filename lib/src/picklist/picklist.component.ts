import { Component, ViewChild, Output, Input, EventEmitter, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PicklistPaneComponent } from './pane/picklist-pane.component';
import { PicklistSettings, PicklistOptionsSource, IPicklistSettings, IPicklistOptions, IValueOption } from './picklist.model';

@Component({
    selector: 'hc-picklist',
    templateUrl: 'picklist.component.html',
    styleUrls: ['picklist.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PicklistComponent),
            multi: true
        }
    ]
})
export class PicklistComponent implements ControlValueAccessor {
    @Input() public set settings(settings: PicklistSettings) { this.reset(settings); }
    public get settings(): PicklistSettings { return this.picklistSettings; }
    @Input() public set simpleOptions(options: Array<string> | null) { this.updateStateFromStringOptions(options); }
    public get simpleOptions(): Array<string> | null { return this.stringOptions; }
    @Output() public changed = new EventEmitter();
    @ViewChild('availableList') public available: PicklistPaneComponent | undefined;
    @ViewChild('confirmedList') public confirmed: PicklistPaneComponent | undefined;
    private picklistSettings = new PicklistSettings();
    public get leftToRightMoveBtnIsDisabled(): boolean { return this.available ? !this.available.isAnySelected() : false; }
    private stringOptions: Array<string> | null = null;

    public set value(model: IPicklistOptions | string[]) {
        const selectedValues: IPicklistOptions = { values: [], valueSets: []}
        if (this.picklistModelisArray(model)) {
            const selected = this.convertStringsToValueOptions(model);
            selectedValues.values = selected || [];
        } else {
            selectedValues.values = model.values || [];
            selectedValues.valueSets = model.valueSets || [];
        }
        this.updateState({ selected: selectedValues });
    }
    public get value(): IPicklistOptions | string[] {
        if (this.stringOptions) {
            return this.picklistSettings.selected.values.map(v => v.title);
        } else {
            return this.picklistSettings.selected;
        }
    }
    public onChange: any = () => { };
    public onTouched: any = () => { };
    public registerOnChange(fn: any) { this.onChange = fn; }
    public registerOnTouched(fn: any) { this.onTouched = fn; }
    public writeValue(value: IPicklistOptions | string[]) {
        if (value) {
            this.value = value;
        }
    }

    public updateState(settings: IPicklistSettings) {
        const updatedSettings = Object.assign(this.picklistSettings, settings);
        this.reset(updatedSettings);
    }

    public reset(settings: IPicklistSettings = new PicklistSettings()) {
        this.picklistSettings = Object.assign(new PicklistSettings(), settings);
        this.resetPanes(this.picklistSettings);
        this.setActiveValueType(this.picklistSettings.useValuesets ? 'valueSets' : 'values');
        this.applyChangeToModel();
    }

    public updateStateFromStringOptions (options: Array<string> | null) {
        const valueOptions = this.convertStringsToValueOptions(options);
        this.stringOptions = options;
        this.updateState({options: { values: valueOptions || [] }});
    }

    public setActiveValueType(pane: 'values' | 'valueSets') {
        if (!this.available) { console.warn('Available picklist pane not available yet.'); return; }
        if (!this.settings.useValuesets) { return; }

        this.available.valueList.isActive = (pane === 'values');
        this.available.valueSetList.isActive = (pane === 'valueSets');
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
        this.confirmed.reset(confirmedSource, this.picklistSettings, this.available, false);

        const availableSource = Object.assign(new PicklistOptionsSource(), this.picklistSettings.options);
        this.available.reset(availableSource, this.picklistSettings, this.confirmed, true);
    }

    private applyChangeToModel() {
        if (!(this.available && this.confirmed)) { console.warn('Picklist panes not available yet.'); return; }

        this.picklistSettings.selected.values.length = 0;
        this.picklistSettings.selected.valueSets.length = 0;
        this.confirmed.valueList.options.forEach(e => this.picklistSettings.selected.values.push(e.option));
        this.confirmed.valueSetList.options.forEach(e => this.picklistSettings.selected.valueSets.push(e.option));

        this.changed.emit();
        this.onChange(this.value);
        this.onTouched();
    }

    private convertStringsToValueOptions(vals: Array<string> | null): IValueOption[] | null {
        return vals ? vals.map(o => ({ code: `${o}`, title: `${o}` })) : null;
    }

    private picklistModelisArray(model: IPicklistOptions | Array<string>): model is Array<string> {
        const array = (<Array<string>>model);
        return array && array.length !== undefined;
    }
}