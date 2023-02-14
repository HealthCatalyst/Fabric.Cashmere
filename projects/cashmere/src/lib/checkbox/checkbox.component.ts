import {
    Attribute,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    Output,
    Renderer2,
    ViewChild,
    Self,
    Optional,
    ContentChildren,
    ViewEncapsulation,
} from '@angular/core';
import type {QueryList} from '@angular/core';
import { ControlValueAccessor, NgForm, FormGroupDirective, NgControl } from '@angular/forms';
import { HcFormControlComponent } from '../form-field/hc-form-control.component';
import { parseBooleanAttribute } from '../util';
import { filter } from 'rxjs/operators';

let nextCheckboxId = 1;

export class CheckboxChangeEvent {
    constructor(public source: CheckboxComponent, public checked: boolean) { }
}

@Component({
    selector: 'hc-checkbox-group',
    styleUrls: ['./checkbox.component.scss'],
    providers: [{ provide: HcFormControlComponent, useExisting: forwardRef(() => CheckboxGroup)}],
    exportAs: 'hcCheckboxGroup',
    template: `
        <hc-checkbox *ngIf="!_disableParent" [checked]="_groupState" [indeterminate]="_isIndeterminate" (change)="toggleCheckAll()">{{_parentLabel}}</hc-checkbox>
        <div [class.hc-checkbox-children-group]="!_disableParent">
            <ng-content></ng-content>
        </div>
        `,
})
export class CheckboxGroup extends HcFormControlComponent {
    /** A list of all the checkboxes included in the group */
    private _checkboxes: QueryList<CheckboxComponent>;
    private _checkboxesArray: CheckboxComponent[];

    _groupState = false;
    _parentLabel = "Parent Checkbox";
    _disableParent = false;
    _isIndeterminate = true;

    /** gets all children and subscribes to their events */
    @ContentChildren(
        forwardRef(() => CheckboxComponent),
        { descendants: false }
    )
    get checkboxes(): QueryList<CheckboxComponent> {
        return this._checkboxes;
    }
    set checkboxes(value: QueryList<CheckboxComponent>) {
        if (value) {
            this._checkboxes = value;
            const arr = value.toArray() || [];
            this._checkboxesArray = arr;
            arr.forEach(c => c.change.pipe(
                filter(() => this._checkboxesArray === arr)
            ).subscribe(() => this.updateParentState()));
        }
    }

    /** Input to disable the Parent button *Defaults to `false`.* */
    @Input()
    get disableParent(): boolean {
        return this._disableParent;
    }
    set disableParent(disableParent: boolean) {
        this._disableParent = disableParent;
    }

    /** Input to change the label for the parent checkbox *Defaults to 'Parent Checkbox'* */
    @Input()
    get parentLabel(): string {
        return this._parentLabel;
    }
    set parentLabel(parentLabel: string) {
        this._parentLabel = parentLabel;
    }

    /** Function to handle the indeterminate checkbox */
    updateParentState(): void {
        if (this.checkboxes) {
            const checkedCount = this.checkboxes.filter(c => c.checked).length;
            if (checkedCount === this.checkboxes.length) {
                this._groupState = true;
                this._isIndeterminate = false;
            } else if (checkedCount === 0) {
                this._groupState = false;
                this._isIndeterminate = false;
            } else {
                this._groupState = false;
                this._isIndeterminate = true;
            }
        }
    }

    /** Function to return all checkboxes*/
    getSelected(): CheckboxComponent[] {
        if (this.checkboxes) {
            return this.checkboxes.filter(c => c.checked);
        }
        return [];
    }

    /** Function that handles the parent checkbox functionality */
    toggleCheckAll(): void {
        if (this._groupState === true) {
            this.checkboxes.filter(c => c.checked = false);
        } else {
            this.checkboxes.filter(c => c.checked = true);
        }
        this.updateParentState();
    }
}

@Component({
    selector: 'hc-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{provide: HcFormControlComponent, useExisting: forwardRef(() => CheckboxComponent)}],
    exportAs: 'hcCheckbox'
})
export class CheckboxComponent extends HcFormControlComponent implements ControlValueAccessor {
    private _uniqueId = `hc-checkbox-${nextCheckboxId++}`;
    private _form: NgForm | FormGroupDirective | null;
    private _checked = false;
    private _tabIndex: number;
    private _parent = false;
    private readonly checkboxGroup: CheckboxGroup | null;
    _componentId = this._uniqueId;

    /** Value attribute of the native checkbox */
    @Input()
    value: string;

    /** Whether the checkbox is indeterminate. It can represent a checkbox with three states. */
    @Input()
    indeterminate: boolean;

    /** If true, the checkbox is for display purposes (not user interaction). As such its checked/unchecked state
     * can only be controlled programatically. Useful for embedding in an ng-select typeahead */
    @Input()
    isStub = false;

    /** Unique id for the checkbox element. If none is supplied, one will be auto-generated. */
    @Input()
    get id(): string {
        return this._componentId || this._uniqueId;
    }

