import {Component, HostBinding, ViewEncapsulation} from '@angular/core';

/** Label for HcFormFieldComponent */
@Component({
    selector: 'hc-label',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class HcLabelComponent {
    @HostBinding('class.hc-label') _hostHcLabelClass = true;
}
