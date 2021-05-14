import {Component, EventEmitter, forwardRef, Input, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {PicklistPaneComponent} from './pane/picklist-pane.component';
import {IPicklistOptions, IPicklistSettings, IValueOption, PicklistOptionsSource, PicklistSettings} from './picklist-old.model';

const supportedSortModes = ['asc', 'desc', 'none'];
export function validateSortInput(inputStr: string): void {
    if (supportedSortModes.indexOf(inputStr) < 0) {
        throw Error('Unsupported sort input value: ' + inputStr);
    }
}

@Component({
    selector: 'hc-picklist-old',
    templateUrl: 'picklist-old.component.html',
    styleUrls: ['picklist-old.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PicklistOldComponent),
            multi: true
        }
    ]
})
export class PicklistOldComponent implements ControlValueAccessor {
    /**
     * Settings for the picklist. Internally, this will trigger a call to `reset()`.
     */
    @Input()
    public set settings(settings: PicklistSettings) {
        this.reset(settings);
    }
    public get settings(): PicklistSettings {
        return this.picklistSettings;
    }
    /**
     * An array of unique strings to be used as the picklist options.
     */
    @Input()
    public set simpleOptions(options: Array<string> | null) {
        this.updateStateFromStringOptions(options);
    }
    public get simpleOptions(): Array<string> | null {
        return this.stringOptions;
    }
    /**
     * Set to true to show text in the header. *Defaults to true.*
     */
    @Input()
    public set showHeaderText(shouldShow: boolean) {
        this.update({showHeaderText: shouldShow});
    }
    public get showHeaderText(): boolean {
        return this.picklistSettings.showHeaderText;
    }
    /**
     * Text for left header. *Defaults to "Available".*
     */
    @Input()
    public set leftHeaderText(text: string) {
        this.update({leftHeaderText: text});
    }
    public get leftHeaderText(): string {
        return this.picklistSettings.leftHeaderText;
    }
    /**
     * Text for right header. *Defaults to "Selected".*
     */
    @Input()
    public set rightHeaderText(text: string) {
        this.update({rightHeaderText: text});
    }
    public get rightHeaderText(): string {
        return this.picklistSettings.rightHeaderText;
    }

    /**
     * How to sort options in the pane. Options: `asc` | `desc` | `none`; *Defaults to `none`.*
     */
    @Input()
    public set sort(sort: string) {
        validateSortInput(sort);
        this.update({sort: sort});
    }
    public get sort(): string {
        return this.picklistSettings.sort;
    }

    @ViewChild('availableList', {static: true})
    public _available: PicklistPaneComponent | undefined;
    @ViewChild('confirmedList', {static: true})
    public _confirmed: PicklistPaneComponent | undefined;
    /** Fired when a change is made to the picklist selection. */
    @Output()
    public changed = new EventEmitter();
    private picklistSettings = new PicklistSettings();
    public get _leftToRightMoveBtnIsDisabled(): boolean {
        return this._available ? !this._available.isAnySelected() : false;
    }
    private stringOptions: Array<string> | null = null;

    /**
     * Current selected value of the picklist. Will be either `IPicklistOptions` or `string[]` depending on the type of options provided.
     */
    public set value(model: IPicklistOptions | string[]) {
        const selectedValues: IPicklistOptions = {values: [], valueSets: []};
        if (this.picklistModelisArray(model)) {
            const selected = this.convertStringsToValueOptions(model);
            selectedValues.values = selected || [];
        } else {
            selectedValues.values = model.values || [];
            selectedValues.valueSets = model.valueSets || [];
        }
        this.update({selected: selectedValues});
    }
    public get value(): IPicklistOptions | string[] {
        if (this.stringOptions) {
            return this.picklistSettings.selected.values.map(v => v.title);
        } else {
            return this.picklistSettings.selected;
        }
    }
    public onChange: any = () => {
        // do nothing.
    };
    public onTouched: any = () => {
        // do nothing.
    };
    public registerOnChange(fn: unknown): void {
        this.onChange = fn;
    }
    public registerOnTouched(fn: unknown): void {
        this.onTouched = fn;
    }
    public writeValue(value: IPicklistOptions | string[]): void {
        if (value) {
            this.value = value;
        }
    }

