/* tslint:disable:component-selector */

import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

type CheckboxColor = 'dark' | 'light';

@Component({
    selector: 'hc-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {
    @Input() color: CheckboxColor = 'light';
    @Input() label: string;
    @Input() name: string;
    @Input() disabled: boolean = false;

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        this.disabled = <any>this.disabled === 'true';
    }

    writeValue(value: any) {
    }

    registerOnChange(fn: (value: any) => void) {
    }

    registerOnTouched(fn: any) {
    }

    setDisabledState(isDisabled: boolean) {
    }
}
