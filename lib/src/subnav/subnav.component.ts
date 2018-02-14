import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'hc-subnav',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./subnav.component.scss']
})
export class SubnavComponent {
    @HostBinding('class.fixed-top') @Input() fixedTop: boolean = false;

    constructor() {
    }

}
