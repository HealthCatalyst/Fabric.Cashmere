import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    Directive,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    OnInit,
    Optional,
    Output,
    QueryList,
    DoCheck,
    Self,
    ElementRef
} from '@angular/core';
import {parseBooleanAttribute} from '../util';
import {HcFormControlComponent} from '../form-field/hc-form-control.component';
import {ControlValueAccessor, NgForm, FormGroupDirective, NgControl} from '@angular/forms';

let nextUniqueId = 0;

/** Groups single button-toggles together into a set for which only one can be selected */
@Directive({
    // tslint:disable:directive-selector
    selector: 'hc-button-toggle-group',
    providers: [{provide: HcFormControlComponent, useExisting: forwardRef(() => ButtonToggleGroupDirective), multi: true}],
    exportAs: 'hcButtonToggleGroup'
})
export class ButtonToggleGroupDirective extends HcFormControlComponent implements ControlValueAccessor, AfterContentInit, DoCheck {
    @HostBinding('class.hc-button-toggle-group')
    _horizontalClass: boolean = false;

    /** Event emitted when the value of a button toggle changes inside the group. */
    @Output()
    change: EventEmitter<ButtonToggleChangeEvent> = new EventEmitter<ButtonToggleChangeEvent>();
    /** A list of all the button toggle items included in the group */
    @ContentChildren(
        forwardRef(() => ButtonToggleComponent),
        {descendants: true}
    )
    radios: QueryList<ButtonToggleComponent>;
    private _value: any = null;
    private _uniqueName = `hc-button-toggle-group-${nextUniqueId++}`;
    private _name = this._uniqueName;
    private _inline = false;
    private _tight: boolean = false;
    private _initialized = false; // if value of button toggle group has been set to initial value
    private _selected: ButtonToggleComponent | null = null; // the currently selected radio
    private _form: NgForm | FormGroupDirective | null;

    _componentId = this._name;

    _onChangeFn: (value: any) => void = () => {};
    _onTouchFn: () => any = () => {};

