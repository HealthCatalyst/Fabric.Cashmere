import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    OnDestroy,
    Output,
    ViewContainerRef,
    HostListener,
    HostBinding,
    AfterContentInit,
    ComponentFactoryResolver
} from '@angular/core';
import { Subject, merge } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

import { HcPopComponent } from '../popover.component';
import { getInvalidPopoverError, getInvalidTriggerError } from '../popover.errors';
import { HcPopoverAnchoringService } from '../popover-anchoring.service';
import { HcPopoverHorizontalAlign, HcPopoverOpenOptions, HcPopoverTrigger, HcPopoverVerticalAlign, VALID_TRIGGER } from '../types';
import { PopoverNotification, PopoverNotificationService, NotificationAction } from '../notification.service';
import { HcPopoverAccessibilityService, HcPopKeyboardNotifier } from '../popover-accessibility.service';
import { HcTooltipComponent } from '../tooltip/tooltip.component';
import { parseBooleanAttribute } from '../../util';

@Directive({
    selector: '[hcPop],[hcTooltip]',
    exportAs: 'hcPopAnchor',
    providers: [HcPopoverAnchoringService]
})
export class HcPopoverAnchorDirective implements OnInit, AfterContentInit, OnDestroy {
    /** Reference to the popover instance. */
    @Input('hcPop')
    get attachedPopover(): HcPopComponent {
        return this._attachedPopover;
    }
    set attachedPopover(value: HcPopComponent) {
        this._validateAttachedPopover(value);
        this._attachedPopover = value;
        // Anchor the popover to the element ref
        this._anchoring.anchor(this.attachedPopover, this._viewContainerRef, this);
    }
    private _attachedPopover: HcPopComponent;

    /** A string of text to display as a tooltip above an element */
    @Input('hcTooltip')
    get tooltipText(): string {
        return this._tooltipText;
    }
    set tooltipText(value: string) {
        this._tooltipText = value;
        const factory = this._componentFactoryResolver.resolveComponentFactory(HcTooltipComponent);
        const popover = this._viewContainerRef.createComponent(factory).instance;
        popover.tooltipContent = value;
        popover.disableStyle = true;
        popover.verticalAlign = 'above';
        popover.scrollStrategy = 'close';
        popover.restoreFocus = false;
        popover.maxWidth = this._maxWidth;
        this.attachedPopover = popover;
        this.trigger = 'hover';
        this.popoverDelay = 300;
    }
    private _tooltipText: string;

    /** Trigger event to toggle the popover. *Defaults to `"click"`.*
     * Accepts `click`, `mousedown`, `hover`, `rightclick`, or `none`.
     * Note: if "hover" is selected, the backdrop for the popover will be disabled. */
    @Input()
    get trigger(): HcPopoverTrigger {
        return this._trigger;
    }
    set trigger(val: HcPopoverTrigger) {
        this._validateTrigger(val);
        if (this._trigger !== val) {
            this._trigger = val;
        }
        this._dispatchConfigNotification(new PopoverNotification(NotificationAction.UPDATE_CONFIG));
    }
    private _trigger: HcPopoverTrigger = 'click';

    /** Number that can be passed into the popover to change hover delay. Also used for tooltip.
     * Delay is measured in milliseconds.
     */
    @Input()
    get popoverDelay(): number {
        return this._popoverDelay;
    }

    set popoverDelay(val: number) {
        this._popoverDelay = Number(val);
    }

    private _popoverDelay = 0;

    /** Timer that delays togglePopover on hover. */
    private hoverInterval: number;

    /** Constrains the content of a popover to a standard css string value; *Defaults to `none`.* */
    @Input()
    get maxWidth(): string {
        return this._attachedPopover.maxWidth;
    }

    set maxWidth(val: string) {
        this._maxWidth = val;
        if ( this.attachedPopover ) {
            this._attachedPopover.maxWidth = val;
        }
    }

    private _maxWidth = 'none';

    /** Whether the popover should return focus to the previously focused element after closing.* */
    @Input()
    get restoreFocus(): boolean {
        return this._attachedPopover.restoreFocus && this._attachedPopover._restoreFocusOverride;
    }
    set restoreFocus(val: boolean) {
        if ( this.attachedPopover ) {
            this._attachedPopover.restoreFocus = parseBooleanAttribute(val);
        }
    }

    /** Object or value that can be passed into the popover to customize its content */
    @Input()
    get context(): unknown {
        return this._anchoring._context;
    }
    set context(val: unknown) {
        this._anchoring._context = val;
    }

    /** Alignment of the popover on the horizontal axis. Can be `before`, `start`, `center`, `end`, `after`, or `mouse`.
     * *Defaults to `center`.* */
    @Input()
    get horizontalAlign(): HcPopoverHorizontalAlign {
        return this._attachedPopover.horizontalAlign;
    }
    set horizontalAlign(val: HcPopoverHorizontalAlign) {
        if ( this.attachedPopover ) {
            this.attachedPopover.horizontalAlign = val;
        }
    }

    /** Alignment of the popover on the vertical axis. Can be `above`, `start`, `center`, `end`, `below`, or `mouse`.
     * *Defaults to `"below"`.* */
    @Input()
    get verticalAlign(): HcPopoverVerticalAlign {
        return this._attachedPopover.verticalAlign;
    }
    set verticalAlign(val: HcPopoverVerticalAlign) {
        if ( this.attachedPopover ) {
            this.attachedPopover.verticalAlign = val;
        }
    }

    @HostBinding('class.hc-menu-item-submenu')
    _hasSubmenu = false;

    /** Emits when the popover is opened. */
    @Output() popoverOpened = new EventEmitter<void>();

    /** Emits when the popover is closed. */
    @Output() popoverClosed = new EventEmitter<unknown>();

