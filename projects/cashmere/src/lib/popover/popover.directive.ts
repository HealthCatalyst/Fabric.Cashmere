import {
    ChangeDetectorRef,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    SimpleChange,
    ViewContainerRef
} from '@angular/core';
import {Placement, PopperContentOptions, Trigger} from './popover.model';
import {PopoverContentComponent} from './popoverContent.component';

/** A lightweight, extensible component for fancy popover creation.
 * The popover directive supports multiple placements, optional transition animation, and more. */
@Directive({
    selector: '[hcPopover]',
    exportAs: 'hcPopover'
})
export class PopoverDirective implements OnInit, OnChanges, OnDestroy {
    public static baseOptions: PopperContentOptions = <PopperContentOptions>{
        placement: 'auto',
        hideOnClickOutside: true,
        hideOnScroll: false,
        showTrigger: 'hover'
    };

    private _popoverContentComponentClass = PopoverContentComponent;
    private _popoverContentComponentRef: ComponentRef<PopoverContentComponent>;
    private _shown: boolean = false;
    private _scheduledShowTimeout: any;
    private _scheduledHideTimeout: any;
    private _subscriptions: any[] = [];
    private _globalClick: any;
    private _globalScroll: any;

    /** Contents of the popover, this can be a string or PopoverContentComponent */
    // tslint:disable-next-line:no-input-rename
    @Input('hcPopover')
    content: string | PopoverContentComponent;

    /** Disables the popover */
    @Input()
    popperDisabled: boolean;

    /** Directional position of popover element.
     * `'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'bottom-start' | 'left-start' | 'right-start' | 'top-end' | 'bottom-end'
     | 'left-end' | 'right-end' | 'auto' | 'auto-top' | 'auto-bottom' | 'auto-left' | 'auto-right' | Function` *Default is 'auto'.* */
    @Input()
    popperPlacement: Placement;

    /** Show trigger for popover visibility.
     * `'click' | 'mousedown' | 'hover' | 'none'`
     * *Default is 'click'.*
     */
    @Input()
    popperTrigger: Trigger | undefined;

    /** Click target to trigger popover visibility event */
    @Input()
    popperTarget: HTMLElement;

    /** Show delay for popover visibility toggle */
    @Input()
    popperDelay: number = 0;

    /** Hide delay for popover visibility toggle */
    @Input()
    popperTimeout: number = 0;

    /** Timeout hidden delay after popover element has been made visible */
    @Input()
    popperTimeoutAfterShow: number = 0;

    /** Popover element boundary.
     * The positioning of the popover will be changed dynamically to prevent the element from being positioned outside the boundary.
     * *Default is 'body'.* */
    @Input()
    popperBoundaries: string = 'body';

    /** Show popover on page load */
    @Input()
    popperShowOnStart: boolean;

    /** Hides popover automatically when user clicks outside of element. *Default is true.* */
    @Input()
    popperCloseOnClickOutside: boolean = true;

    /** Hides popover when user scrolls  */
    @Input()
    popperHideOnScroll: boolean | undefined;

    /** Set this to true to position popover in ‘fixed’ mode. *Default is false.* */
    @Input()
    popperPositionFixed: boolean;

    /** List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js.
     * See: https://popper.js.org/popper-documentation.html#modifiers */
    @Input()
    popperModifiers: {};

    /** Disable default styles allowing custom styles to be defined. *Default is false.* */
    @Input()
    popperDisableStyle: boolean;

    /** Disable fade animations when showing or hiding popover. *Default is false.* */
    @Input()
    popperDisableAnimation: boolean;

    /** Change Detector detectChanges is used when state changes */
    @Input()
    popperForceDetection: boolean;

    /** Event when popover is shown */
    @Output()
    popperOnShown = new EventEmitter<PopoverDirective>();

    /** Event when popover is hidden */
    @Output()
    popperOnHidden = new EventEmitter<PopoverDirective>();

