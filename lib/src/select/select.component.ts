import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'hc-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {

  @Input() placeholder: string;
  @Input() options: Array<string> = [];
  @Input() disabled: boolean = false;
  closed: boolean = true;
  disabledAlpha = 0.4;
  enabledAlpha = 1.0;
  _value: string;
  onChange: any = () => { };
  onTouched: any = () => { };

  get alpha() {
    return this.disabled ? this.disabledAlpha : this.enabledAlpha;
  }

  get value() {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  constructor() {}

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: string) {
    if (value) {
      this._value = value;
    }
  }

  toggleArrow(element: Element) {
      this.closed = !this.closed;
      (element.parentElement as Element).className = this.closed ? 'closed' : 'open';
  }

  resetArrow(element: Element) {
      this.closed = true;
      (element.parentElement as Element).className = 'closed';
  }

}
