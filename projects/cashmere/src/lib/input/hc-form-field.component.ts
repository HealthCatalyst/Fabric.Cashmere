import {AfterContentInit, Component, ContentChild, ContentChildren, HostBinding, QueryList, ViewEncapsulation, Input} from '@angular/core';
import {InputDirective} from './input.directive';
import {HcErrorComponent} from './hc-error.component';
import {HcPrefixDirective} from './hc-prefix.directive';
import {HcSuffixDirective} from './hc-suffix.directive';
import {parseBooleanAttribute} from '../util';

export function getInputContainerControlMissing(): Error {
    return new Error(`InputContainerComponent must contain a hcInput.
     Make sure to add hcInput to the native input or textarea element`);
}

/** Container for form fields that applies Cashmere styling and behavior */
@Component({
    selector: 'hc-form-field',
    templateUrl: './hc-form-field.component.html',
    styleUrls: ['./hc-form-field.component.scss', './input.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HcFormFieldComponent implements AfterContentInit {
    private _inline: boolean = false;

    @ContentChild(InputDirective) _control: InputDirective;
    @ContentChildren(HcErrorComponent) _errorChildren: QueryList<HcErrorComponent>;
    @ContentChildren(HcPrefixDirective) _prefixChildren: QueryList<HcPrefixDirective>;
    @ContentChildren(HcSuffixDirective) _suffixChildren: QueryList<HcSuffixDirective>;

    @HostBinding('class.hc-form-field') _classHcFormFieldClass = true;

    @HostBinding('class.hc-form-field-disabled')
    get _disabledClass() {
        return this._control.disabled;
    }

    /** Whether the form elements should be stacked (default), or inline */
    @Input()
    get inline(): boolean {
        return this._inline;
    }

    set inline(isInline) {
        this._inline = parseBooleanAttribute(isInline);
    }

    ngAfterContentInit(): void {
        if (!this._control) {
            throw getInputContainerControlMissing();
        }
    }

    _shouldShowErrorMessages(): boolean {
        return this._errorChildren && this._errorChildren.length > 0 && this._control._errorState;
    }
}
