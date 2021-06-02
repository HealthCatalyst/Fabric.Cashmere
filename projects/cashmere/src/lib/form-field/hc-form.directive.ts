import {Directive, Input, ContentChildren, AfterContentInit, OnDestroy} from '@angular/core';
import type {QueryList} from '@angular/core';
import {parseBooleanAttribute} from '../util';
import {HcFormFieldComponent, validateInputSize} from './hc-form-field.component';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

export const supportedSizes = ['normal', 'tight', 'mobile'];

/** `hcForm` directive that allows settings to be applied to all included HcFormFields */
@Directive({
    selector: '[hcForm]'
})
export class HcFormDirective implements AfterContentInit, OnDestroy {
    private _tight: boolean = false;
    private unsubscribe$ = new Subject<void>();
    private _inputSize: string = 'normal';

    @ContentChildren(HcFormFieldComponent)
    _formFields: QueryList<HcFormFieldComponent>;

    /** Set the tight parameter on all enclosed HcFormFields. *Defaults to `false`.*  */
    @Input()
    get tight(): boolean {
        return this._tight;
    }
    set tight(value) {
        this._tight = parseBooleanAttribute(value);
        this._updateTightFields();
    }

    /** All inputs font-size will be 14px by default and 16px for mobile view */
    @Input()
    get fieldStyle(): string {
        return this._inputSize;
    }

    set fieldStyle(fieldStyleSize: string) {
        validateInputSize(fieldStyleSize, 'HcFormDirective');
        if ( supportedSizes.indexOf(fieldStyleSize) < 0 ) {
            fieldStyleSize = "form-field-fieldStyle-" + fieldStyleSize;
        }
        this._inputSize = fieldStyleSize;
    }

    ngAfterContentInit(): void {
        this._updateTightFields();
        // Pass the tight setting to any FormFields added dynamically
        this._formFields.changes.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this._updateTightFields());
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    _updateTightFields() {
        if (this._formFields) {
            this._formFields.forEach(field => {
                field.tight = this._tight;
            });
        }
    }
}
