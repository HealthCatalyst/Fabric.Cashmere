import {
    Directive,
    HostListener,
    ComponentRef,
    ViewContainerRef,
    ComponentFactoryResolver,
    Input,
    OnChanges,
    SimpleChange,
    Output,
    EventEmitter, OnInit, Renderer2, ChangeDetectorRef, Inject, OnDestroy
} from '@angular/core';
import { Placement, Placements, PopperContentOptions, Trigger, Triggers } from './popover.model';
import { PopoverContentComponent } from './popoverContent.component';

@Directive({
    selector: '[hcPopover]',
    exportAs: 'hcPopover'
})
export class PopoverDirective implements OnInit, OnChanges, OnDestroy {
    public static baseOptions: PopperContentOptions = <PopperContentOptions>{
        placement: Placements.Auto,
        hideOnClickOutside: true,
        hideOnScroll: false,
        showTrigger: Triggers.HOVER
    };

    private PopoverContentComponentClass = PopoverContentComponent;
    private PopoverContentComponentRef: ComponentRef<PopoverContentComponent>;
    private shown: boolean = false;
    private scheduledShowTimeout: any;
    private scheduledHideTimeout: any;
    private subscriptions: any[] = [];
    private globalClick: any;
    private globalScroll: any;

    // tslint:disable-next-line:no-input-rename
    @Input('hcPopover')
    content: string | PopoverContentComponent;

    @Input() popperDisabled: boolean;

    @Input() popperPlacement: Placement;

    @Input() popperTrigger: Trigger | undefined;

    @Input() popperTarget: HTMLElement;

    @Input() popperDelay: number = 0;

    @Input() popperTimeout: number = 0;

    @Input() popperTimeoutAfterShow: number = 0;

    @Input() popperBoundaries: string = 'body';

    @Input() popperShowOnStart: boolean;

    @Input() popperCloseOnClickOutside: boolean;

    @Input() popoverCloseOnClickOutside: boolean | undefined;

    @Input() popperHideOnScroll: boolean | undefined;

    @Input() popperPositionFixed: boolean;

    @Input() popperModifiers: {};

    @Input() popperDisableStyle: boolean;

    @Input() popperDisableAnimation: boolean;

    @Input() popperForceDetection: boolean;

    @Output() popperOnShown = new EventEmitter<PopoverDirective>();

    @Output() popperOnHidden = new EventEmitter<PopoverDirective>();

    @HostListener('touchstart', ['$event'])

    static assignDefined(target: any, ...sources: any[]) {
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
    showOrHideOnClick($event: MouseEvent): void {
        if (this.popperDisabled || this.popperTrigger !== Triggers.CLICK) {
            return;
        }
        this.toggle();
    }

    constructor(private viewContainerRef: ViewContainerRef,
                private changeDetectorRef: ChangeDetectorRef,
                private resolver: ComponentFactoryResolver,
                private renderer: Renderer2) {

        PopoverDirective.baseOptions = {
            disableAnimation: false,
            disableDefaultStyling: false,
            placement: undefined,
            trigger: Triggers.CLICK,
            positionFixed: true,
            hideOnClickOutside: true,
            hideOnScroll: false,
        };
    }

    @HostListener('touchstart', ['$event'])
    @HostListener('mousedown', ['$event'])
    showOrHideOnMouseOver($event: MouseEvent): void {
        if (this.popperDisabled || this.popperTrigger !== Triggers.MOUSEDOWN) {
            return;
        }
        this.toggle();
    }

    @HostListener('mouseenter', ['$event'])
    showOnHover(): void {
        if (this.popperDisabled || this.popperTrigger !== Triggers.HOVER) {
            return;
        }
        this.scheduledShow();
    }

    hideOnClickOutsideHandler($event: MouseEvent): void {
        if (this.popperDisabled || !this.popoverCloseOnClickOutside) {
            return;
        }
        this.scheduledHide($event, this.popperTimeout);
    }

    hideOnScrollHandler($event: MouseEvent): void {
        if (this.popperDisabled || !this.popperHideOnScroll) {
            return;
        }
        this.scheduledHide($event, this.popperTimeout);
    }

    @HostListener('touchend', ['$event'])
    @HostListener('touchcancel', ['$event'])
    @HostListener('mouseleave', ['$event'])
    hideOnLeave($event: MouseEvent): void {
        if (this.popperDisabled || this.popperTrigger !== Triggers.HOVER) {
            return;
        }
        this.scheduledHide(null, this.popperTimeout);
    }


    ngOnInit() {
        // Support legacy prop
        this.popoverCloseOnClickOutside = typeof this.popoverCloseOnClickOutside === 'undefined' ?
            this.popperCloseOnClickOutside : this.popoverCloseOnClickOutside;

        if (typeof this.content === 'string') {
            const text = this.content;
            this.content = this.constructContent();
            this.content.text = text;
        }
        const popperRef = this.content as PopoverContentComponent;
        popperRef.referenceObject = this.getRefElement();
        this.setContentProperties(popperRef);
        this.setDefaults();

        if (this.popperShowOnStart) {
            this.scheduledShow();
        }
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['popperDisabled']) {
            if (changes['popperDisabled'].currentValue) {
                this.hide();
            }
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe && sub.unsubscribe());
        this.subscriptions.length = 0;
        this.clearEventListeners();
    }

