import { Component, Input } from '@angular/core';

@Component({
  template: `<div [hidden]="!active">
             <ng-content></ng-content>
             </div>`,
  selector: `hc-vertical-tab`,
  styles: []
})
export class VerticalTabComponent {
  @Input() title: string = '';
  active: boolean = false;
}