import {
    AfterContentInit,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DoCheck,
    ElementRef,
    HostBinding,
    NgZone,
    OnDestroy,
    QueryList,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';
import {DrawerComponent, DrawerPromiseResult} from './drawer.component';
import {debounceTime, filter, startWith, takeUntil} from 'rxjs/operators';
import {AnimationEvent} from '@angular/animations';
import {Subject} from 'rxjs';

function throwDrawerContainerError(align: string) {
    throw new Error(`A drawer was already declared for 'align="${align}"'`);
}

@Component({
    selector: 'hc-drawer-container',
    templateUrl: 'drawer-container.component.html',
    styleUrls: ['drawer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DrawerContainerComponent implements AfterContentInit, DoCheck, OnDestroy {
    @ContentChildren(DrawerComponent) drawers: QueryList<DrawerComponent>;

    private leftDrawer: DrawerComponent;
    private rightDrawer: DrawerComponent;

    _contentMargins = {left: 0, right: 0};

    private readonly _doCheckSubject = new Subject<void>();
    private readonly _destroyed = new Subject<void>();

    @HostBinding('class.hc-drawer-container') hostClass = true;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private _ngZone: NgZone,
        private _changeDetector: ChangeDetectorRef
    ) {}

    // If drawer size changes through some async action this will cause it to resize the margins
    ngDoCheck(): void {
        // Run outside of angular's scope because debounceTime will cause infinite loop
        this._ngZone.runOutsideAngular(() => this._doCheckSubject.next());
    }

    ngAfterContentInit() {
        // debounceTime allows the component to render before the margins are calculated
        this._doCheckSubject
            .pipe(
                debounceTime(10), // arbitrarily small value is used to quickly render the component so incorrect margins aren't shown
                takeUntil(this._destroyed)
            )
            .subscribe(() => this._calculateContentMargins());

        // startWith used to cause first iteration
        this.drawers.changes.pipe(startWith(null)).subscribe(() => {
            this.validateDrawers();

            this.drawers.forEach((drawer: DrawerComponent) => {
                drawer._animationStarted
                    .pipe(takeUntil(this.drawers.changes), filter((event: AnimationEvent) => event.fromState !== event.toState))
                    .subscribe(() => {
                        this._calculateContentMargins();
                    });
                drawer._openChange.pipe(takeUntil(this.drawers.changes)).subscribe(isOpen => {
                    if (isOpen) {
                        this.setContainerClass(true);
                    } else {
                        this.setContainerClass(false);
                    }
                });
            });

            if (!this.drawers.length || this._isDrawerOpen(this.leftDrawer) || this._isDrawerOpen(this.rightDrawer)) {
                this._calculateContentMargins();
            }
        });
    }

    private _isDrawerOpen(drawer: DrawerComponent): boolean {
        return drawer != null && drawer.opened;
    }

    open(): Promise<DrawerPromiseResult[]> {
        return Promise.all([this.leftDrawer, this.rightDrawer].map(drawer => drawer && drawer.toggleOpen()));
    }

    close(): Promise<DrawerPromiseResult[]> {
        return Promise.all([this.leftDrawer, this.rightDrawer].map(drawer => drawer && drawer.toggleClose()));
    }

    private _calculateContentMargins(): void {
        let left = 0;
        let right = 0;

        if (this.leftDrawer && this.leftDrawer.opened) {
            if (this.leftDrawer.mode === 'side') {
                left += this.leftDrawer.width;
            } else if (this.leftDrawer.mode === 'push') {
                left += this.leftDrawer.width;
                right -= this.leftDrawer.width;
            }
        }

        if (this.rightDrawer && this.rightDrawer.opened) {
            if (this.rightDrawer.mode === 'side') {
                right += this.rightDrawer.width;
            } else if (this.rightDrawer.mode === 'push') {
                right += this.rightDrawer.width;
                left -= this.rightDrawer.width;
            }
        }

        if (left !== this._contentMargins.left || right !== this._contentMargins.right) {
            this._contentMargins = {left, right};

            this._ngZone.run(() => this._changeDetector.markForCheck());
        }
    }

    private validateDrawers(): void {
        for (let drawer of this.drawers.toArray()) {
            if (drawer.align === 'right') {
                if (this.rightDrawer != null) {
                    throwDrawerContainerError('right');
                }
                this.rightDrawer = drawer;
            } else {
                if (this.leftDrawer != null) {
                    throwDrawerContainerError('left');
                }
                this.leftDrawer = drawer;
            }
        }
    }

    private setContainerClass(isOpen: boolean): void {
        if (isOpen) {
            this.renderer.addClass(this.elementRef.nativeElement, 'hc-drawer-opened');
        } else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'hc-drawer-opened');
        }
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
        this._doCheckSubject.complete();
    }
}
