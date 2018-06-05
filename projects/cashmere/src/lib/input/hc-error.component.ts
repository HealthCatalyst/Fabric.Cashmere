import {Component, HostBinding, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'hc-error',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class HcErrorComponent {
    @HostBinding('class.hc-error') hostClass = true;
}
