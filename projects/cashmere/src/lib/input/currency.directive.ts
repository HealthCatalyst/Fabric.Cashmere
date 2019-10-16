import { Directive, Input, AfterViewInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SubscriptionLike } from 'rxjs';

@Directive({
    selector: '[hcCurrency]'
})

export class CurrencyDirective implements AfterViewInit, OnDestroy {

    private _currencyControl: AbstractControl;

    @Input()
    set currencyControl(control: AbstractControl) {
      this._currencyControl = control;
    }
    private sub: SubscriptionLike;

    constructor( private _view: ViewContainerRef) {}

    ngAfterViewInit() {
      let component_id: string = '#' + (this._view).element.nativeElement.id;
      this.currencyValidate(component_id);
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }

    currencyValidate(id: string) {
        this.sub = this._currencyControl.valueChanges.subscribe(data => {
            // Allow only numbers and "." to be typed
            let newVal = data.replace(/[^.\d]/g, '');
            let decimalPlace = newVal.indexOf('.');

            // If there is a decimal
            if (decimalPlace > -1) {
                let beforeDecimal = newVal.slice(0, decimalPlace);
                let afterDecimal = newVal.slice(decimalPlace);

                beforeDecimal = this.formatNumber(beforeDecimal);
                if (afterDecimal.length > 3) {
                    afterDecimal = afterDecimal.substr(0, afterDecimal.length - 1);
                }
                newVal = beforeDecimal + afterDecimal;
                this._currencyControl.setValue(newVal, {emitEvent: false});
            // If there is no decimal
            } else {
                newVal = this.formatNumber(newVal);
                this._currencyControl.setValue(newVal, {emitEvent: false});
            }
        });
    }

    formatNumber(val: string) {
        let formatted = '';
        if (val.length === 0) {
            return formatted;
        } else if (val.length < 4) {
            formatted = val.replace(/^(\d{0,3})/, '$1');
        } else if (val.length < 7) {
            formatted = val.replace(/^(\d{1,3})(\d{3})/, '$1,$2');
        } else if (val.length < 10) {
            formatted = val.replace(/^(\d{1,3})(\d{3})(\d{3})/, '$1,$2,$3');
        }
        return formatted;
    }
}