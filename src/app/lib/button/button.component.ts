/* tslint:disable:component-selector */
/* tslint:disable:use-host-property-decorator */
// https://github.com/mgechev/codelyzer/issues/178#issuecomment-265154480

import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

export function throwErrorForInvalidButtonColor() {
  throw Error('Unsupported color input value');
}

export type ButtonColor = 'primary' | 'primary-alt' | 'destructive' | 'neutral' | 'secondary' | 'tertiary';

@Component({
  selector: 'button[hc-button]',
  template: `<i *ngIf="glyph" class="fa {{glyph}} button-glyph"></i>
  <ng-content></ng-content>
  <i *ngIf="dropdown" class="fa fa-chevron-down fa-fw button-dropdown"></i>`,
  styleUrls: ['./button.component.scss'],
  host: {
    '[disabled]': 'disabled || null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnChanges {
  private supportedColors = ['primary', 'primary-alt', 'destructive', 'neutral', 'secondary', 'tertiary'];

  @Input() color: ButtonColor = 'primary';
  @Input() disabled = false;
  @Input() dropdown: boolean = false;
  @Input() glyph: string;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const color = changes['color'];
    if (color) {
      if (!(this.supportedColors.indexOf(color.currentValue) < 0)) {
        throwErrorForInvalidButtonColor();
      }
      this.changeColor(color.previousValue, color.currentValue);
    }
  }

  private changeColor(previousColor: ButtonColor, newColor: ButtonColor): void {
    if (previousColor) {
      this.renderer.removeClass(this.elementRef.nativeElement, `hc-${previousColor}`);
    }
    this.renderer.addClass(this.elementRef.nativeElement, `hc-${newColor}`);
  }
}
