import {Component, ViewEncapsulation} from '@angular/core';

/** Label for HcFormFieldComponent */
@Component({
    selector: 'hc-label',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class HcLabelComponent {}
