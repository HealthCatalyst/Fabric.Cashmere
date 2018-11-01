import {AfterContentInit, Component, ContentChild, ContentChildren, HostBinding, QueryList, ViewEncapsulation, Input} from '@angular/core';
import {HcFormControlComponent} from './hc-form-control.component';
import {HcErrorComponent} from './hc-error.component';
import {HcPrefixDirective} from './hc-prefix.directive';
import {HcSuffixDirective} from './hc-suffix.directive';
import {parseBooleanAttribute} from '../util';
import {InputDirective} from '../input/input.directive';

export function getControlMissing(): Error {
    return new Error(`HcFormField must contain a component that extends HcFormControl`);
}

/** Container for form fields that applies Cashmere styling and behavior */
@Component({
    selector: 'hc-form-field',
    templateUrl: './hc-form-field.component.html',
    styleUrls: ['./hc-form-field.component.scss', '../input/input.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HcFormFieldComponent implements AfterContentInit {
    private _inline: boolean = false;

    @ContentChild(HcFormControlComponent) _control: HcFormControlComponent;
    @ContentChildren(HcErrorComponent) _errorChildren: QueryList<HcErrorComponent>;
    @ContentChildren(HcPrefixDirective) _prefixChildren: QueryList<HcPrefixDirective>;
    @ContentChildren(HcSuffixDirective) _suffixChildren: QueryList<HcSuffixDirective>;
    @ContentChildren(InputDirective) _inputChildren: QueryList<InputDirective>;

    @HostBinding('class.hc-form-field') _classHcFormFieldClass = true;

    @HostBinding('class.hc-form-field-disabled')
    get _disabledClass() {
        return this._control._isDisabled;
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
            throw getControlMissing();
        }
    }

    _shouldShowErrorMessages(): boolean {
        return this._errorChildren && this._errorChildren.length > 0 && this._control._errorState;
    }
}
