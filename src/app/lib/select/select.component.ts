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
  disabledAlpha = 0.4;
  enabledAlpha = 1.0;
  _value: string;
  onChange: any = () => { };
  onTouched: any = () => { };

  get alpha() {
    return this.disabled ? 0.4 : 1.0;
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
      this.value = value;
    }
  }

}
