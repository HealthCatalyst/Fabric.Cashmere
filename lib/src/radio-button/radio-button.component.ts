import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    HostBinding, Inject,
    Input,
    OnInit,
    Optional,
    Output,
} from '@angular/core';
import { RadioGroupDirective } from './radio-group.directive';
import { parseBooleanAttribute } from '../util';

let nextUniqueId = 0;

export class RadioButtonChangeEvent {
    constructor(public source: RadioButtonComponent | null, public value: any) {
    }
}


@Component({
    selector: 'hc-radio-button',
    templateUrl: './radio-button.component.html',
    styleUrls: ['./radio-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonComponent implements OnInit {
    private uniqueId = `hc-radio-button-${nextUniqueId++}`;
    @Input() id: string = this.uniqueId;
    @Input() name: string;
    @Output() change = new EventEmitter<RadioButtonChangeEvent>();
    private _checked: boolean = false; // radio is selected
    private _value: any = null; // value of radio button
    private _required: boolean = false;
    private _disabled: boolean = false;
    private readonly radioGroup: RadioGroupDirective;

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
    get getHostId(): string {
        return this.uniqueId;
    }

    @Input()
    get required(): boolean {
        return this._required || (this.radioGroup && this.radioGroup.required);
    }

    set required(required) {
        this._required = parseBooleanAttribute(required);
    }

    @Input()
    get disabled(): boolean {
        return this._disabled || (this.radioGroup && this.radioGroup.disabled);
    };

    set disabled(isDisabled) {
        this._disabled = parseBooleanAttribute(isDisabled);
    }

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

    get inputId() {
        if (this.id) {
            return this.id;
        }
        return `${this.uniqueId}-input`;
    }

    constructor(@Optional() @Inject(forwardRef(() => RadioGroupDirective)) radioGroup: RadioGroupDirective,
                private cdRef: ChangeDetectorRef) {

        this.radioGroup = radioGroup;
    }

    ngOnInit() {
        if (this.radioGroup !== null) {
            this.checked = this.radioGroup.value === this._value;
            this.name = this.radioGroup.name;
        }
    }

    onInputClick(event: Event) {
        event.stopPropagation();
    }

    onInputChange(event: Event) {
        event.stopPropagation();
        const valueChanged = this.radioGroup && this.value !== this.radioGroup.value;
        this.checked = true;
        this.emitChangeEvent();
        if (this.radioGroup !== null) {
            this.radioGroup._onChangeFn(this.value);
            this.radioGroup.touch();
            if (valueChanged) {
                this.radioGroup.emitChangeEvent();
            }
        }
    }

    private emitChangeEvent(): void {
        this.change.emit(new RadioButtonChangeEvent(this, this.value));
    }

    markForCheck() {
        this.cdRef.markForCheck();
    }
}

