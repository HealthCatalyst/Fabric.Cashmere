import {
  ElementRef,
  Injectable,
  NgZone,
  OnDestroy,
  Optional,
  ViewContainerRef
} from '@angular/core';
import {
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  HorizontalConnectionPos,
  Overlay,
  OverlayConfig,
  OverlayRef,
  ScrollStrategy,
  VerticalConnectionPos,
} from '@angular/cdk/overlay';
import { Directionality, Direction} from '@angular/cdk/bidi';
import { ESCAPE } from '@angular/cdk/keycodes';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subscription, Subject } from 'rxjs';
import { takeUntil, take, filter, tap } from 'rxjs/operators';

import { HcPopComponent } from './popover.component';
import {
  HcPopoverHorizontalAlign,
  HcPopoverVerticalAlign,
  HcPopoverScrollStrategy,
  HcPopoverOpenOptions,
} from './types';

import { PopoverNotificationService, NotificationAction } from './notification.service';
import { HcPopoverAnchorDirective } from './directives/popover-anchor.directive';

/**
 * Configuration provided by the popover for the anchoring service
 * to build the correct overlay config.
 */
interface PopoverConfig {
  horizontalAlign: HcPopoverHorizontalAlign;
  verticalAlign: HcPopoverVerticalAlign;
  hasBackdrop: boolean;
  backdropClass: string;
  scrollStrategy: HcPopoverScrollStrategy;
  forceAlignment: boolean;
  lockAlignment: boolean;
}

@Injectable()
export class HcPopoverAnchoringService implements OnDestroy {

  /** Emits when the popover is opened. */
  popoverOpened = new Subject<void>();

  /** Emits when the popover is closed. */
  popoverClosed = new Subject<void>();

  /** Reference to the overlay containing the popover component. */
  _overlayRef: OverlayRef | null;

  /** Reference to the target popover. */
  private _popover: HcPopComponent;

  /** Stores the context assigned to the popover */
  _context: any;

  /** Reference to the view container for the popover template. */
  private _viewContainerRef: ViewContainerRef;

  /** Reference to the anchor */
  private _anchor: HcPopoverAnchorDirective;

  /** Reference to a template portal where the overlay will be attached. */
  private _portal: TemplatePortal<any>;

  /** Communications channel with the popover. */
  private _notifications: PopoverNotificationService;

  /** Single subscription to notifications service events. */
  private _notificationsSubscription: Subscription;

  /** Single subscription to position changes. */
  private _positionChangeSubscription: Subscription;

  /** Whether the popover is presently open. */
  private _popoverOpen = false;

  /** Emits when the service is destroyed. */
  private _onDestroy = new Subject<void>();

  constructor(
    private _overlay: Overlay,
    private _ngZone: NgZone,
    @Optional() private _dir: Directionality
  ) { }

  ngOnDestroy() {
    // Destroy popover before terminating subscriptions so that any resulting
    // detachments update 'closed state'
    this._destroyPopover();

    // Terminate subscriptions
    if (this._notificationsSubscription) {
      this._notificationsSubscription.unsubscribe();
    }
    if (this._positionChangeSubscription) {
      this._positionChangeSubscription.unsubscribe();
    }
    this._onDestroy.next();
    this._onDestroy.complete();

    this.popoverOpened.complete();
    this.popoverClosed.complete();
  }

  /** Anchor a popover instance to a view and connection element. */
  anchor(popover: HcPopComponent, viewContainerRef: ViewContainerRef, anchor: HcPopoverAnchorDirective): void {
    // Destroy any previous popovers
    this._destroyPopover();

    // Assign local refs
    this._popover = popover;
    this._viewContainerRef = viewContainerRef;
    this._anchor = anchor;

    // Provide notification service as a communication channel between popover and anchor.
    // Then subscribe to notifications to take appropriate actions.
    this._popover._notifications = this._notifications = this._anchor._notifications = new PopoverNotificationService();
    this._subscribeToNotifications();
  }

  /** Gets whether the popover is presently open. */
  isPopoverOpen(): boolean {
    return this._popoverOpen;
  }

