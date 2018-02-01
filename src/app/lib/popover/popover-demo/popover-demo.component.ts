import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'hc-popover-demo',
    templateUrl: './popover-demo.component.html'
})
export class PopoverDemoComponent implements OnInit {
    public body: string = 'dynamic content';
    public popoverWithListItems: string =
        `<button hc-button color="primary" [hcPopover]="options" popperPlacement="bottom" aria-hidden="true">
  <i class="fa fa-gear" aria-hidden="true"></i>
  &nbsp;Options&nbsp;
  <i class="fa fa-angle-down" aria-hidden="true"></i>
</button>
<hc-popover-content #options>
  <ul class="list-options">
    <li>
      <a href="https://www.healthcatalyst.com/" target="_blank">Health Catalyst</a>
    </li>
    <li>
      <a href="https://community.healthcatalyst.com/" target="_blank">Health Catalyst Community</a>
    </li>
    <li>
      <button (click)="aboutClick()">About</button>
    </li>
  </ul>
</hc-popover-content>`;

    constructor() {
    }

    ngOnInit() {
    }

    aboutClick() {
        alert('about us!');
    }
}
