import {
    AfterContentInit,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DoCheck,
    ElementRef,
    HostBinding,
    Input,
    NgZone,
    OnDestroy,
    Renderer2,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import type {QueryList} from '@angular/core';
import {Drawer, DrawerPromiseResult} from './drawer.component';
import {debounceTime, filter, startWith, takeUntil} from 'rxjs/operators';
import {AnimationEvent} from '@angular/animations';
import {Subject} from 'rxjs';
import {parseBooleanAttribute} from '../util';
import { BackdropHostDirective } from '../backdrop/backdrop-host.directive';

function throwDrawerContainerError(align: string) {
    throw new Error(`A drawer was already declared for 'align="${align}"'`);
}

/** Parent component that houses one or two `<hc-drawer>` that applies content styling */
@Component({
    selector: 'hc-drawer-container',
    templateUrl: 'drawer-container.component.html',
    styleUrls: ['drawer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DrawerContainer implements AfterContentInit, DoCheck, OnDestroy {
    @ContentChildren(Drawer)
    _drawers: QueryList<Drawer>;

    @ViewChild(BackdropHostDirective, {static: true}) backdropHost: BackdropHostDirective;

    private _leftDrawer: Drawer;
    private _rightDrawer: Drawer;
    private _animated = true;
    private _useBackdrop = false;

    _contentMargins = {left: 0, right: 0};

    private readonly _doCheckSubject = new Subject<void>();
    private readonly _destroyed = new Subject<void>();

    @HostBinding('class.hc-drawer-container')
    _hostClass = true;

    /** Defaults to true. Whether the content and drawers slide or snap open and closed. */
    @Input()
    get animated(): boolean {
        return this._animated;
    }

    set animated(val: boolean) {
        this._animated = parseBooleanAttribute(val);
        if ( this._drawers ) {
            this._drawers.forEach((drawer: Drawer) => drawer._animated = this._animated);
        }
    }

    /** Whether to use a backdrop, which closes the drawer when clicked */
    @Input()
    get useBackdrop(): boolean {
        return this._useBackdrop;
    }

    set useBackdrop(useBackdrop: boolean) {
        this._useBackdrop = useBackdrop;
    }

    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        private _ngZone: NgZone,
        private _changeDetector: ChangeDetectorRef
    ) {}

    // If drawer size changes through some async action this will cause it to resize the margins
    ngDoCheck(): void {
        // Run outside of angular's scope because debounceTime will cause infinite loop
        this._ngZone.runOutsideAngular(() => this._doCheckSubject.next());
    }

    ngAfterContentInit(): void {
        this._drawers.forEach((drawer: Drawer) => drawer._animated = this.animated);

        // debounceTime allows the component to render before the margins are calculated
        this._doCheckSubject
            .pipe(
                debounceTime(10), // arbitrarily small value is used to quickly render the component so incorrect margins aren't shown
                takeUntil(this._destroyed)
            )
            .subscribe(() => this._calculateContentMargins());

        // startWith used to cause first iteration
        this._drawers.changes.pipe(startWith(null)).subscribe(() => {
            this._validateDrawers();

            this._drawers.forEach((drawer: Drawer) => {
                drawer._animationStarted
                    .pipe(
                        takeUntil(this._drawers.changes),
                        filter((event: AnimationEvent) => event.fromState !== event.toState)
                    )
                    .subscribe(() => {
                        this._calculateContentMargins();
                    });
                drawer.openedChange.pipe(takeUntil(this._drawers.changes)).subscribe(isOpen => {
                    if (isOpen) {
                        this._setContainerClass(true);
                    } else {
                        this._setContainerClass(false);
                    }
                });
                drawer.openStart.pipe(takeUntil(this._drawers.changes)).subscribe(() => this._showBackdrop(drawer));
                drawer.closeStart.pipe(takeUntil(this._drawers.changes)).subscribe(() => this._hideBackdrop());
            });

            if (!this._drawers.length || this._isDrawerOpen(this._leftDrawer) || this._isDrawerOpen(this._rightDrawer)) {
                this._calculateContentMargins();
            }
        });
    }

    private _isDrawerOpen(drawer: Drawer): boolean {
        return drawer != null && drawer.opened;
    }

    /** Open all drawers */
    open(): Promise<DrawerPromiseResult[]> {
        return Promise.all([this._leftDrawer, this._rightDrawer].map(drawer => drawer && drawer.toggleOpen()));
    }

    /** Close all drawers */
    close(): Promise<DrawerPromiseResult[]> {
        return Promise.all([this._leftDrawer, this._rightDrawer].map(drawer => drawer && drawer.toggleClose()));
    }

    private _calculateContentMargins(): void {
        let left = 0;
        let right = 0;

        if (this._leftDrawer && this._leftDrawer.opened) {
            if (this._leftDrawer.mode === 'side') {
                left += this._leftDrawer._width;
            } else if (this._leftDrawer.mode === 'push') {
                left += this._leftDrawer._width;
            }
        }

        if (this._rightDrawer && this._rightDrawer.opened) {
            if (this._rightDrawer.mode === 'side') {
                right += this._rightDrawer._width;
            } else if (this._rightDrawer.mode === 'push') {
                right += this._rightDrawer._width;
            }
        }

        if (left !== this._contentMargins.left || right !== this._contentMargins.right) {
            this._contentMargins = {left, right};

            this._ngZone.run(() => this._changeDetector.markForCheck());
        }
    }

    _validateDrawers(): void {
        for (const drawer of this._drawers.toArray()) {
            if (drawer.align === 'right') {
                if (this._rightDrawer != null) {
                    throwDrawerContainerError('right');
                }
                this._rightDrawer = drawer;
            } else {
                if (this._leftDrawer != null) {
                    throwDrawerContainerError('left');
                }
                this._leftDrawer = drawer;
            }
        }
    }

    private _setContainerClass(isOpen: boolean): void {
        if (isOpen) {
            this._renderer.addClass(this._elementRef.nativeElement, 'hc-drawer-opened');
        } else {
            this._renderer.removeClass(this._elementRef.nativeElement, 'hc-drawer-opened');
        }
    }

    _showBackdrop(drawer: Drawer): void {
        if (!this._useBackdrop) {
            return;
        }

        this.backdropHost.ignoreEscapeKey = drawer.ignoreEscapeKey;
        this.backdropHost.onClose.pipe(takeUntil(this._destroyed)).subscribe(() => drawer.toggleClose());
        this.backdropHost.showBackdrop();
    }

    _hideBackdrop(): void {
        this.backdropHost.hideBackdrop();
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
        this._doCheckSubject.complete();
    }
}