  /** Toggles the popover between the open and closed states. */
  togglePopover(): void {
    return this._popoverOpen ? this.closePopover() : this.openPopover();
  }

  /** Opens the popover. */
  openPopover(options: HcPopoverOpenOptions = {}): void {
    if (!this._popoverOpen) {
      this._applyOpenOptions(options);
      this._popover._componentOverlay = this._createOverlay();
      this._subscribeToBackdrop();
      this._subscribeToEscape();
      this._subscribeToDetachments();
      this._saveOpenedState();
    }
  }

  /** Closes the popover. */
  closePopover(value?: any): void {
    if (this._popover._componentOverlay) {
      this._saveClosedState(value);
      this._popover._componentOverlay.detach();
    }
  }

  /** Realign the popover to the anchor. */
  realignPopoverToAnchor(): void {
    if (this._popover._componentOverlay) {
      const config = this._popover._componentOverlay.getConfig();
      const strategy = config.positionStrategy as FlexibleConnectedPositionStrategy;
      strategy.reapplyLastPosition();
    }
  }

  /** Get a reference to the anchor element. */
  getAnchorElement(): ElementRef {
    return this._anchor._elementRef;
  }

  /** Apply behavior properties on the popover based on the open options. */
  private _applyOpenOptions(options: HcPopoverOpenOptions): void {
    // Only override restoreFocus as `false` if the option is explicitly `false`
    const restoreFocus = options.restoreFocus !== false;
    this._popover._restoreFocusOverride = restoreFocus;

    // Only override autoFocus as `false` if the option is explicitly `false`
    const autoFocus = options.autoFocus !== false;
    this._popover._autoFocusOverride = autoFocus;
  }

  /** Create an overlay to be attached to the portal. */
  private _createOverlay(): OverlayRef {
    // Create overlay if it doesn't yet exist
    if (!this._overlayRef) {
      this._portal = new TemplatePortal(this._popover._templateRef, this._viewContainerRef);

      const popoverConfig = {
        horizontalAlign: this._popover.horizontalAlign,
        verticalAlign: this._popover.verticalAlign,
        hasBackdrop: this._popover.hasBackdrop,
        backdropClass: this._popover.backdropClass,
        scrollStrategy: this._popover.scrollStrategy,
        forceAlignment: this._popover.forceAlignment,
        lockAlignment: this._popover.lockAlignment,
      };

      const overlayConfig = this._getOverlayConfig(popoverConfig, this._anchor);

      this._subscribeToPositionChanges(
        overlayConfig.positionStrategy as FlexibleConnectedPositionStrategy
      );

      this._overlayRef = this._overlay.create(overlayConfig);
    } else if ( this._popover.horizontalAlign === 'mouse' || this._popover.verticalAlign === 'mouse' ) {
        /* If aligning to mouse clicks - adjust the strategy based on the most current click */
        this._overlayRef.updatePositionStrategy( this._getPositionStrategy(
            this._popover.horizontalAlign,
            this._popover.verticalAlign,
            this._popover.forceAlignment,
            this._popover.lockAlignment,
            this._anchor._elementRef,
          ) );
    }

    // Actually open the popover
    this._overlayRef.attach(this._portal);
    return this._overlayRef;
  }


