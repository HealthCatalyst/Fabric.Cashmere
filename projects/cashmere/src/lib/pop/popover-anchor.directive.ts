import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
  Output,
  ViewContainerRef
} from '@angular/core';
import { Subject, merge } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

import { HcPopComponent } from './popover.component';
import { getInvalidPopoverError } from './popover.errors';
import { HcPopoverAnchoringService } from './popover-anchoring.service';
import { HcPopoverOpenOptions } from './types';

@Directive({
  selector: '[hcPopoverAnchorFor]',
  exportAs: 'hcPopoverAnchor',
  providers: [HcPopoverAnchoringService],
})
export class HcPopoverAnchorDirective implements OnInit, OnDestroy {

  /** Reference to the popover instance. */
  @Input('hcPopoverAnchorFor')
  get attachedPopover() { return this._attachedPopover; }
  set attachedPopover(value: HcPopComponent) {
    this._validateAttachedPopover(value);
    this._attachedPopover = value;
    // Anchor the popover to the element ref
    this._anchoring.anchor(this.attachedPopover, this._viewContainerRef, this._elementRef);
  }
  private _attachedPopover: HcPopComponent;

  /** Emits when the popover is opened. */
  @Output() popoverOpened = new EventEmitter<void>();

  /** Emits when the popover is closed. */
  @Output() popoverClosed = new EventEmitter<any>();

  /** Emits when the directive is destroyed. */
  private _onDestroy = new Subject<void>();

  constructor(
    private _elementRef: ElementRef,
    private _viewContainerRef: ViewContainerRef,
    public _anchoring: HcPopoverAnchoringService,
  ) { }

  ngOnInit() {
    // Re-emit open and close events
    const opened$ = this._anchoring.popoverOpened
      .pipe(tap(() => this.popoverOpened.emit()));
    const closed$ = this._anchoring.popoverClosed
      .pipe(tap(value => this.popoverClosed.emit(value)));
    merge(opened$, closed$).pipe(takeUntil(this._onDestroy)).subscribe();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /** Gets whether the popover is presently open. */
  isPopoverOpen(): boolean {
    return this._anchoring.isPopoverOpen();
  }

  /** Toggles the popover between the open and closed states. */
  togglePopover(): void {
    this._anchoring.togglePopover();
  }

  /** Opens the popover. */
  openPopover(options: HcPopoverOpenOptions = {}): void {
    this._anchoring.openPopover(options);
  }

  /** Closes the popover. */
  closePopover(value?: any): void {
    this._anchoring.closePopover(value);
  }

  /** Realign the popover to the anchor. */
  realignPopover(): void {
    this._anchoring.realignPopoverToAnchor();
  }

  /** Get a reference to the anchor element. */
  getElement(): ElementRef {
    return this._elementRef;
  }

  /** Throws an error if the popover instance is not provided. */
  private _validateAttachedPopover(popover: HcPopComponent): void {
    if (!popover || !(popover instanceof HcPopComponent)) {
      throw getInvalidPopoverError();
    }
  }

}
