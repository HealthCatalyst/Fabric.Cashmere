import { parseBooleanAttribute } from '../util';

/** Wrapper component that textual form controls extend to work with hc-form-field */
export abstract class HcFormControlComponent {
    /** Whether the control should be displaying an associated error */
    _errorState = false;

    /** An error message to be shown in the UI when there is an error state present */
    _errorMessage = '';

    /** An object that represents the Angular validation errors that are present on the form */
    _errors: {
        [key: string]: any;
    } = {};

    /** Whether the control is disabled */
    _isDisabled = false;

    /** ID identifier of the the control */
    _componentId: string;

    /** Whether the control is required */
    _isRequired = false;

    /** Whether the control should apply tight styling */
    _tight = false;
}
