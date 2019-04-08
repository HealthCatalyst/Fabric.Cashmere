import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  ViewChild,
  ViewEncapsulation,
  TemplateRef,
  OnDestroy,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { transformPopover } from './popover.animations';
import {
  NotificationAction,
  PopoverNotification,
  PopoverNotificationService,
} from './notification.service';
import {
  getUnanchoredPopoverError,
  getInvalidHorizontalAlignError,
  getInvalidVerticalAlignError,
  getInvalidScrollStrategyError,
} from './popover.errors';
import {
  HcPopoverScrollStrategy,
  HcPopoverHorizontalAlign,
  HcPopoverVerticalAlign,
  VALID_SCROLL,
  VALID_HORIZ_ALIGN,
  VALID_VERT_ALIGN,
  HcPopoverOpenOptions,
} from './types';

// See http://cubic-bezier.com/#.25,.8,.25,1 for reference.
const DEFAULT_TRANSITION = '200ms cubic-bezier(0.25, 0.8, 0.25, 1)';
const EMPTY_TRANSITION = '0ms linear';

@Component({
  selector: 'hc-pop',
  encapsulation: ViewEncapsulation.None,
  animations: [transformPopover],
  styleUrls: ['./popover.component.scss'],
  templateUrl: './popover.component.html',
})
export class HcPopComponent implements OnInit, OnDestroy {

  /** Whether or not to disable default popover container styles. *Defaults to `false`.* */
  @Input() disableStyle = false;

  /** Alignment of the popover on the horizontal axis. *Defaults to `"center"`.* */
  @Input()
  get horizontalAlign() { return this._horizontalAlign; }
  set horizontalAlign(val: HcPopoverHorizontalAlign) {
    this._validateHorizontalAlign(val);
    if (this._horizontalAlign !== val) {
      this._horizontalAlign = val;
      this._dispatchConfigNotification(new PopoverNotification(NotificationAction.REPOSITION));
    }
  }
  private _horizontalAlign: HcPopoverHorizontalAlign = 'center';

  /** Alignment of the popover on the x axis. Alias for `horizontalAlign`. *Defaults to `"center"`.* */
  @Input()
  get xAlign() { return this.horizontalAlign; }
  set xAlign(val: HcPopoverHorizontalAlign) { this.horizontalAlign = val; }

  /** Alignment of the popover on the vertical axis. *Defaults to `"below"`.* */
  @Input()
  get verticalAlign() { return this._verticalAlign; }
  set verticalAlign(val: HcPopoverVerticalAlign) {
    this._validateVerticalAlign(val);
    if (this._verticalAlign !== val) {
      this._verticalAlign = val;
      this._dispatchConfigNotification(new PopoverNotification(NotificationAction.REPOSITION));
    }
  }
  private _verticalAlign: HcPopoverVerticalAlign = 'below';

  /** Alignment of the popover on the y axis. Alias for `verticalAlign`. *Defaults to `"below"`.* */
  @Input()
  get yAlign() { return this.verticalAlign; }
  set yAlign(val: HcPopoverVerticalAlign) { this.verticalAlign = val; }

  /** Whether the popover always opens with the specified alignment. *Defaults to `false`.* */
  @Input()
  get forceAlignment() { return this._forceAlignment; }
  set forceAlignment(val: boolean) {
    const coercedVal = coerceBooleanProperty(val);
    if (this._forceAlignment !== coercedVal) {
      this._forceAlignment = coercedVal;
      this._dispatchConfigNotification(new PopoverNotification(NotificationAction.REPOSITION));
    }
  }
  private _forceAlignment = false;

  /**
   * Whether the popover's alignment is locked after opening. This prevents the popover
   * from changing its alignement when scrolling or changing the size of the viewport.
   * *Defaults to `false`.*
   */
  @Input()
  get lockAlignment() { return this._lockAlignment; }
  set lockAlignment(val: boolean) {
    const coercedVal = coerceBooleanProperty(val);
    if (this._lockAlignment !== coercedVal) {
      this._lockAlignment = coerceBooleanProperty(val);
      this._dispatchConfigNotification(new PopoverNotification(NotificationAction.REPOSITION));
    }
  }
  private _lockAlignment = false;

  /** Whether the first focusable element should be focused on open. *Defaults to `true`.* */
  @Input()
  get autoFocus() { return this._autoFocus && this._autoFocusOverride; }
  set autoFocus(val: boolean) {
    this._autoFocus = coerceBooleanProperty(val);
  }
  private _autoFocus = true;
  _autoFocusOverride = true;

