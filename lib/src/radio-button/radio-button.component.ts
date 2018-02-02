import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'hc-radio-button',
    templateUrl: './radio-button.component.html',
    styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {

    @Input() disabled: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

}
