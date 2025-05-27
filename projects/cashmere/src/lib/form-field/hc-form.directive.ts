import {Directive, Input, ContentChildren, AfterContentInit, OnDestroy} from '@angular/core';
import type {QueryList} from '@angular/core';
import {parseBooleanAttribute} from '../util';
import {HcFormFieldComponent} from './hc-form-field.component';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

/** `hcForm` directive that allows settings to be applied to all included HcFormFields */
@Directive({
    selector: '[hcForm]',
    standalone: false
})
export class HcFormDirective implements AfterContentInit, OnDestroy {
    private _tight = false;
    private unsubscribe$ = new Subject<void>();

    @ContentChildren(HcFormFieldComponent, {descendants: true})
    _formFields: QueryList<HcFormFieldComponent>;

    /** Set the tight parameter on all enclosed HcFormFields. *Defaults to `false`.*  */
    @Input()
    get tight(): boolean {
        return this._tight;
    }
    set tight(value: boolean) {
        this._tight = parseBooleanAttribute(value);
        this._updateTightFields();
    }

    ngAfterContentInit(): void {
        this._updateTightFields();
        // Pass the tight setting to any FormFields added dynamically
        this._formFields.changes.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this._updateTightFields());
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    _updateTightFields(): void {
        if (this._formFields) {
            this._formFields.forEach(field => {
                field.tight = this._tight;
            });
        }
    }
}
