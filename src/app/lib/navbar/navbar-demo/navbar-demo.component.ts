import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'hc-navbar-demo',
    templateUrl: './navbar-demo.component.html',
    encapsulation: ViewEncapsulation.None
})
export class NavbarDemoComponent {
    navbar: string = `<hc-navbar appIcon="./assets/CashmereAppLogo.svg" user="Christine K." [homeUri]="undefined">
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
  <ul class="list-options">
    <li>
        <a href="https://www.healthcatalyst.com/" target="_blank">Health Catalyst</a>
    </li>
    <li>
        <a href="https://community.healthcatalyst.com/" target="_blank">Health Catalyst Community</a>
    </li>
    <li>
        <button (click)="aboutClick($event)">About</button>
    </li>
  </ul>
</hc-popover-content>`;

    fixedTopNavbar: string = `body {
  padding-top: 53px;
}`;

    moduleSetup: string = `@NgModule({
imports: [
    AppSwitcherModule.forRoot({discoveryServiceUri: 'http://SERVER/DiscoveryService'})
],
...`;

    aboutClick($event) {
        alert('about us!');
    }
}