 /** Whether the popover should return focus to the previously focused element after closing. *Defaults to `true`.* */
 @Input()
  get restoreFocus() { return this._restoreFocus && this._restoreFocusOverride; }
  set restoreFocus(val: boolean) {
    this._restoreFocus = coerceBooleanProperty(val);
  }
  private _restoreFocus = true;
  _restoreFocusOverride = true;

  /** How the popover should handle scrolling. *Defaults to `"reposition"`.* */
  @Input()
  get scrollStrategy() { return this._scrollStrategy; }
  set scrollStrategy(val: HcPopoverScrollStrategy) {
    this._validateScrollStrategy(val);
    if (this._scrollStrategy !== val) {
      this._scrollStrategy = val;
      this._dispatchConfigNotification(new PopoverNotification(NotificationAction.UPDATE_CONFIG));
    }
  }
  private _scrollStrategy: HcPopoverScrollStrategy = 'reposition';

  /** Whether the popover should have a backdrop (includes closing on click). *Defaults to `true`.* */
  @Input()
  get hasBackdrop() { return this._hasBackdrop; }
  set hasBackdrop(val: boolean) {
    this._hasBackdrop = coerceBooleanProperty(val);
    this._dispatchConfigNotification(new PopoverNotification(NotificationAction.UPDATE_CONFIG));
  }
  private _hasBackdrop = true;

  /** Whether the popover should close when the user clicks the backdrop or presses ESC. *Defaults to `true`.* */
  @Input()
  get interactiveClose() { return this._interactiveClose; }
  set interactiveClose(val: boolean) {
    this._interactiveClose = coerceBooleanProperty(val);
    this._dispatchConfigNotification(new PopoverNotification(NotificationAction.UPDATE_CONFIG));
  }
  private _interactiveClose = true;

  /** Custom transition to use while opening. *Defaults to `'200ms cubic-bezier(0.25, 0.8, 0.25, 1)'`.* */
  @Input()
  get openTransition() { return this._openTransition; }
  set openTransition(val: string) {
    if (val) {
      this._openTransition = val;
    }
  }
  private _openTransition = DEFAULT_TRANSITION;

  /** Custom transition to use while closing. *Defaults to `'200ms cubic-bezier(0.25, 0.8, 0.25, 1)'`.* */
  @Input()
  get closeTransition() { return this._closeTransition; }
  set closeTransition(val: string) {
    if (val) {
      this._closeTransition = val;
    }
  }
  private _closeTransition = DEFAULT_TRANSITION;

  /** Should the popover animate? *Defaults to `true`.* */
  @Input() shouldAnimate = true;

  /** Optional backdrop class. *Defaults to `''`.* */
  @Input() backdropClass = '';

  /** Set to true if clicking anywhere inside the popover should close it. *Defaults to `false`.* */
  @Input() autoCloseOnContentClick = false;

  /** Emits when the popover is opened. */
  @Output() opened = new EventEmitter<void>();

  /** Emits when the popover is closed. */
  @Output() closed = new EventEmitter<any>();

  /** Emits when the popover has finished opening. */
  @Output() afterOpen = new EventEmitter<void>();

  /** Emits when the popover has finished closing. */
  @Output() afterClose = new EventEmitter<void>();

  /** Emits when the backdrop is clicked. */
  @Output() backdropClicked = new EventEmitter<void>();

  /** Emits when a keydown event is targeted to this popover's overlay. */
  @Output() overlayKeydown = new EventEmitter<KeyboardEvent>();

  /** Reference to template so it can be placed within a portal. */
  @ViewChild(TemplateRef) _templateRef: TemplateRef<any>;

  /** Classes to be added to the popover for setting the correct transform origin. */
  _classList: any = {};

  /** Whether the popover is presently open. */
  _open = false;

  /** Instance of notification service. Will be undefined until attached to an anchor. */
  _notifications: PopoverNotificationService;

  /** Reference to the element to build a focus trap around. */
  @ViewChild('focusTrapElement')
  private _focusTrapElement: ElementRef;

  /** Reference to the element that was focused before opening. */
  private _previouslyFocusedElement: HTMLElement | null;

  /** Reference to a focus trap around the popover. */
  private _focusTrap: FocusTrap | undefined;

  constructor(
      public _elementRef: ElementRef,
    private _focusTrapFactory: FocusTrapFactory,
    @Optional() @Inject(DOCUMENT) private _document: any
  ) { }

  ngOnInit() {
    this._setAlignmentClasses();
  }

  ngOnDestroy() {
    if (this._notifications) {
      this._notifications.dispose();
    }
  }

  popContainerClicked(): void {
      if (this.autoCloseOnContentClick) {
        this.close();
      }
  }

  /** Open this popover. */
  open(options: HcPopoverOpenOptions = {}): void {
    const notification = new PopoverNotification(NotificationAction.OPEN, options);
    this._dispatchActionNotification(notification);
  }

