import {
    AfterContentInit,
    Component,
    ContentChild,
    ContentChildren,
    HostBinding,
    ViewEncapsulation,
    Input,
    ElementRef,
    OnDestroy
} from '@angular/core';
import type {QueryList} from '@angular/core';
import {HcFormControlComponent} from './hc-form-control.component';
import {HcErrorComponent} from './hc-error.component';
import {HcPrefixDirective} from './hc-prefix.directive';
import {HcSuffixDirective} from './hc-suffix.directive';
import {HcLabelComponent} from './hc-label.component';
import {parseBooleanAttribute} from '../util';
import {InputDirective} from '../input/input.directive';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

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
export class HcFormFieldComponent implements AfterContentInit, OnDestroy {
    private _inline = false;
    private _tight = false;
    private unsubscribe$ = new Subject<void>();

    @ContentChild(HcFormControlComponent)
    _control: HcFormControlComponent;
    @ContentChildren(HcFormControlComponent)
    _controls: QueryList<HcFormControlComponent>;
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
    get _disabledClass(): boolean {
        if (this._inputChildren.length > 0) {
            return this._inputChildren.first.disabled;
        } else {
            return this._control._isDisabled;
        }
    }

    /** Read-only boolean value of whether the form field has an associated label element */
    get hasLabel(): boolean {
        return !!this._labelChildren.length;
    }

    /** Read-only boolean value of whether the form field has an input element */
    get hasInput(): boolean {
        return !!this._inputChildren.length;
    }

    public _hasFocusedInput = false;

    /** Whether the form elements should be stacked (default), or inline */
    @Input()
    get inline(): boolean {
        return this._inline;
    }

    set inline(isInline: boolean) {
        this._inline = parseBooleanAttribute(isInline);
    }

    /** If true, condense the default padding on all included elements and reduce the font size. *Defaults to `false`.*  */
    @Input()
    get tight(): boolean {
        return this._tight;
    }
    set tight(value: boolean) {
        this._tight = parseBooleanAttribute(value);
        this._updateTightControls();
    }

    public _mobileInput = false;

    constructor(private _elementRef: ElementRef<HTMLInputElement>) {}

    ngAfterContentInit(): void {
        if (!this._control) {
            throw getControlMissing();
        } else {
            this._updateTightControls();
            // Pass the current tight setting to controls that are added dynamically to the FormField
            this._controls.changes.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this._updateTightControls());
        }

        // wire up focus and mobile listeners for hcInputs
        if (this.hasInput) {
            this._inputChildren.first.focusChanged.pipe(takeUntil(this.unsubscribe$)).subscribe(focused => {
                this._hasFocusedInput = focused;
            });

            this._inputChildren.first.mobileChange.pipe(takeUntil(this.unsubscribe$)).subscribe(mobileVal => {
                this._mobileInput = mobileVal;
            });
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    _updateTightControls(): void {
        if (this._controls) {
            this._controls.forEach(control => {
                control._tight = this._tight;
            });
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
