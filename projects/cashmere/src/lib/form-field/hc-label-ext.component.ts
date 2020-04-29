import {Component, HostBinding, ViewEncapsulation} from '@angular/core';

/** Container for additional label content for HcFormFieldComponent */
@Component({
    selector: 'hc-label-ext',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class HcLabelExtensionComponent {
    @HostBinding('class.hc-form-field-label-extension')
    _hostHcLabelClass = true;
}
