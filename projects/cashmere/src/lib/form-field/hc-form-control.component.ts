import {Component, ViewEncapsulation} from '@angular/core';

/** Wrapper component that textual form controls extend to work with hc-form-field */
@Component({
    selector: 'hc-form-control',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class HcFormControlComponent {
    /** Whether the control should be displaying an associated error */
    errorState: boolean = false;

    /** Whether the control is disabled */
    isDisabled: boolean = false;

    /** ID identifier of the the control */
    componentId: string;

    /** Whether the control is required */
    isRequired: boolean = false;
}