  /** Removes the popover from the DOM. Does NOT update open state. */
  private _destroyPopover(): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;
    }
  }

  /**
   * Destroys the popover immediately if it is closed, or waits until it
   * has been closed to destroy it.
   */
  private _destroyPopoverOnceClosed(): void {
    if (this.isPopoverOpen() && this._overlayRef) {
      this._overlayRef.detachments().pipe(
        take(1),
        takeUntil(this._onDestroy)
      ).subscribe(() => this._destroyPopover());
    } else {
      this._destroyPopover();
    }
  }

  /**
   * Call appropriate anchor method when an event is dispatched through
   * the notification service.
   */
  private _subscribeToNotifications(): void {
    if (this._notificationsSubscription) {
      this._notificationsSubscription.unsubscribe();
    }

    this._notificationsSubscription = this._notifications.events()
      .subscribe(event => {
        switch (event.action) {
          case NotificationAction.OPEN:
            this.openPopover(event.value);
            break;
          case NotificationAction.CLOSE:
            this.closePopover(event.value);
            break;
          case NotificationAction.TOGGLE:
            this.togglePopover();
            break;
          case NotificationAction.REPOSITION:
            // TODO: When the overlay's position can be dynamically changed, do not destroy
          case NotificationAction.UPDATE_CONFIG:
            this._destroyPopoverOnceClosed();
            break;
          case NotificationAction.REALIGN:
            this.realignPopoverToAnchor();
            break;
        }
      });
  }

  /** Close popover when backdrop is clicked. */
  private _subscribeToBackdrop(): void {
    if (!this._overlayRef) { return; }
    this._overlayRef
      .backdropClick()
      .pipe(
        tap(() => this._popover.backdropClicked.emit()),
        filter(() => this._popover.interactiveClose),
        takeUntil(this.popoverClosed),
        takeUntil(this._onDestroy),
      )
      .subscribe(() => this.closePopover());
  }

  /** Close popover when escape keydown event occurs. */
  private _subscribeToEscape(): void {
    if (!this._overlayRef) { return; }
    this._overlayRef
      .keydownEvents()
      .pipe(
        tap(event => this._popover.overlayKeydown.emit(event)),
        filter(event => event.keyCode === ESCAPE),
        filter(() => this._popover.interactiveClose),
        takeUntil(this.popoverClosed),
        takeUntil(this._onDestroy),
      )
      .subscribe(() => this.closePopover());
  }

  /** Set state back to closed when detached. */
  private _subscribeToDetachments(): void {
    if (!this._overlayRef) { return; }
    this._overlayRef
      .detachments()
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this._saveClosedState());
  }

  /** Save the opened state of the popover and emit. */
  private _saveOpenedState(): void {
    if (!this._popoverOpen) {
      this._popover._open = this._popoverOpen = true;

      this.popoverOpened.next();
      if ( typeof this._context === "undefined" ) {
        this._popover.opened.emit();
      } else {
        this._popover.opened.emit( this._context );
      }
    }
  }

  /** Save the closed state of the popover and emit. */
  private _saveClosedState(value?: any): void {
    if (this._popoverOpen) {
      this._popover._open = this._popoverOpen = false;

      this.popoverClosed.next(value);
      this._popover.closed.emit(value);
    }
  }

  /** Gets the text direction of the containing app. */
  private _getDirection(): Direction {
    return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
  }

  /** Create and return a config for creating the overlay. */
  private _getOverlayConfig(config: PopoverConfig, anchor: HcPopoverAnchorDirective): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this._getPositionStrategy(
        config.horizontalAlign,
        config.verticalAlign,
        config.forceAlignment,
        config.lockAlignment,
        anchor._elementRef,
      ),
      // make it hard for users to shoot themselves in the foot by disabling backdrop if hover is the trigger
      hasBackdrop: anchor.trigger !== "hover" ? config.hasBackdrop : false,

      backdropClass: config.backdropClass || 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this._getScrollStrategyInstance(config.scrollStrategy),
      direction: this._getDirection(),

      // disable pointer events for hover popovers to avoid potential flickering issues
      panelClass: anchor.trigger === "hover" ? 'overlay-pointer-events' : ''
    });
  }

  /**
   * Listen to changes in the position of the overlay and set the correct alignment classes,
   * ensuring that the animation origin is correct, even with a fallback position.
   */
  private _subscribeToPositionChanges(position: FlexibleConnectedPositionStrategy): void {
    if (this._positionChangeSubscription) {
      this._positionChangeSubscription.unsubscribe();
    }

    this._positionChangeSubscription = position.positionChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(change => {
        // Position changes may occur outside the Angular zone
        this._ngZone.run(() => {
          this._popover._setAlignmentClassesForAnimation(
            getHorizontalPopoverAlignment(change.connectionPair.overlayX),
            getVerticalPopoverAlignment(change.connectionPair.overlayY),
          );
          this._popover._setAlignmentClassesForArrow(
            getHPopAlignmentForArrow(change.connectionPair.overlayX, change.connectionPair.originX),
            getVPopAlignmentForArrow(change.connectionPair.overlayY, change.connectionPair.originY),
          );
        });
      });
  }

  /** Map a scroll strategy string type to an instance of a scroll strategy. */
  private _getScrollStrategyInstance(strategy: HcPopoverScrollStrategy): ScrollStrategy {
    switch (strategy) {
      case 'block':
        return this._overlay.scrollStrategies.block();
      case 'reposition':
        return this._overlay.scrollStrategies.reposition();
      case 'close':
        return this._overlay.scrollStrategies.close();
      case 'noop':
      default:
        return this._overlay.scrollStrategies.noop();
    }
  }

  /** Create and return a position strategy based on config provided to the component instance. */
  private _getPositionStrategy(
    horizontalTarget: HcPopoverHorizontalAlign,
    verticalTarget: HcPopoverVerticalAlign,
    forceAlignment: boolean,
    lockAlignment: boolean,
    anchor: ElementRef,
  ): FlexibleConnectedPositionStrategy {
    // Attach the overlay at the preferred position
    const targetPosition = getPosition(horizontalTarget, verticalTarget, this._popover._offsetPos);
    const positions = [targetPosition];

    const strategy = this._overlay.position()
      .flexibleConnectedTo(anchor)
      .withFlexibleDimensions(false)
      .withPush(false)
      .withViewportMargin(0)
      .withLockedPosition(lockAlignment);

    // Unless the alignment is forced, add fallbacks based on the preferred positions
    if (!forceAlignment) {
      const fallbacks = this._getFallbacks(horizontalTarget, verticalTarget);
      positions.push(...fallbacks);
    }

    return strategy.withPositions(positions);
  }

  /** Get fallback positions based around target alignments. */
  private _getFallbacks(
    hTarget: HcPopoverHorizontalAlign,
    vTarget: HcPopoverVerticalAlign
  ): ConnectionPositionPair[] {
    // Determine if the target alignments overlap the anchor
    const horizontalOverlapAllowed = hTarget !== 'before' && hTarget !== 'after';
    const verticalOverlapAllowed = vTarget !== 'above' && vTarget !== 'below';

    // If a target alignment doesn't cover the anchor, don't let any of the fallback alignments
    // cover the anchor
    const possibleHorizontalAlignments: HcPopoverHorizontalAlign[] =
      horizontalOverlapAllowed ?
        ['before', 'start', 'center', 'end', 'after', 'mouse'] :
        ['before', 'after'];
    const possibleVerticalAlignments: HcPopoverVerticalAlign[] =
      verticalOverlapAllowed ?
        ['above', 'start', 'center', 'end', 'below', 'mouse'] :
        ['above', 'below'];

    // Create fallbacks for each allowed prioritized fallback alignment combo
    const fallbacks: ConnectionPositionPair[] = [];
    prioritizeAroundTarget(hTarget, possibleHorizontalAlignments).forEach(h => {
      prioritizeAroundTarget(vTarget, possibleVerticalAlignments).forEach(v => {
        fallbacks.push(getPosition(h, v, this._popover._offsetPos));
      });
    });

    // Remove the first item since it will be the target alignment and isn't considered a fallback
    return fallbacks.slice(1, fallbacks.length);
  }

}