    @HostListener('touchstart', ['$event'])
    static _assignDefined(target: any, ...sources: any[]) {
        for (const source of sources) {
            for (const key of Object.keys(source)) {
                const val = source[key];
                if (val !== undefined) {
                    target[key] = val;
                }
            }
        }
        return target;
    }

    @HostListener('click', ['$event'])
    _showOrHideOnClick($event: MouseEvent): void {
        if (this.popperDisabled || this.popperTrigger !== 'click') {
            return;
        }
        this.toggle();
    }

    constructor(
        private viewContainerRef: ViewContainerRef,
        private changeDetectorRef: ChangeDetectorRef,
        private resolver: ComponentFactoryResolver,
        private renderer: Renderer2
    ) {
        PopoverDirective.baseOptions = {
            disableAnimation: false,
            disableDefaultStyling: false,
            placement: undefined,
            trigger: 'click',
            positionFixed: true,
            hideOnClickOutside: true,
            hideOnScroll: false
        };
    }

    @HostListener('touchstart', ['$event'])
    @HostListener('mousedown', ['$event'])
    _showOrHideOnMouseOver($event: MouseEvent): void {
        if (this.popperDisabled || this.popperTrigger !== 'mousedown') {
            return;
        }
        this.toggle();
    }

    @HostListener('mouseenter', ['$event'])
    _showOnHover($event: MouseEvent): void {
        if (this.popperDisabled || this.popperTrigger !== 'hover') {
            return;
        }
        this._scheduledShow();
    }

    _hideOnClickOutsideHandler($event: MouseEvent): void {
        if (this.popperDisabled || !this.popperCloseOnClickOutside) {
            return;
        }
        this._scheduledHide($event, this.popperTimeout);
    }

    _hideOnScrollHandler($event: MouseEvent): void {
        if (this.popperDisabled || !this.popperHideOnScroll) {
            return;
        }
        this._scheduledHide($event, this.popperTimeout);
    }

    @HostListener('touchend', ['$event'])
    @HostListener('touchcancel', ['$event'])
    @HostListener('mouseleave', ['$event'])
    _hideOnLeave($event: MouseEvent): void {
        if (this.popperDisabled || this.popperTrigger !== 'hover') {
            return;
        }
        this._scheduledHide(null, this.popperTimeout);
    }

    ngOnInit() {
        if (typeof this.content === 'string') {
            const text = this.content;
            this.content = this._constructContent();
            this.content._text = text;
        }
        const popperRef = this.content as PopoverContentComponent;
        popperRef._referenceObject = this._getRefElement();
        this._setContentProperties(popperRef);
        this._setDefaults();

        if (this.popperShowOnStart) {
            this._scheduledShow();
        }
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
        if (changes['popperDisabled']) {
            if (changes['popperDisabled'].currentValue) {
                this.hide();
            }
        }
    }

    ngOnDestroy() {
        this._subscriptions.forEach(sub => sub.unsubscribe && sub.unsubscribe());
        this._subscriptions.length = 0;
        this._clearEventListeners();
    }

    /** Toggle hide and show visibility */
    toggle() {
        this._shown ? this._scheduledHide(null, this.popperTimeout) : this._scheduledShow();
    }

    /** Enabled visibility */
    show() {
        if (this._shown) {
            this._overrideHideTimeout();
            return;
        }

        this._shown = true;
        const popperRef = this.content as PopoverContentComponent;
        const element = this._getRefElement();
        if (popperRef._referenceObject !== element) {
            popperRef._referenceObject = element;
        }
        this._setContentProperties(popperRef);
        popperRef._show();
        this.popperOnShown.emit(this);
        if (this.popperTimeoutAfterShow > 0) {
            this._scheduledHide(null, this.popperTimeoutAfterShow);
        }
        this._globalClick = this.renderer.listen('document', 'click', this._hideOnClickOutsideHandler.bind(this));
        this._globalScroll = this.renderer.listen(
            this._getScrollParent(this._getRefElement()),
            'scroll',
            this._hideOnScrollHandler.bind(this)
        );
    }

