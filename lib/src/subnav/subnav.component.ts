import {Component, Input, HostBinding} from '@angular/core';

@Component({
    selector: 'hc-subnav',
    template: `<ng-content></ng-content>`
})
export class SubnavComponent {
    @HostBinding('class.fixed-top')
    @Input()
    fixedTop: boolean = false;
    @HostBinding('class.subnav') hostClass: boolean = true;

    constructor() {}
}
