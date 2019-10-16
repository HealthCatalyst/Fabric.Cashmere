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

                if (beforeDecimal.length === 0) {
                    newVal = '';
                } else if (beforeDecimal.length < 4) {
                    beforeDecimal = beforeDecimal.replace(/^(\d{0,3})/, '$1');
                } else if (beforeDecimal.length < 7) {
                    beforeDecimal = beforeDecimal.replace(/^(\d{1,3})(\d{3})/, '$1,$2');
                } else if (beforeDecimal.length < 12) {
                    beforeDecimal = beforeDecimal.replace(/^(\d{1,3})(\d{3})(\d{3})/, '$1,$2,$3');
                }
                console.log(afterDecimal.length);
                if (afterDecimal.length > 3) {
                    afterDecimal = afterDecimal.substr(0, afterDecimal.length - 1);
                }
                newVal = beforeDecimal + afterDecimal;
                this._currencyControl.setValue(newVal, {emitEvent: false});
            // If there is no decimal
            } else {
                if (newVal.length === 0) {
                    newVal = '';
                } else if (newVal.length < 4) {
                    newVal = newVal.replace(/^(\d{0,3})/, '$1');
                } else if (newVal.length < 7) {
                    newVal = newVal.replace(/^(\d{1,3})(\d{3})/, '$1,$2');
                } else if (newVal.length < 10) {
                    newVal = newVal.replace(/^(\d{1,3})(\d{3})(\d{3})/, '$1,$2,$3');
                }
                this._currencyControl.setValue(newVal, {emitEvent: false});
            }
        });
    }
}