    set id(idVal: string) {
        this._componentId = idVal ? idVal : this._uniqueId;
    }

    /** If true, condense the default margin and reduce the font size. *Defaults to `false`.*  */
    @Input()
    get tight(): boolean {
        return this._tight;
    }
    set tight(value: boolean) {
        this._tight = parseBooleanAttribute(value);
    }

    /** Sets the position of the checkbox relative to its associated label. *Defaults to `center`.*  */
    @Input()
    align: 'center' | 'top' | 'bottom' = 'center';

    /** Sets unique name used in a form */
    @Input()
    name: string | null = null;

    /** Event emitted whenever the state changes */
    @Output()
    change = new EventEmitter<CheckboxChangeEvent>();

    @ViewChild('checkboxInput', {static: true})
    _checkboxInput: ElementRef;

    @HostBinding('attr.id')
    get _getHostId(): string {
        return this.id;
    }

    @HostBinding('class.hc-checkbox-checked')
    get _getCheckboxCheckedClass(): boolean {
        return this.checked;
    }

    @HostBinding('class.hc-checkbox-disabled')
    get _getCheckboxDisabledClass(): boolean {
        if (this._ngControl && this._ngControl.disabled) {
            return this._ngControl.disabled;
        }
        return this._isDisabled;
    }

    @HostBinding('class.hc-checkbox-indeterminate')
    get _getCheckboxIndeterminateClass(): boolean {
        return this.indeterminate;
    }

    /** Whether the checkbox is required. */
    @Input()
    get required(): boolean {
        return this._isRequired;
    }

    set required(requiredVal: boolean) {
        this._isRequired = parseBooleanAttribute(requiredVal);
    }

    /** Whether the checkbox is disabled. */
    @Input()
    get disabled(): boolean {
        if (this._ngControl && this._ngControl.disabled) {
            return this._ngControl.disabled;
        }
        return this._isDisabled;
    }

    set disabled(disabledVal: boolean) {
        this._isDisabled = parseBooleanAttribute(disabledVal);
    }

    /** Whether the checkbox is checked. */
    @Input()
    get checked(): boolean {
        return this._checked;
    }

    set checked(checked: boolean) {
        if (this._checked === checked) {
            return;
        }
        this._checked = checked;
    }

    /** Whether the checkbox is a parent. */
    @Input()
    get parent(): boolean {
        return this._parent;
    }

    set parent(parent: boolean) {
        this._parent = parseBooleanAttribute(parent);
    }

    /** TabIndex attribute of native checkbox */
    get tabIndex(): number {
        return this._isDisabled ? -1 : this._tabIndex;
    }

    set tabIndex(value: number) {
        this._tabIndex = value == null ? 0 : value;
    }

    get _inputId(): string {
        return `${this.id || this._uniqueId}-input`;
    }

    get _errorState(): boolean {
        return !!(
            this._ngControl &&
            this._ngControl.invalid &&
            (this._ngControl.touched || (this._form && this._form.submitted))
        );
    }

    constructor(
        @Attribute('tabindex') tabindex: string,
        private _renderer: Renderer2,
        @Optional() _parentForm: NgForm,
        @Optional() _parentFormGroup: FormGroupDirective,
        @Optional() checkboxGroup: CheckboxGroup,
        @Optional()
        @Self()
        public _ngControl: NgControl
    ) {
        super();

        this.checkboxGroup = checkboxGroup;
        this.tabIndex = parseInt(tabindex, 10) || 0;

        this._form = _parentForm || _parentFormGroup;
        if (this._ngControl != null) {
            this._ngControl.valueAccessor = this;
        }
    }

    writeValue(value: unknown): void {
        this.checked = !!value;
    }

    public onChange: (value: unknown) => void = () => undefined;
    public onTouch: () => unknown = () => undefined;
    public registerOnChange(fn: (value: unknown) => void): void {
        this.onChange = fn;
    }
    public registerOnTouched(fn: () => unknown): void {
        this.onTouch = fn;
    }

    setDisabledState(disabledVal: boolean): void {
        this.disabled = disabledVal;
        this._renderer.setProperty(this._checkboxInput.nativeElement, 'disabled', disabledVal);
    }

    /** Toggles the current checked state of the checkbox */
    toggle(): void {
        this.checked = !this.checked;
    }

    _clickEvent(event: Event): void {
        event.stopPropagation(); // prevent native click event from being dispatched
        if (!this.disabled) {
            if (this.checkboxGroup && this._parent) {
                this.checkboxGroup.toggleCheckAll();
            }
            this.toggle();
            this._emitChangeEvent();
        }
    }

    _stopChangeEvent(event: Event): void {
        event.stopPropagation(); // prevent native change event from emitting its own object through output 'change'
    }

    private _emitChangeEvent(): void {
        this.onChange(this.checked);
        this.change.emit(new CheckboxChangeEvent(this, this.checked));
    }

    _onBlur(): void {
        this.onTouch();
    }
}
