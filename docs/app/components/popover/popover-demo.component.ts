import { Component } from '@angular/core';

@Component({
    selector: 'hc-popover-demo',
    templateUrl: './popover-demo.component.html',
    styles: [ '[hc-button] { margin-top: 10px; margin-right: 30px;}']
})
export class PopoverDemoComponent {
    lastModified: Date = new Date( document.lastModified );
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

    aboutClick() {
        alert('about us!');
    }
}