  /** Close this popover. */
  close(value?: any): void {
    const notification = new PopoverNotification(NotificationAction.CLOSE, value);
    this._dispatchActionNotification(notification);
  }

  /** Toggle this popover open or closed. */
  toggle(): void {
    const notification = new PopoverNotification(NotificationAction.TOGGLE);
    this._dispatchActionNotification(notification);
  }

  /** Realign the popover to the anchor. */
  realign(): void {
    const notification = new PopoverNotification(NotificationAction.REALIGN);
    this._dispatchActionNotification(notification);
  }

  /** Gets whether the popover is presently open. */
  isOpen(): boolean {
    return this._open;
  }

  /** Gets an animation config with customized (or default) transition values. */
  _getAnimation(): { value: any, params: any } {
    return {
      value: 'visible',
      params: {
        openTransition: this.shouldAnimate ? this.openTransition : EMPTY_TRANSITION,
        closeTransition: this.shouldAnimate ? this.closeTransition : EMPTY_TRANSITION }
    };
  }

  /** Callback for when the popover is finished animating in or out. */
  _onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'visible') {
      this._trapFocus();
      this.afterOpen.emit();
    } else if (event.toState === 'void') {
      this._restoreFocusAndDestroyTrap();
      this.afterClose.emit();
    }
  }

  /** Apply alignment classes based on alignment inputs. */
  _setAlignmentClasses(horizAlign = this.horizontalAlign, vertAlign = this.verticalAlign) {
    this._classList['hc-pop-before'] = horizAlign === 'before' || horizAlign === 'end';
    this._classList['hc-pop-after']  = horizAlign === 'after' || horizAlign === 'start';

    this._classList['hc-pop-above'] = vertAlign === 'above' || vertAlign === 'end';
    this._classList['hc-pop-below'] = vertAlign === 'below' || vertAlign === 'start';

    this._classList['hc-pop-center'] = horizAlign === 'center' || vertAlign === 'center';
  }

  /** Move the focus inside the focus trap and remember where to return later. */
  private _trapFocus(): void {
    this._savePreviouslyFocusedElement();

    // There won't be a focus trap element if the close animation starts before open finishes
    if (!this._focusTrapElement) {
      return;
    }

    if (!this._focusTrap && this._focusTrapElement) {
      this._focusTrap = this._focusTrapFactory.create(this._focusTrapElement.nativeElement);
    }

    if (this.autoFocus && this._focusTrap) {
      this._focusTrap.focusInitialElementWhenReady();
    }
  }

  /** Restore focus to the element focused before the popover opened. Also destroy trap. */
  private _restoreFocusAndDestroyTrap(): void {
    const toFocus = this._previouslyFocusedElement;

    // Must check active element is focusable for IE sake
    if (toFocus && 'focus' in toFocus && this.restoreFocus && this._previouslyFocusedElement) {
      this._previouslyFocusedElement.focus();
    }

    this._previouslyFocusedElement = null;

    if (this._focusTrap) {
      this._focusTrap.destroy();
      this._focusTrap = undefined;
    }
  }

  /** Save a reference to the element focused before the popover was opened. */
  private _savePreviouslyFocusedElement(): void {
    if (this._document) {
      this._previouslyFocusedElement = this._document.activeElement as HTMLElement;
    }
  }

  /** Dispatch a notification to the notification service, if possible. */
  private _dispatchConfigNotification(notification: PopoverNotification) {
    if (this._notifications) {
      this._notifications.dispatch(notification);
    }
  }

  /** Dispatch a notification to the notification service and throw if unable to. */
  private _dispatchActionNotification(notification: PopoverNotification) {
    if (!this._notifications) {
      throw getUnanchoredPopoverError();
    }

    this._notifications.dispatch(notification);
  }

  /** Throws an error if the alignment is not a valid horizontalAlign. */
  private _validateHorizontalAlign(pos: HcPopoverHorizontalAlign): void {
    if (VALID_HORIZ_ALIGN.indexOf(pos) === -1) {
      throw getInvalidHorizontalAlignError(pos);
    }
  }

  /** Throws an error if the alignment is not a valid verticalAlign. */
  private _validateVerticalAlign(pos: HcPopoverVerticalAlign): void {
    if (VALID_VERT_ALIGN.indexOf(pos) === -1) {
      throw getInvalidVerticalAlignError(pos);
    }
  }

  /** Throws an error if the scroll strategy is not a valid strategy. */
  private _validateScrollStrategy(strategy: HcPopoverScrollStrategy): void {
    if (VALID_SCROLL.indexOf(strategy) === -1) {
      throw getInvalidScrollStrategyError(strategy);
    }
  }
}
