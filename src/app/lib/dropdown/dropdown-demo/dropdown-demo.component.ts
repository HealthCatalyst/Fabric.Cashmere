import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'hc-dropdown-demo',
  templateUrl: './dropdown-demo.component.html',
  styleUrls: ['./dropdown-demo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownDemoComponent {
  showTemplate: boolean = true;

  viewToggle(show: 'ts' | 'html') {
    this.showTemplate = show === 'html';
  }

}