/** Helper function to convert an overlay connection position to equivalent popover alignment for arrow positioning */
  function getHPopAlignmentForArrow(hOverlay: HorizontalConnectionPos, hOrigin: HorizontalConnectionPos): HcPopoverHorizontalAlign {
    if (hOverlay === hOrigin) {
      return hOverlay;
    }

    if (hOverlay === 'start') {
      return 'after';
    }

    if (hOverlay === 'end') {
      return 'before';
    }

    return 'center';
  }

  /** Helper function to convert an overlay connection position to equivalent popover alignment for arrow positioning. */
  function getVPopAlignmentForArrow(vOverlay: VerticalConnectionPos, vOrigin: VerticalConnectionPos): HcPopoverVerticalAlign {
    if (vOverlay === vOrigin && (vOverlay === 'top' || vOverlay === 'bottom')) {
      return vOverlay === 'top' ? 'start' : 'end';
    }

    if (vOverlay === 'top') {
      return 'below';
    }

    if (vOverlay === 'bottom') {
      return 'above';
    }

    return 'center';
  }

/** Helper function to get a cdk position pair from HcPopover alignments. */
function getPosition(
  h: HcPopoverHorizontalAlign,
  v: HcPopoverVerticalAlign,
  offset: number[]
): ConnectionPositionPair {
  const {originX, overlayX} = getHorizontalConnectionPosPair(h);
  const {originY, overlayY} = getVerticalConnectionPosPair(v);
  return new ConnectionPositionPair({originX, originY}, {overlayX, overlayY}, offset[0], offset[1]);
}

