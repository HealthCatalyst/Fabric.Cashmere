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
      `<hc-navbar appIcon="./assets/Application-Logo.svg" user="Christine K." [homeUri]="undefined">
<hc-navbar-link [uri]="undefined">Home</hc-navbar-link>
<hc-navbar-link [uri]="undefined" exact="true">Buttons</hc-navbar-link>
<hc-navbar-icon>
    <i class="fa fa-search fa-lg white"></i>
</hc-navbar-icon>
<hc-navbar-icon>
    <i class="fa fa-question-circle-o fa-lg question-pos white" [hcPopover]="options" popoverPlacement="bottom"></i>
</hc-navbar-icon>
</hc-navbar>

<hc-popover-content #options>
<a hc-button href="https://www.healthcatalyst.com/">Health Catalyst</a>
<hr>
<a hc-button href="https://github.com/HealthCatalyst/Fabric.Cashmere">Cashmere</a>
<hr>
<a hc-button href="http://cashmere.azurewebsites.net/">Cashmere Demo</a>
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
