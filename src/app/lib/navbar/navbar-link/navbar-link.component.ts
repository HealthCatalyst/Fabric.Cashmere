import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'hc-navbar-link',
  templateUrl: './navbar-link.component.html'
})
export class NavbarLinkComponent implements OnInit {
  @HostBinding('class') hostClass = 'navbar-item';
  @Input() active: boolean;
  @Input() uri: string;

  constructor() { }

  ngOnInit() {
  }

}
