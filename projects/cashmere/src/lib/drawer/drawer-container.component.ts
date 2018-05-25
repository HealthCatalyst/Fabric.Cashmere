import {AfterContentInit, Component, ContentChildren, ElementRef, QueryList, Renderer2} from '@angular/core';
import {DrawerComponent, DrawerPromiseResult} from './drawer.component';

function throwDrawerContainerError(align: string) {
    throw new Error(`A drawer was already declared for 'align="${align}"'`);
}

@Component({
    selector: 'hc-drawer-container',
    templateUrl: 'drawer-container.component.html',
    styleUrls: ['drawer-container.component.scss']
})
export class DrawerContainerComponent implements AfterContentInit {
    @ContentChildren(DrawerComponent) drawers: QueryList<DrawerComponent>;

    private leftDrawer: DrawerComponent;
    private rightDrawer: DrawerComponent;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    ngAfterContentInit() {
        this.drawers.changes.subscribe(() => this.validateDrawers());
        this.drawers.forEach((drawer: DrawerComponent) => {
            drawer.open.subscribe(() => this.setContainerClass(true));
            drawer.close.subscribe(() => this.setContainerClass(false));
        });
        this.validateDrawers();
    }

    open(): Promise<DrawerPromiseResult[]> {
        return Promise.all([this.leftDrawer, this.rightDrawer].map(drawer => drawer && drawer.toggleOpen()));
    }

    close(): Promise<DrawerPromiseResult[]> {
        return Promise.all([this.leftDrawer, this.rightDrawer].map(drawer => drawer && drawer.toggleClose()));
    }

    getStyles() {
        return {
            transform: `translate3d(${this.getContentPositionOffset()}px, 0, 0)`
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
