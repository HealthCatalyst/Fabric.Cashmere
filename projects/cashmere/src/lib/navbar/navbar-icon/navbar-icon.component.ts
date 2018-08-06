import {Component, HostBinding, OnInit} from '@angular/core';

/** Components right aligned to the navbar, mainly for icons */
@Component({
    selector: 'hc-navbar-icon',
    template: '<ng-content></ng-content>'
})
export class NavbarIconComponent implements OnInit {
    @HostBinding('class') _hostClass = 'navbar-item';

    constructor() {}

    ngOnInit() {}
}
