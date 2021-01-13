/* tslint:disable:directive-selector */

import {Directive, forwardRef, HostBinding, Input, Provider} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, RequiredValidator, ValidationErrors, Validator, Validators} from '@angular/forms';

export const HC_CHECKBOX_REQUIRED_VALIDATOR: Provider = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => HcCheckboxRequiredValidatorDirective),
    multi: true
};

/** @docs-private */
@Directive({
    selector: `hc-checkbox[required][formControlName],hc-checkbox[required][formControl],hc-checkbox[required][ngModel]`,
    providers: [HC_CHECKBOX_REQUIRED_VALIDATOR]
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
