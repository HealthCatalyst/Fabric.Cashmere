import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
  Output,
  ViewContainerRef,
  HostListener
} from '@angular/core';
import { Subject, merge } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

import { HcPopComponent } from '../popover.component';
import { getInvalidPopoverError, getInvalidTriggerError } from '../popover.errors';
import { HcPopoverAnchoringService } from '../popover-anchoring.service';
import { HcPopoverOpenOptions, HcPopoverTrigger, VALID_TRIGGER } from '../types';
import { PopoverNotification, PopoverNotificationService, NotificationAction } from '../notification.service';

@Directive({
  selector: '[hcPop]',
  exportAs: 'hcPopAnchor',
  providers: [HcPopoverAnchoringService],
})
export class HcPopoverAnchorDirective implements OnInit, OnDestroy {

  /** Reference to the popover instance. */
  @Input('hcPop')
  get attachedPopover() { return this._attachedPopover; }
  set attachedPopover(value: HcPopComponent) {
    this._validateAttachedPopover(value);
    this._attachedPopover = value;
    // Anchor the popover to the element ref
    this._anchoring.anchor(this.attachedPopover, this._viewContainerRef, this);
  }
  private _attachedPopover: HcPopComponent;

  /** Trigger event to toggle the popover. *Defaults to `"click"`.*
   * Accepts `click`, `mousedown`, `hover`, `rightclick`, or `none`.
   * Note: if "hover" is selected, the backdrop for the popover will be disabled. */
  @Input()
  get trigger() { return this._trigger; }
  set trigger(val: HcPopoverTrigger) {
    this._validateTrigger(val);
    if (this._trigger !== val) { this._trigger = val; }
    this._dispatchConfigNotification(new PopoverNotification(NotificationAction.UPDATE_CONFIG));
  }
  private _trigger: HcPopoverTrigger = 'click';

  /** Object or value that can be passed into the popover to customize its content */
  @Input()
  get context() { return this._anchoring._context; }
  set context( val: any ) { this._anchoring._context = val; }

  /** Emits when the popover is opened. */
  @Output() popoverOpened = new EventEmitter<void>();

  /** Emits when the popover is closed. */
  @Output() popoverClosed = new EventEmitter<any>();

  /** Instance of notification service. Will be undefined until attached to a popover. */
  _notifications: PopoverNotificationService;

  /** Emits when the directive is destroyed. */
  private _onDestroy = new Subject<void>();

  constructor(
    public _elementRef: ElementRef,
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

  @HostListener('click', ['$event'])
  _showOrHideOnClick($event: MouseEvent): void {
      if (this.trigger !== 'click') { return; }
      this._attachedPopover._offsetPos[0] = this._attachedPopover.horizontalAlign === 'mouse' ? $event.offsetX : 0;
      this._attachedPopover._offsetPos[1] = this._attachedPopover.verticalAlign === 'mouse' ? $event.offsetY : 0;
      this.togglePopover();
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  _showOrHideOnMouseOver($event: MouseEvent): void {
      if (this.trigger !== 'mousedown') { return; }
      this._attachedPopover._offsetPos[0] = this._attachedPopover.horizontalAlign === 'mouse' ? $event.offsetX : 0;
      this._attachedPopover._offsetPos[1] = this._attachedPopover.verticalAlign === 'mouse' ? $event.offsetY : 0;
      this.togglePopover();
  }

  @HostListener('contextmenu', ['$event'])
  _showOrHideRightClick($event: MouseEvent): boolean {
    if ( this.trigger !== 'rightclick' ) {
        return true;
    } else {
        this._attachedPopover._offsetPos[0] = this._attachedPopover.horizontalAlign === 'mouse' ? $event.offsetX : 0;
        this._attachedPopover._offsetPos[1] = this._attachedPopover.verticalAlign === 'mouse' ? $event.offsetY : 0;
        this.togglePopover();
        return false;
    }
  }

  @HostListener('mouseenter', ['$event'])
  _showOnHover($event: MouseEvent): void {
      if (this.trigger !== 'hover') { return; }
      this._attachedPopover._offsetPos[0] = this._attachedPopover.horizontalAlign === 'mouse' ? $event.offsetX : 0;
      this._attachedPopover._offsetPos[1] = this._attachedPopover.verticalAlign === 'mouse' ? $event.offsetY : 0;
      this.openPopover();
  }

  @HostListener('touchend', ['$event'])
  @HostListener('touchcancel', ['$event'])
  @HostListener('mouseleave', ['$event'])
  _hideOnLeave($event: MouseEvent): void {
      if (this.trigger !== 'hover') { return; }
      this.closePopover();
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

  /** Throws an error if the trigger is not a valid HcPopoverTrigger. */
  private _validateTrigger(trig: HcPopoverTrigger): void {
    if (VALID_TRIGGER.indexOf(trig) === -1) {
      throw getInvalidTriggerError(trig);
    }
  }

  /** Dispatch a notification to the notification service, if possible. */
  private _dispatchConfigNotification(notification: PopoverNotification) {
    if (this._notifications) {
      this._notifications.dispatch(notification);
    }
  }

}
