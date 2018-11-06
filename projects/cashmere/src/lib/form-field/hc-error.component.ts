import {Component, HostBinding, ViewEncapsulation} from '@angular/core';

/** Single error to be shown under HcFormFieldComponent */
@Component({
    selector: 'hc-error',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class HcErrorComponent {
    @HostBinding('class.hc-error')
    _hostClass = true;
}
