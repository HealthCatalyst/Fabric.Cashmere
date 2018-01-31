import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'hc-navbar-icon',
    template: '<ng-content></ng-content>'
})
export class NavbarIconComponent implements OnInit {
    @HostBinding('class') hostClass = 'navbar-item';

    constructor() {
    }

    ngOnInit() {
    }
}
