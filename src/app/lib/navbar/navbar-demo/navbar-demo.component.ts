import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'hc-navbar-demo',
  templateUrl: './navbar-demo.component.html',
  styleUrls: ['./navbar-demo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarDemoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getcode(): string {
    const code =
`<hc-navbar app-icon="app.svf" app-text="optional" user="optional">
  <hc-app-switcher></hc-app-switcher>
  <hc-navbar-link text="Home" routerLink="/home"></hc-navbar-link>
  <hc-navbar-link text="Link1" routerLink="/link1"></hc-navbar-link>
  <hc-navbar-link text="Link2" routerLink="/link2"></hc-navbar-link>
  <hc-navbar-icon class="fa fa-search fa-lg" (click)="popup"></hc-navbar-icon>
  <hc-navbar-icon class="fa fa-question-circle-o fa-lg" (click)="popup"></hc-navbar-icon>
</hc-navbar>`;
    return code;
  }
}
