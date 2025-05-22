import {Directive, forwardRef, Input, Provider} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, Validators} from '@angular/forms';

export const HC_CHECKBOX_REQUIRED_VALIDATOR: Provider = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => HcCheckboxRequiredValidatorDirective),
    multi: true
};

/** @docs-private */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: `hc-checkbox[required][formControlName],hc-checkbox[required][formControl],hc-checkbox[required][ngModel]`,
    providers: [HC_CHECKBOX_REQUIRED_VALIDATOR],
    standalone: false
})
export class HcCheckboxRequiredValidatorDirective implements Validator {
    private _required = false;
    private _onChange?: () => void;

    validate(control: AbstractControl): ValidationErrors | null {
        return this.required ? Validators.requiredTrue(control) : null;
    }

    @Input()
    get required(): boolean | string {
        return this._required;
    }

    set required(value: boolean | string) {
        this._required = value != null && value !== false && `${value}` !== 'false';
        if (this._onChange) {
            this._onChange();
        }
    }

    registerOnValidatorChange(fn: () => void): void {
        this._onChange = fn;
    }
}