    /** Name of button toggle group. Auto-generated name will be used if no name is set */
    @Input()
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value ? value : this._uniqueName;
        this._updateButtonToggleNames();
    }

    /** Unique id for the button toggle group. If none is supplied, defaults to name. */
    @Input()
    get id(): string {
        return this._componentId || this._name;
    }

    set id(idVal: string) {
        this._componentId = idVal ? idVal : this._name;
    }

    /** Value of radio buttons */
    @Input()
    get value(): any {
        return this._value;
    }

    set value(newValue: any) {
        if (this._value !== newValue) {
            this._value = newValue;
            this._updateSelectedButtonToggle();
            this._checkSelectedButtonToggle();
        }
    }

    /** Boolean value that enables/disables the button toggle group */
    @Input()
    get disabled(): boolean {
        if (this._ngControl && this._ngControl.disabled) {
            return this._ngControl.disabled;
        }
        return this._isDisabled;
    }

    set disabled(value) {
        this._isDisabled = parseBooleanAttribute(value);
        this._markRadiosForCheck();
    }

    /** Boolean value of whether the button toggle group is required on a form */
    @Input()
    get required(): boolean {
        return this._isRequired;
    }

    set required(value) {
        this._isRequired = parseBooleanAttribute(value);
        this._markRadiosForCheck();
    }

    /** Gets and sets the currently selected value of the button toggle group */
    get selected(): ButtonToggleComponent | null {
        return this._selected;
    }

    set selected(button: ButtonToggleComponent | null) {
        this._selected = button;
        this.value = button ? button.value : null;
        this._checkSelectedButtonToggle();
    }

    /** Sets the layout orientation of the button toggle group; defaults to false */
    @Input()
    get inline(): boolean {
        return this._inline;
    }

    set inline(value) {
        this._inline = parseBooleanAttribute(value);
        this._horizontalClass = this._inline;
    }

    /** If true, condense the default margin and reduce the font size on all contained radios. *Defaults to `false`.*  */
    // @Input()
    // get tight(): boolean {
    //     return this._tight;
    // }
    // set tight(value) {
    //     this._tight = parseBooleanAttribute(value);
    //     if (this._initialized) {
    //         setTimeout(() => this._markRadiosForCheck());
    //     }
    // }

    constructor(
        private _cdRef: ChangeDetectorRef,
        @Optional() _parentForm: NgForm,
        @Optional() _parentFormGroup: FormGroupDirective,
        @Optional()
        @Self()
        public _ngControl: NgControl
    ) {
        super();

        this._form = _parentForm || _parentFormGroup;
        if (this._ngControl != null) {
            this._ngControl.valueAccessor = this;
        }
    }

    ngAfterContentInit() {
        this._initialized = true;
    }

    writeValue(value: any) {
        this.value = value;
        this._cdRef.markForCheck();
    }

    registerOnChange(fn: any) {
        this._onChangeFn = fn;
    }

    registerOnTouched(fn: any) {
        this._onTouchFn = fn;
    }

    _touch() {
        if (this._onTouchFn) {
            this._onTouchFn();
        }
    }

    _emitChangeEvent(): void {
        if (this._initialized) {
            this.change.emit(new ButtonToggleChangeEvent(this._selected, this.value));
        }
    }

    private _markRadiosForCheck() {
        if (this.radios) {
            this.radios.forEach(buttonToggle => buttonToggle._markForCheck());
        }
    }

    private _updateSelectedButtonToggle() {
        let isAlreadySelected = this._selected !== null && this._selected.value === this._value;
        if (this.radios && !isAlreadySelected) {
            this._selected = null;
            this.radios.forEach(buttonToggle => {
                buttonToggle.checked = this.value === buttonToggle.value;
                if (buttonToggle.checked) {
                    this._selected = buttonToggle;
                }
            });
        }
    }

    private _checkSelectedButtonToggle() {
        if (this._selected && !this._selected.checked) {
            this._selected.checked = true;
        }
    }

    private _updateButtonToggleNames(): void {
        if (this.radios) {
            this.radios.forEach(buttonToggle => {
                buttonToggle.name = this.name;
            });
        }
    }

    ngDoCheck(): void {
        // This needs to be checked every cycle because we can't subscribe to form submissions
        if (this._ngControl) {
            this._updateErrorState();
        }
    }

    private _updateErrorState() {
        const oldState = this._errorState;

        // TODO: this could be abstracted out as an @Input() if we need this to be configurable
        const newState = !!(
            this._ngControl &&
            this._ngControl.invalid &&
            (this._ngControl.touched || (this._form && this._form.submitted))
        );

        if (oldState !== newState) {
            this._errorState = newState;
        }
    }
}

/** Event type that is emitted when a button toggle group changes */
export class ButtonToggleChangeEvent {
    /**
     * @param source the button toggle that fired the event
     * @param value the value of that radio button
     */
    constructor(public source: ButtonToggleComponent | null, public value: any) {}
}

