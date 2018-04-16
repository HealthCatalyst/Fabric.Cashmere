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
    /**
     * Settings for the picklist. Internally, this will trigger a call to `reset()`.
     */
    @Input() public set settings(settings: PicklistSettings) { this.reset(settings); }
    public get settings(): PicklistSettings { return this.picklistSettings; }
    /**
     * An array of unique strings to be used as the picklist options.
     */
    @Input() public set simpleOptions(options: Array<string> | null) { this.updateStateFromStringOptions(options); }
    public get simpleOptions(): Array<string> | null { return this.stringOptions; }
    /**
     * Set to true to show text in the header. *Defaults to true.*
     */
    @Input() public set showHeaderText(shouldShow: boolean) { this.update({ showHeaderText: shouldShow}); }
    public get showHeaderText(): boolean { return this.picklistSettings.showHeaderText; }
    /**
     * Text for left header. *Defaults to "Available".*
     */
    @Input() public set leftHeaderText(text: string) { this.update({ leftHeaderText: text || 'Available'}); }
    public get leftHeaderText(): string { return this.picklistSettings.leftHeaderText; }
    /**
     * Text for right header. *Defaults to "Selected".*
     */
    @Input() public set rightHeaderText(text: string) { this.update({ rightHeaderText: text || 'Selected'}); }
    public get rightHeaderText(): string { return this.picklistSettings.rightHeaderText; }

    /**
     * The left picklist pane containing available options.
     */
    @ViewChild('availableList') public available: PicklistPaneComponent | undefined;
    /**
     * The right picklist pane containing selected options.
     */
    @ViewChild('confirmedList') public confirmed: PicklistPaneComponent | undefined;
    @Output() public changed = new EventEmitter();
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
        this.update({ selected: selectedValues });
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

    /**
     * Will update the picklist with the given settings, maintaining any previous settings that have not been overridden.
     * @param settings
     */
    public update(settings: IPicklistSettings) {
        const updatedSettings = Object.assign(this.picklistSettings, settings);
        this.reset(updatedSettings);
    }

    /**
     * Will reset the picklist settings with the given settings. (Clears out any previous settings.)
     * @param settings
     */
    public reset(settings: IPicklistSettings = new PicklistSettings()) {
        this.picklistSettings = Object.assign(new PicklistSettings(), settings);
        this.resetPanes(this.picklistSettings);
        this.setActiveValueType(this.picklistSettings.useValuesets ? 'valueSets' : 'values');
        this.applyChangeToModel();
    }

    /**
     * Will change the active tab. (Will do nothing if `settings.useValuesets` is false.)
     * @param type {string} 'values' or 'valuesets'
     */
    public setActiveValueType(type: 'values' | 'valueSets') {
        if (!this.available) { console.warn('Available picklist pane not available yet.'); return; }
        if (!this.settings.useValuesets) { type = 'values'; }

        this.available.valueList.isActive = (type === 'values');
        this.available.valueSetList.isActive = (type === 'valueSets');
        this.available.selectNone();
        this.available.scrollToTop();
    }

    /**
     * Will move all selected items from the given pane into its companion pane. Used internally by the left and right arrow buttons.
     * @param pane the pane from which we are moving items out of.
     */
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

    private updateStateFromStringOptions (options: Array<string> | null) {
        const valueOptions = this.convertStringsToValueOptions(options);
        this.stringOptions = options;
        this.update({options: { values: valueOptions || [] }});
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