/** Helper function to convert an overlay connection position to equivalent popover alignment. */
function getHorizontalPopoverAlignment(h: HorizontalConnectionPos): HcPopoverHorizontalAlign {
  if (h === 'start') {
    return 'after';
  }

  if (h === 'end') {
    return 'before';
  }

  return 'center';
}

/** Helper function to convert an overlay connection position to equivalent popover alignment. */
function getVerticalPopoverAlignment(v: VerticalConnectionPos): HcPopoverVerticalAlign {
  if (v === 'top') {
    return 'below';
  }

  if (v === 'bottom') {
    return 'above';
  }

  return 'center';
}

/** Helper function to convert alignment to origin/overlay position pair. */
function getHorizontalConnectionPosPair(h: HcPopoverHorizontalAlign):
    {originX: HorizontalConnectionPos, overlayX: HorizontalConnectionPos} {
  switch (h) {
    case 'before':
      return {originX: 'start', overlayX: 'end'};
    case 'start':
    case 'mouse':
      return {originX: 'start', overlayX: 'start'};
    case 'end':
      return {originX: 'end', overlayX: 'end'};
    case 'after':
      return {originX: 'end', overlayX: 'start'};
    default:
      return {originX: 'center', overlayX: 'center'};
  }
}

/** Helper function to convert alignment to origin/overlay position pair. */
function getVerticalConnectionPosPair(v: HcPopoverVerticalAlign):
    {originY: VerticalConnectionPos, overlayY: VerticalConnectionPos} {
  switch (v) {
    case 'above':
      return {originY: 'top', overlayY: 'bottom'};
    case 'start':
    case 'mouse':
      return {originY: 'top', overlayY: 'top'};
    case 'end':
      return {originY: 'bottom', overlayY: 'bottom'};
    case 'below':
      return {originY: 'bottom', overlayY: 'top'};
    default:
      return {originY: 'center', overlayY: 'center'};
  }
}


/**
 * Helper function that takes an ordered array options and returns a reorderded
 * array around the target item. e.g.:
 *
 * target: 3; options: [1, 2, 3, 4, 5, 6, 7];
 *
 * return: [3, 4, 2, 5, 1, 6, 7]
 */
function prioritizeAroundTarget<T>(target: T, options: T[]): T[] {
  const targetIndex = options.indexOf(target);

  // Set the first item to be the target
  const reordered = [target];

  // Make left and right stacks where the highest priority item is last
  const left = options.slice(0, targetIndex);
  const right = options.slice(targetIndex + 1, options.length).reverse();

  // Alternate between stacks until one is empty
  while (left.length && right.length) {
    const r = right.pop(); if (r) { reordered.push(r); }
    const l = left.pop(); if (l) { reordered.push(l); }
  }

  // Flush out right side
  while (right.length) {
    const r2 = right.pop(); if (r2) { reordered.push(r2); }
  }

  // Flush out left side
  while (left.length) {
    const l2 = left.pop(); if (l2) { reordered.push(l2); }
  }

  return reordered;
}
