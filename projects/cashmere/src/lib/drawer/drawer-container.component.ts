import {AfterContentInit, Component, ContentChildren, DoCheck, ElementRef, QueryList, Renderer2} from '@angular/core';
import {DrawerComponent, DrawerPromiseResult} from './drawer.component';
import {filter, takeUntil} from 'rxjs/operators';
import {AnimationEvent} from '@angular/animations';

function throwDrawerContainerError(align: string) {
    throw new Error(`A drawer was already declared for 'align="${align}"'`);
}

@Component({
    selector: 'hc-drawer-container',
    templateUrl: 'drawer-container.component.html',
    styleUrls: ['drawer-container.component.scss']
})
export class DrawerContainerComponent implements AfterContentInit, DoCheck {
    @ContentChildren(DrawerComponent) drawers: QueryList<DrawerComponent>;

    private leftDrawer: DrawerComponent;
    private rightDrawer: DrawerComponent;

    _contentMargins = {left: 0, right: 0};

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    }

    ngDoCheck(): void {
        this._calculateContentMargins();
    }

    ngAfterContentInit() {
        this.validateDrawers();

        this.drawers.changes.subscribe(() => this.validateDrawers());
        this.drawers.forEach((drawer: DrawerComponent) => {
            drawer._animationStarted.pipe(
                takeUntil(this.drawers.changes),
                filter((event: AnimationEvent) => event.fromState !== event.toState))
                .subscribe(() => {
                    this._calculateContentMargins();
                });
            drawer.openChange.pipe(
                takeUntil(this.drawers.changes)
            ).subscribe(isOpen => {
                if (isOpen) {
                    this.setContainerClass(true);
                } else {
                    this.setContainerClass(false);
                }
            });
        });
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

        this._contentMargins = {
            left,
            right
        };
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
            this.renderer.addClass(this.elementRef.nativeElement, 'drawer-opened');
        } else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'drawer-opened');
        }
    }

    private isDrawerOpen(drawer: DrawerComponent): boolean {
        return drawer && drawer.opened;
    }

    private getDrawerEffectiveWidth(drawer: DrawerComponent, mode: string): number {
        return this.isDrawerOpen(drawer) && drawer.mode === mode ? drawer.width : 0;
    }

    private getPositionOffsetLeft(): number {
        return this.getDrawerEffectiveWidth(this.leftDrawer, 'push');
    }

    private getPositionOffsetRight(): number {
        return this.getDrawerEffectiveWidth(this.rightDrawer, 'push');
    }

    private getContentPositionOffset(): number {
        return this.getPositionOffsetLeft() - this.getPositionOffsetRight();
    }
}
