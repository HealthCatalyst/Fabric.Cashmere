import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'hc-navbar-menu',
    templateUrl: './navbar-menu.component.html',
    styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent implements OnInit {
    @Input() active?: boolean;

    constructor() {
    }

    ngOnInit() {
    }

}
