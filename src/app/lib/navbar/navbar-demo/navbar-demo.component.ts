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

  navbar(): string {
    const code =
      `<hc-navbar appIcon="./assets/CashmereAppLogo.svg" user="Christine K." [homeUri]="undefined">
  <hc-app-switcher></hc-app-switcher>
  <hc-navbar-link [active]="true" [uri]="undefined">Home</hc-navbar-link>
  <hc-navbar-link [active]="false" [uri]="undefined" exact="true">Buttons</hc-navbar-link>
  <hc-navbar-icon>
      <i class="fa fa-search fa-lg white"></i>
  </hc-navbar-icon>
  <hc-navbar-icon>
      <i class="fa fa-question-circle-o fa-lg question-pos white" [hcPopover]="options" popoverPlacement="bottom"></i>
  </hc-navbar-icon>
</hc-navbar>

<hc-popover-content #options>
    <a hc-button class="popover-option" href="https://www.healthcatalyst.com/">Health Catalyst</a>
    <hr>
    <a hc-button class="popover-option" href="https://github.com/HealthCatalyst/Fabric.Cashmere">Cashmere</a>
    <hr>
    <a hc-button class="popover-option" href="http://cashmere.azurewebsites.net/">Cashmere Demo</a>
</hc-popover-content>`;
    return code;
  }

  fixedTopNavbar(): string {
    const code =
      `body {
  padding-top: 53px;
}`;
    return code;
  }
}
