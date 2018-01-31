/* tslint:disable:component-selector */
/* tslint:disable:use-host-property-decorator */
// https://github.com/mgechev/codelyzer/issues/178#issuecomment-265154480

import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';
import { ButtonComponent } from './button.component';

@Component({
  selector: 'a[hc-button]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./button.component.scss'],
  host: {
    '[attr.tabindex]': 'disabled ? -1 : 0',
    '[attr.disabled]': 'disabled || null',
    '[attr.aria-disabled]': 'disabled.toString()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnchorComponent extends ButtonComponent {

  @HostBinding('class.hc-anchor')
  get getAnchorClass(): boolean {
    return true;
  }

  constructor(elementRef: ElementRef,
              renderer: Renderer2) {
    super(elementRef, renderer);
  }

  @HostListener('click', ['$event'])
  handleClickEvents(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