    /** Disable visibility */
    hide() {
        if (!this._shown) {
            this._overrideShowTimeout();
            return;
        }

        this._shown = false;
        if (this._popoverContentComponentRef) {
            this._popoverContentComponentRef.instance._hide();
        } else {
            (this.content as PopoverContentComponent)._hide();
        }
        this.popperOnHidden.emit(this);
        this._clearEventListeners();
    }

    _scheduledShow(delay: number = this.popperDelay) {
        this._overrideHideTimeout();
        this._scheduledShowTimeout = setTimeout(() => {
            this.show();
            this._applyChanges();
        }, delay);
    }

    _scheduledHide($event: any = null, delay: number = 0) {
        this._overrideShowTimeout();
        this._scheduledHideTimeout = setTimeout(() => {
            const toElement = $event ? $event.toElement : null;
            const PopoverContentComponentView = (this.content as PopoverContentComponent)._popperViewRef
                ? (this.content as PopoverContentComponent)._popperViewRef.nativeElement
                : false;

            if (
                !PopoverContentComponentView ||
                PopoverContentComponentView === toElement ||
                PopoverContentComponentView.contains(toElement) ||
                (this.content as PopoverContentComponent)._isMouseOver
            ) {
                return;
            }
            this.hide();
            this._applyChanges();
        }, delay);
    }

    _getRefElement() {
        return this.popperTarget || this.viewContainerRef.element.nativeElement;
    }

    private _applyChanges() {
        this.changeDetectorRef.markForCheck();
        if (this.popperForceDetection) {
            this.changeDetectorRef.detectChanges();
        }
    }

    private _setDefaults() {
        this.popperTrigger = typeof this.popperTrigger === 'undefined' ? PopoverDirective.baseOptions.trigger : this.popperTrigger;
        this.popperHideOnScroll =
            typeof this.popperHideOnScroll === 'undefined' ? PopoverDirective.baseOptions.hideOnScroll : this.popperHideOnScroll;
    }

    private _clearEventListeners() {
        if (this._globalClick && typeof this._globalClick === 'function') {
            this._globalClick();
        }

        if (this._globalScroll && typeof this._globalScroll === 'function') {
            this._globalScroll();
        }
    }

    private _overrideShowTimeout() {
        if (this._scheduledShowTimeout) {
            clearTimeout(this._scheduledShowTimeout);
            this._scheduledHideTimeout = 0;
        }
    }

    private _overrideHideTimeout() {
        if (this._scheduledHideTimeout) {
            clearTimeout(this._scheduledHideTimeout);
            this._scheduledHideTimeout = 0;
        }
    }

    private _constructContent(): PopoverContentComponent {
        const factory = this.resolver.resolveComponentFactory(this._popoverContentComponentClass);
        this._popoverContentComponentRef = this.viewContainerRef.createComponent(factory);
        return this._popoverContentComponentRef.instance as PopoverContentComponent;
    }

    private _setContentProperties(popperRef: PopoverContentComponent) {
        popperRef._popperOptions = PopoverDirective._assignDefined(popperRef._popperOptions, PopoverDirective.baseOptions, {
            disableAnimation: this.popperDisableAnimation,
            disableDefaultStyling: this.popperDisableStyle,
            placement: this.popperPlacement,
            boundariesElement: this.popperBoundaries,
            trigger: this.popperTrigger,
            positionFixed: this.popperPositionFixed,
            popperModifiers: this.popperModifiers
        });
        this._subscriptions.push(popperRef._onHidden.subscribe(this.hide.bind(this)));
    }

    private _getScrollParent(node: HTMLElement): HTMLElement | Document | null {
        const isElement = node instanceof HTMLElement;
        const overflowY = isElement && window.getComputedStyle(node).overflowY;
        const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';

        if (!node) {
            return null;
        } else if (isScrollable && node.scrollHeight >= node.clientHeight) {
            return node;
        }

        return this._getScrollParent(<HTMLElement>node.parentNode) || document;
    }
}
