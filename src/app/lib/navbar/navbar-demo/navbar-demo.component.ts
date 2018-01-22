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
`<hc-navbar appIcon="./assets/Application-Logo.svg" user="Christine K." homeUri="/library/navbar">
<hc-navbar-link Uri="/library/navbar">Home</hc-navbar-link>
<hc-navbar-link Uri="/library/buttons">Buttons</hc-navbar-link>
<hc-navbar-icon>
    <i class="fa fa-search fa-lg white"></i>
</hc-navbar-icon>
<hc-navbar-icon>
    <i class="fa fa-question-circle-o fa-lg question-pos white"></i>
</hc-navbar-icon>
</hc-navbar>  `;
    return code;
  }
}
