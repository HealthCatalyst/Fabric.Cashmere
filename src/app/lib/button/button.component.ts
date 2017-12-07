import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ButtonOptions } from './button-options';

@Component({
  selector: 'hc-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() public options = new ButtonOptions();
  @Output() public onButtonClick = new EventEmitter<boolean>();

  public clickButton(clicked: boolean): void {
    this.onButtonClick.emit(clicked);
  }
}
