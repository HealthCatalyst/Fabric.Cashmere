/* tslint:disable:directive-selector */

import {Directive, forwardRef, HostBinding, Provider} from '@angular/core';
import {CheckboxRequiredValidator, NG_VALIDATORS} from '@angular/forms';

export const HC_CHECKBOX_REQUIRED_VALIDATOR: Provider = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => HcCheckboxRequiredValidatorDirective),
    multi: true
};

/** @docs-private */
@Directive({
    selector: `hc-checkbox[required][formControlName],
             hc-checkbox[required][formControl],hc-checkbox[required][ngModel]`,
    providers: [HC_CHECKBOX_REQUIRED_VALIDATOR]
})
export class HcCheckboxRequiredValidatorDirective extends CheckboxRequiredValidator {
    @HostBinding('attr.required')
    get isRequired(): string | null {
        return this.required ? '' : null;
    }
}
