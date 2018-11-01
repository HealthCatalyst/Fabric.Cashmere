import {Component, ViewEncapsulation} from '@angular/core';

/** Wrapper component that textual form controls extend to work with hc-form-field */
@Component({
    selector: 'hc-form-control',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class HcFormControlComponent {
    /** Whether the control should be displaying an associated error */
    _errorState: boolean = false;

    /** Whether the control is disabled */
    _isDisabled: boolean = false;

    /** ID identifier of the the control */
    _componentId: string;

    /** Whether the control is required */
    _isRequired: boolean = false;
}
