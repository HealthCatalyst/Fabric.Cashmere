import {
    AfterContentInit,
    Component,
    ContentChild,
    ContentChildren,
    HostBinding,
    QueryList,
    ViewEncapsulation,
    Input,
    ElementRef
} from '@angular/core';
import {HcFormControlComponent} from './hc-form-control.component';
import {HcErrorComponent} from './hc-error.component';
import {HcPrefixDirective} from './hc-prefix.directive';
import {HcSuffixDirective} from './hc-suffix.directive';
import {HcLabelComponent} from './hc-label.component';
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

    @ContentChild(HcFormControlComponent)
    _control: HcFormControlComponent;
    @ContentChildren(HcErrorComponent)
    _errorChildren: QueryList<HcErrorComponent>;
    @ContentChildren(HcPrefixDirective)
    _prefixChildren: QueryList<HcPrefixDirective>;
    @ContentChildren(HcSuffixDirective)
    _suffixChildren: QueryList<HcSuffixDirective>;
    @ContentChildren(InputDirective)
    _inputChildren: QueryList<InputDirective>;
    @ContentChildren(HcLabelComponent)
    _labelChildren: QueryList<HcLabelComponent>;

    @HostBinding('class.hc-form-field')
    _classHcFormFieldClass = true;

    @HostBinding('class.hc-form-field-disabled')
    get _disabledClass() {
        return this._control._isDisabled;
    }

    /** Read-only boolean value of whether the form field has an associated label element */
    get hasLabel(): boolean {
        return !!this._labelChildren.length;
    }

    /** Read-only boolean value of whether the form field has an input element */
    get hasInput(): boolean {
        return !!this._inputChildren.length;
    }

    /** Whether the form elements should be stacked (default), or inline */
    @Input()
    get inline(): boolean {
        return this._inline;
    }

    set inline(isInline) {
        this._inline = parseBooleanAttribute(isInline);
    }

    /** If true, remove the default padding-bottom. Defaults to false  */
    @Input()
    get tight(): boolean {
        return this._tight;
    }
    set tight(value) {
        this._tight = parseBooleanAttribute(value);
    }
    private _tight: boolean = false;

    constructor(private _elementRef: ElementRef<HTMLInputElement>) {}

    ngAfterContentInit(): void {
        if (!this._control) {
            throw getControlMissing();
        }
    }

    getConnectedOverlayOrigin(): ElementRef {
        return this._elementRef;
    }

    _shouldShowErrorMessages(): boolean {
        return (
            this._control._errorState &&
            ((this._errorChildren && this._errorChildren.length > 0) ||
                (!!this._control._errorMessage && this._control._errorMessage.length > 0))
        );
    }
}
