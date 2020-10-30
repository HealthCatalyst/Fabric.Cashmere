import {Directive, Input, ContentChildren, AfterContentInit, OnDestroy} from '@angular/core';
import type {QueryList} from '@angular/core';
import {parseBooleanAttribute} from '../util';
import {HcFormFieldComponent} from './hc-form-field.component';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

/** `hcForm` directive that allows settings to be applied to all included HcFormFields */
@Directive({
    selector: '[hcForm]'
})
export class HcFormDirective implements AfterContentInit, OnDestroy {
    private _tight: boolean = false;
    private unsubscribe$ = new Subject<void>();

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