    /** Instance of notification service. Will be undefined until attached to a popover. */
    _notifications: PopoverNotificationService;

    /** Emits when the directive is destroyed. */
    private _onDestroy = new Subject<void>();

    constructor(
        public _elementRef: ElementRef,
        private _viewContainerRef: ViewContainerRef,
        public _anchoring: HcPopoverAnchoringService,
        private _accessibility: HcPopoverAccessibilityService,
        private _componentFactoryResolver: ComponentFactoryResolver
    ) { }

    ngOnInit(): void {
        // Re-emit open and close events
        const opened$ = this._anchoring.popoverOpened.pipe(tap(() => this.popoverOpened.emit()));
        const closed$ = this._anchoring.popoverClosed.pipe(tap(value => this.popoverClosed.emit(value)));
        merge(opened$, closed$)
            .pipe(takeUntil(this._onDestroy))
            .subscribe();
    }

    ngAfterContentInit(): void {
        this._setupKeyboardEvents();
    }

    ngOnDestroy(): void {
        clearTimeout(this.hoverInterval);
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    @HostListener('click', ['$event'])
    _showOrHideOnClick(event: MouseEvent): void {
        if (this._hasSubmenu && event) {
            // Prevent the popover component from auto closing on click if a submenu was selected
            event.stopPropagation();
            event.preventDefault();
        }
        if (this.trigger !== 'click') {
            return;
        }
        this._attachedPopover._offsetPos[0] = this._attachedPopover.horizontalAlign === 'mouse' ? event.offsetX : 0;
        this._attachedPopover._offsetPos[1] = this._attachedPopover.verticalAlign === 'mouse' ? event.offsetY : 0;
        this.togglePopover();
    }

    /** So popover anchors can be accessible via keyboard. */
    @HostListener('keydown', ['$event'])
    _showOrHideOnEnter(event: KeyboardEvent): void {
        // buttons already trigger a click when you press enter, so executing this event handler would be redundant
        const targetElement = event.target as Element;
        const triggerFromButton = targetElement && targetElement.tagName === "BUTTON";
        // not triggering popover on keypress unless the key pressed was enter or spacebar
        const keyPressedShouldTrigger = event.key === 'Enter' || event.key === ' ';
        // not triggering popover on keypress unless the trigger is 'click'
        const anchorHasClickTrigger = this.trigger === 'click';

        if (triggerFromButton || !keyPressedShouldTrigger || !anchorHasClickTrigger ) {
            return;
        }
        this.togglePopover();
    }

    @HostListener('touchstart', ['$event'])
    @HostListener('mousedown', ['$event'])
    _showOrHideOnMouseOver($event: MouseEvent): void {
        if (this.trigger !== 'mousedown') {
            return;
        }
        this._attachedPopover._offsetPos[0] = this._attachedPopover.horizontalAlign === 'mouse' ? $event.offsetX : 0;
        this._attachedPopover._offsetPos[1] = this._attachedPopover.verticalAlign === 'mouse' ? $event.offsetY : 0;
        this.togglePopover();
    }

    @HostListener('contextmenu', ['$event'])
    _showOrHideRightClick($event: MouseEvent): boolean {
        if (this.trigger !== 'rightclick') {
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
        if (this.trigger !== 'hover') {
            return;
        }

        this._attachedPopover._offsetPos[0] = this._attachedPopover.horizontalAlign === 'mouse' ? $event.offsetX : 0;
        this._attachedPopover._offsetPos[1] = this._attachedPopover.verticalAlign === 'mouse' ? $event.offsetY : 0;
        this.hoverInterval = window.setTimeout(() => {
            this.togglePopover();
        }, this.popoverDelay);
    }

    @HostListener('touchend')
    @HostListener('touchcancel')
    @HostListener('mouseleave')
    _hideOnLeave(): void {
        if (this.trigger !== 'hover') {
            return;
        }
        this.closePopover();
    }

    /** Handle keyboard navigation of a hcMenu using the arrow or tab keys */
    _keyEvent(event: KeyboardEvent): void {
        if (this.attachedPopover.isOpen() && this.attachedPopover._menuItems.length > 0 && !this.attachedPopover._subMenuOpen) {
            if (event.key === 'ArrowUp' || (event.key === 'Tab' && event.shiftKey)) {
                event.stopPropagation();
                event.preventDefault();
                this.attachedPopover._keyFocus(false);
            } else if (event.key === 'ArrowDown' || (event.key === 'Tab' && !event.shiftKey)) {
                event.stopPropagation();
                event.preventDefault();
                this.attachedPopover._keyFocus(true);
            } else if (this.attachedPopover.parent && this.attachedPopover.parent.isOpen() && event.key === 'ArrowLeft') {
                event.stopPropagation();
                event.preventDefault();
                this.closePopover();
            }
        }
        if (this._hasSubmenu && this._elementRef.nativeElement === document.activeElement && event.key === 'ArrowRight') {
            event.stopPropagation();
            event.preventDefault();
            this.openPopover();
            this.attachedPopover._keyFocus(true);
        }
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
    closePopover(value?: unknown, neighborSubMenusAreOpen = false): void {
        clearTimeout(this.hoverInterval);
        this._anchoring.closePopover(value, neighborSubMenusAreOpen);
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

    private _setupKeyboardEvents() {
        const notifier: HcPopKeyboardNotifier = {
            isOpen: false,
            nativeElement: this._elementRef.nativeElement,
            hasSubmenu: () => this._hasSubmenu,
            onKeyDown: event => this._keyEvent(event)
        };
        this.popoverClosed.asObservable().subscribe(() => (notifier.isOpen = false));
        this.popoverOpened.asObservable().subscribe(() => (notifier.isOpen = true));
        this._accessibility.registerNotifier(notifier);
    }
}
