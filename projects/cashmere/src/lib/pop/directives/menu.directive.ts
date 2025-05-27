import {Directive, HostBinding, ContentChildren, AfterContentInit, OnDestroy} from '@angular/core';
import type {QueryList} from '@angular/core';
import {HcPopoverAnchorDirective} from './popover-anchor.directive';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MenuItemDirective} from './menu-item.directive';

/** The `hcMenu` directive provides a standard way of displaying a series of selectable elements in a popover. */
@Directive({
    selector: '[hcMenu]',
    standalone: false
})
export class MenuDirective implements AfterContentInit, OnDestroy {
    @HostBinding('class.hc-menu-panel')
    _hostClass = true;

    @ContentChildren(HcPopoverAnchorDirective)
    _subMenus: QueryList<HcPopoverAnchorDirective>;

    @ContentChildren(MenuItemDirective)
    _menuItems: QueryList<MenuItemDirective>;

    private unsubscribe$ = new Subject<void>();

    ngAfterContentInit(): void {
        this.updateSubMenus();

        // Update submenus if they are added dynamically or after check
        this._menuItems.changes.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.updateSubMenus());
    }

    /** Rechecks the content for instances of `HcPopComponent` and inits them as submenus */
    updateSubMenus(): void {
        this._subMenus.forEach((anchor: HcPopoverAnchorDirective) => {
            anchor._hasSubmenu = true;
            // Force the trigger on any menu item with a submenu to a hover trigger
            anchor.trigger = "hover";
        });

        // Subscribe to submenu mouseenter events so we can close any other submenus currently open
        this._menuItems.forEach((item: MenuItemDirective) => {
            item._itemEnter.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
                this._subMenus.forEach((sub: HcPopoverAnchorDirective) => {
                    if (sub._elementRef.nativeElement !== item.ref.nativeElement && sub.attachedPopover.isOpen()) {
                        sub.attachedPopover._parentCloseBlock = true;
                        sub.attachedPopover._restoreFocusOverride = false;
                        sub.closePopover({}, true);
                        sub.attachedPopover._restoreFocusOverride = true;
                        const closeSub: Subscription = sub.attachedPopover.afterClose.subscribe(() => {
                            sub.attachedPopover._parentCloseBlock = false;
                            closeSub.unsubscribe();
                        });
                    }
                });
            });
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