    /**
     * Will update the picklist with the given settings, maintaining any previous settings that have not been overridden.
     */
    public update(settings: IPicklistSettings): void {
        const updatedSettings = Object.assign(this.picklistSettings, settings);
        this.reset(updatedSettings);
    }

    /**
     * Will reset the picklist settings with the given settings. (Clears out any previous settings.)
     */
    public reset(settings: IPicklistSettings = new PicklistSettings()): void {
        this.picklistSettings = Object.assign(new PicklistSettings(), settings);
        this.resetPanes(this.picklistSettings);
        this.setActiveValueType(this.picklistSettings.useValuesets ? 'valueSets' : 'values');
        this.applyChangeToModel();
    }

    /**
     * Will change the active tab. (Will do nothing if `settings.useValuesets` is false.)
     */
    public setActiveValueType(type: 'values' | 'valueSets'): void {
        if (!this._available) {
            console.warn('Available picklist pane not available yet.');
            return;
        }
        if (!this.settings.useValuesets) {
            type = 'values';
        }

        this._available.valueList.isActive = type === 'values';
        this._available.valueSetList.isActive = type === 'valueSets';
        this._available.selectNone();
        this._available.scrollToTop();
    }

    /**
     * Will move all selected items from the given pane into its companion pane. Used internally by the left and right arrow buttons.
     * @param pane the pane from which we are moving items out of
     */
    public moveSelectedItems(pane: PicklistPaneComponent): void {
        const shouldBreakValuesets = pane === this._confirmed;
        const selectedOptions = pane.listService.moveOutSelectedOptions(shouldBreakValuesets);
        if (pane.companion) {
            pane.companion.listService.addOptions(selectedOptions);
        } else {
            console.warn('This pane does not have a companion pane to move the select options in to.');
        }
        pane.filterService.reloadIfEmpty();
        this.applyChangeToModel();
    }

    private updateStateFromStringOptions(options: Array<string> | null) {
        const valueOptions = this.convertStringsToValueOptions(options);
        this.stringOptions = options;
        this.update({options: {values: valueOptions || []}});
    }

    private resetPanes(settings: IPicklistSettings) {
        if (!(this._available && this._confirmed)) {
            console.warn('Picklist panes not available yet.');
            return;
        }

        const confirmedSource = new PicklistOptionsSource();
        confirmedSource.values = this.picklistSettings.selected.values.slice(0);
        confirmedSource.valueSets = this.picklistSettings.selected.valueSets.slice(0);
        confirmedSource.getValuesForValueset = this.picklistSettings.options.getValuesForValueset;
        this._confirmed.reset(confirmedSource, this.picklistSettings, this._available, false);

        const availableSource = Object.assign(new PicklistOptionsSource(), this.picklistSettings.options);
        this._available.reset(availableSource, this.picklistSettings, this._confirmed, true);
    }

    private applyChangeToModel() {
        if (!(this._available && this._confirmed)) {
            console.warn('Picklist panes not available yet.');
            return;
        }

        this.picklistSettings.selected.values.length = 0;
        this.picklistSettings.selected.valueSets.length = 0;
        this._confirmed.valueList.options.forEach(e => this.picklistSettings.selected.values.push(e.option));
        this._confirmed.valueSetList.options.forEach(e => this.picklistSettings.selected.valueSets.push(e.option));

        this.changed.emit();
        this.onChange(this.value);
        this.onTouched();
    }

    private convertStringsToValueOptions(vals: Array<string> | null): IValueOption[] | null {
        return vals ? vals.map(o => ({code: `${o}`, title: `${o}`})) : null;
    }

    private picklistModelisArray(model: IPicklistOptions | Array<string>): model is Array<string> {
        const array = <Array<string>>model;
        return array && array.length !== undefined;
    }
}