/** Button toggles allow the user to choose only one of a predefined set of mutually exclusive options. */
@Component({
    selector: 'hc-button-toggle',
    templateUrl: './button-toggle.component.html',
    styleUrls: ['./button-toggle.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonToggleComponent implements OnInit {
    private _uniqueId = `hc-button-toggle-${nextUniqueId++}`;
    /** Element id for the radio button. Auto-generated id will be used if none is set */
    @Input()
    id: string = this._uniqueId;
    /** Name of button toggle */
    @Input()
    name: string;
    /** Event emitted when the value of the button toggle changes */
    @Output()
    change = new EventEmitter<ButtonToggleChangeEvent>();
    private _checked: boolean = false;
    private _value: any = null;
    private _required: boolean = false;
    private _disabled: boolean = false;
    private _tight: boolean = false;
    private readonly ButtonToggleGroup: ButtonToggleGroupDirective | null;

    /** Value of radio buttons */
    @Input()
    get value() {
        return this._value;
    }

    set value(value: any) {
        if (this._value !== value) {
            this._value = value;
            if (this.ButtonToggleGroup !== null && !this.checked) {
                this.checked = this.ButtonToggleGroup.value === value;
            } else if (this.ButtonToggleGroup !== null && this.checked) {
                this.ButtonToggleGroup.selected = this;
            }
        }
    }

    @HostBinding('attr.id')
    get _getHostId(): string {
        return this.id;
    }

    /** Boolean value of whether the button toggle is required */
    @Input()
    get required(): boolean {
        return this._required || (this.ButtonToggleGroup != null && this.ButtonToggleGroup.required);
    }

    set required(required) {
        this._required = parseBooleanAttribute(required);
    }

    /** Boolean value that enables/disables the button toggle */
    @Input()
    get disabled(): boolean {
        return this._disabled || (this.ButtonToggleGroup != null && this.ButtonToggleGroup.disabled);
    }

    set disabled(isDisabled) {
        this._disabled = parseBooleanAttribute(isDisabled);
    }

    /** Boolean that returns whether the button toggle is selected */
    @Input()
    get checked(): boolean {
        return this._checked;
    }

    set checked(value: boolean) {
        let newCheckedState = parseBooleanAttribute(value);
        if (this._checked !== newCheckedState) {
            this._checked = newCheckedState;
            if (newCheckedState && this.ButtonToggleGroup && this.ButtonToggleGroup.value !== this.value) {
                this.ButtonToggleGroup.selected = this;
            } else if (!newCheckedState && this.ButtonToggleGroup && this.ButtonToggleGroup.value === this.value) {
                this.ButtonToggleGroup.selected = null;
            }
            this.cdRef.markForCheck();
        }
    }

    get _inlineGroup(): boolean {
        if (this.ButtonToggleGroup !== null) {
            return this.ButtonToggleGroup.inline;
        } else {
            return false;
        }
    }

    /** If true, condense the default margin, reduce the font size, and decrease the circle size.
     * Inherits value from parent button toggle group if part of one. *Defaults to `false`.*  */
    @Input()
    get tight(): boolean {
        if (this.ButtonToggleGroup !== null) {
            return this.ButtonToggleGroup.tight;
        } else {
            return this._tight;
        }
    }
    set tight(value) {
        this._tight = parseBooleanAttribute(value);
    }

    get _inputId() {
        return `${this.id || this._uniqueId}-input`;
    }

    constructor(@Optional() ButtonToggleGroup: ButtonToggleGroupDirective, private cdRef: ChangeDetectorRef, public _elementRef: ElementRef) {
        this.ButtonToggleGroup = ButtonToggleGroup;
    }

    ngOnInit() {
        if (this.ButtonToggleGroup !== null) {
            this.checked = this.ButtonToggleGroup.value === this._value;
            this.name = this.ButtonToggleGroup.name;
        }
    }

    _onInputClick(event: Event) {
        event.stopPropagation();
    }

    _onInputChange(event: Event) {
        event.stopPropagation();
        const valueChanged = this.ButtonToggleGroup && this.value !== this.ButtonToggleGroup.value;
        this._emitChangeEvent();
        if (this.ButtonToggleGroup !== null) {
            this.ButtonToggleGroup._onChangeFn(this.value);
            this.ButtonToggleGroup._touch();
            if (valueChanged) {
                this.ButtonToggleGroup._emitChangeEvent();
                this.ButtonToggleGroup.value = this.value;
            }
        } else {
            this.checked = true;
        }
    }

    private _emitChangeEvent(): void {
        this.change.emit(new ButtonToggleChangeEvent(this, this.value));
    }

    _markForCheck() {
        this.cdRef.markForCheck();
    }
}
