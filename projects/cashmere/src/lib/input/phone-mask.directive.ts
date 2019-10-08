import { Directive, Input, AfterViewInit, OnDestroy, Renderer2, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SubscriptionLike } from 'rxjs';

@Directive({
  selector: '[hcPhoneMask]'
})
export class PhoneMaskDirective implements AfterViewInit, OnDestroy {

  private _phoneControl: AbstractControl;
  private _preValue: string;

  @Input()
  set phoneControl(control: AbstractControl) {
    this._phoneControl = control;
  }
  @Input()
  set preValue(value: string) {
    this._preValue = value;
  }
  private sub: SubscriptionLike;

  constructor( private renderer: Renderer2, private _view: ViewContainerRef) {}

  ngAfterViewInit() {
    let component_id: string = '#' + (this._view).element.nativeElement.id;
    this.phoneValidate(component_id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  phoneValidate(id: string) {
    this.sub = this._phoneControl.valueChanges.subscribe(data => {
        let preInputValue: string = this._preValue;
        let lastChar: string = preInputValue.substr(preInputValue.length - 1);
        // Allow only numeric characters
        let newVal = data.replace(/\D/g, '');
        let start = this.renderer.selectRootElement(id).selectionStart;
        let end = this.renderer.selectRootElement(id).selectionEnd;
        // If deleting input characters
        if (data.length < preInputValue.length) {
            // Adjustment if character removed is ')'
            if (preInputValue.length < start) {
                if (lastChar === ')') {
                    newVal = newVal.substr(0, newVal.length - 1);
                }
            }
            // If no numbers then reset
            if (newVal.length === 0) {
                newVal = '';
            } else if (newVal.length <= 3) {
                // Change pattern match on delete to recognize non-numeric chars
                newVal = newVal.replace(/^(\d{0,3})/, '($1');
            } else if (newVal.length <= 6) {
                newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
            } else {
                newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) $2-$3');
            }
            this._phoneControl.setValue(newVal, {emitEvent: false});
            this.renderer.selectRootElement(id).setSelectionRange(start, end);
        // If adding input characters
        } else {
            let removedD = data.charAt(start);
            // Don't show braces for empty value
            if (newVal.length === 0) {
                newVal = '';
            } else if (newVal.length <= 3) {
                // Don't show braces for empty groups at the end
                newVal = newVal.replace(/^(\d{0,3})/, '($1)');
            } else if (newVal.length <= 6) {
                newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
            } else {
                newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) $2-$3');
            }
            // Check if in the process of typing a number out
            if (preInputValue.length >= start) {
                // Change cursor position after adding special characters
                switch (removedD) {
                case '(':
                case ')':
                case '-':
                    start += 1; end += 1;
                break;
                case ')':
                    start += 2; end += 2;
                break;
                }
                this._phoneControl.setValue(newVal, {emitEvent: false});
                this.renderer.selectRootElement(id).setSelectionRange(start, end);
            } else {
                this._phoneControl.setValue(newVal, {emitEvent: false});
                this.renderer.selectRootElement(id).setSelectionRange(start + 2, end + 2);
            }
        }
    });
  }
}