    toggle() {
        this.shown ? this.scheduledHide(null, this.popperTimeout) : this.scheduledShow();
    }

    show() {
        if (this.shown) {
            this.overrideHideTimeout();
            return;
        }

        this.shown = true;
        const popperRef = this.content as PopoverContentComponent;
        const element = this.getRefElement();
        if (popperRef.referenceObject !== element) {
            popperRef.referenceObject = element;
        }
        this.setContentProperties(popperRef);
        popperRef.show();
        this.popperOnShown.emit(this);
        if (this.popperTimeoutAfterShow > 0) {
            this.scheduledHide(null, this.popperTimeoutAfterShow);
        }
        this.globalClick = this.renderer.listen('document', 'click', this.hideOnClickOutsideHandler.bind(this));
        this.globalScroll = this.renderer.listen(this.getScrollParent(this.getRefElement()), 'scroll', this.hideOnScrollHandler.bind(this));
    }

    hide() {
        if (!this.shown) {
            this.overrideShowTimeout();
            return;
        }

        this.shown = false;
        if (this.PopoverContentComponentRef) {
            this.PopoverContentComponentRef.instance.hide();
        } else {
            (this.content as PopoverContentComponent).hide();
        }
        this.popperOnHidden.emit(this);
        this.clearEventListeners();
    }

    scheduledShow(delay: number = this.popperDelay) {
        this.overrideHideTimeout();
        this.scheduledShowTimeout = setTimeout(() => {
            this.show();
            this.applyChanges();
        }, delay);
    }

    scheduledHide($event: any = null, delay: number = 0) {
        this.overrideShowTimeout();
        this.scheduledHideTimeout = setTimeout(() => {
            const toElement = $event ? $event.toElement : null;
            const PopoverContentComponentView = (this.content as PopoverContentComponent).popperViewRef ?
                (this.content as PopoverContentComponent).popperViewRef.nativeElement : false;

            if (!PopoverContentComponentView ||
                PopoverContentComponentView === toElement ||
                PopoverContentComponentView.contains(toElement) ||
                (this.content as PopoverContentComponent).isMouseOver) {
                return;
            }
            this.hide();
            this.applyChanges();
        }, delay);
    }

    getRefElement() {
        return this.popperTarget || this.viewContainerRef.element.nativeElement;
    }

    private applyChanges() {
        this.changeDetectorRef.markForCheck();
        if (this.popperForceDetection) {
            this.changeDetectorRef.detectChanges();
        }
    }

    private setDefaults() {
        this.popperTrigger = typeof this.popperTrigger === 'undefined' ? PopoverDirective.baseOptions.trigger : this.popperTrigger;
        this.popoverCloseOnClickOutside = typeof this.popoverCloseOnClickOutside === 'undefined' ?
            PopoverDirective.baseOptions.hideOnClickOutside : this.popoverCloseOnClickOutside;
        this.popperHideOnScroll = typeof this.popperHideOnScroll === 'undefined' ?
            PopoverDirective.baseOptions.hideOnScroll : this.popperHideOnScroll;
    }

    private clearEventListeners() {
        if (this.globalClick && typeof this.globalClick === 'function') {
            this.globalClick();
        }

        if (this.globalScroll && typeof this.globalScroll === 'function') {
            this.globalScroll();
        }
    }

    private overrideShowTimeout() {
        if (this.scheduledShowTimeout) {
            clearTimeout(this.scheduledShowTimeout);
            this.scheduledHideTimeout = 0;
        }
    }

    private overrideHideTimeout() {
        if (this.scheduledHideTimeout) {
            clearTimeout(this.scheduledHideTimeout);
            this.scheduledHideTimeout = 0;
        }
    }

    private constructContent(): PopoverContentComponent {
        const factory = this.resolver.resolveComponentFactory(this.PopoverContentComponentClass);
        this.PopoverContentComponentRef = this.viewContainerRef.createComponent(factory);
        return this.PopoverContentComponentRef.instance as PopoverContentComponent;
    }

    private setContentProperties(popperRef: PopoverContentComponent) {
        popperRef.popperOptions = PopoverDirective.assignDefined(popperRef.popperOptions, PopoverDirective.baseOptions, {
            disableAnimation: this.popperDisableAnimation,
            disableDefaultStyling: this.popperDisableStyle,
            placement: this.popperPlacement,
            boundariesElement: this.popperBoundaries,
            trigger: this.popperTrigger,
            positionFixed: this.popperPositionFixed,
            popperModifiers: this.popperModifiers,
        });
        this.subscriptions.push(popperRef.onHidden.subscribe(this.hide.bind(this)));
    }

    private getScrollParent(node: HTMLElement): HTMLElement | Document | null {
        const isElement = node instanceof HTMLElement;
        const overflowY = isElement && window.getComputedStyle(node).overflowY;
        const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';

        if (!node) {
            return null;
        } else if (isScrollable && node.scrollHeight >= node.clientHeight) {
            return node;
        }

        return this.getScrollParent(<HTMLElement>node.parentNode) || document;
    }
}
