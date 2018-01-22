import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'hc-navbar-link',
  templateUrl: './navbar-link.component.html'
})
export class NavbarLinkComponent implements OnInit {
  @HostBinding('class') HostClass = 'navbar-item';
  @Input() Active: boolean;
  @Input() Uri: string;

  constructor() { }

  ngOnInit() {
  }

}
