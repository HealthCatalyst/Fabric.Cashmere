/* tslint:disable:component-selector */

import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'hc-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
    @Input() name: string;
    @Input() disabled: boolean = false;
    @Input() model: boolean;

    constructor() {
    }

    ngOnInit() {
        this.disabled = <any>this.disabled === 'true';
    }
}
