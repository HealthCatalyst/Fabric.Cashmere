import {Component, HostBinding, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'hc-label',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class HcLabelComponent {
    @HostBinding('class.hc-label') hostHcLabelClass = true;
}
