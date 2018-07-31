import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    HostBinding,
    Inject,
    Input,
    OnInit,
    Optional,
    Output
} from '@angular/core';
import {RadioGroupDirective} from './radio-group.directive';
import {parseBooleanAttribute} from '../util';

let nextUniqueId = 0;

export class RadioButtonChangeEvent {
    constructor(public source: RadioButtonComponent | null, public value: any) {}
}

/** Radio buttons allow the user to choose only one of a predefined set of mutually exclusive options. */
@Component({
    selector: 'hc-radio-button',
    templateUrl: './radio-button.component.html',
    styleUrls: ['./radio-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonComponent implements OnInit {
    private _uniqueId = `hc-radio-button-${nextUniqueId++}`;
    /** Element id for the radio button. Auto-generated id will be used if none is set */
    @Input() id: string = this._uniqueId;
    /** Name of radio button */
    @Input() name: string;
    /** Event emitted when the value of the radio button changes */
    @Output() change = new EventEmitter<RadioButtonChangeEvent>();
    private _checked: boolean = false;
    private _value: any = null;
    private _required: boolean = false;
    private _disabled: boolean = false;
    private readonly radioGroup: RadioGroupDirective;

    /** Value of radio buttons */
    @Input()
    get value() {
        return this._value;
    }

    set value(value: any) {
        if (this._value !== value) {
            this._value = value;
            if (this.radioGroup !== null && !this.checked) {
                this.checked = this.radioGroup.value === value;
            } else if (this.radioGroup !== null && this.checked) {
                this.radioGroup.selected = this;
            }
        }
    }

    @HostBinding('attr.id')
    get _getHostId(): string {
        return this._uniqueId;
    }

    /** Boolean value of whether the radio button is required */
    @Input()
    get required(): boolean {
        return this._required || (this.radioGroup && this.radioGroup.required);
    }

    set required(required) {
        this._required = parseBooleanAttribute(required);
    }

    /** Boolean value that enables/disables the radio button */
    @Input()
    get disabled(): boolean {
        return this._disabled || (this.radioGroup && this.radioGroup.disabled);
    }

    set disabled(isDisabled) {
        this._disabled = parseBooleanAttribute(isDisabled);
    }

    /** Boolean that returns whether the radio button is selected */
    @Input()
    get checked(): boolean {
        return this._checked;
    }

    set checked(value: boolean) {
        let newCheckedState = parseBooleanAttribute(value);
        if (this._checked !== newCheckedState) {
            this._checked = newCheckedState;
            if (newCheckedState && this.radioGroup && this.radioGroup.value !== this.value) {
                this.radioGroup.selected = this;
            } else if (!newCheckedState && this.radioGroup && this.radioGroup.value === this.value) {
                this.radioGroup.selected = null;
            }
            this.cdRef.markForCheck();
        }
    }

    get _inputId() {
        if (this.id) {
            return this.id;
        }
        return `${this._uniqueId}-input`;
    }

    constructor(
        @Optional()
        @Inject(forwardRef(() => RadioGroupDirective))
        radioGroup: RadioGroupDirective,
        private cdRef: ChangeDetectorRef
    ) {
        this.radioGroup = radioGroup;
    }

    ngOnInit() {
        if (this.radioGroup !== null) {
            this.checked = this.radioGroup.value === this._value;
            this.name = this.radioGroup.name;
        }
    }

    _onInputClick(event: Event) {
        event.stopPropagation();
    }

    _onInputChange(event: Event) {
        event.stopPropagation();
        const valueChanged = this.radioGroup && this.value !== this.radioGroup.value;
        this.checked = true;
        this._emitChangeEvent();
        if (this.radioGroup !== null) {
            this.radioGroup._onChangeFn(this.value);
            this.radioGroup._touch();
            if (valueChanged) {
                this.radioGroup._emitChangeEvent();
            }
        }
    }

    private _emitChangeEvent(): void {
        this.change.emit(new RadioButtonChangeEvent(this, this.value));
    }

    _markForCheck() {
        this.cdRef.markForCheck();
    }
}
