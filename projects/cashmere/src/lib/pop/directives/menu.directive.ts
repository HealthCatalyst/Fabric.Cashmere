import {Directive, HostBinding, ContentChildren, QueryList, AfterContentInit, OnDestroy} from '@angular/core';
import {HcPopoverAnchorDirective} from './popover-anchor.directive';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

/** The `hcMenu` directive provides a standard way of displaying a series of selectable elements in a popover. */
@Directive({
    selector: '[hcMenu]'
})
export class MenuDirective implements AfterContentInit, OnDestroy {
    @HostBinding('class.hc-menu-panel')
    _hostClass = true;

    @ContentChildren(HcPopoverAnchorDirective)
    _subMenus: QueryList<HcPopoverAnchorDirective>;

    private unsubscribe$ = new Subject<void>();

    ngAfterContentInit() {
        this._subMenus.forEach((anchor: HcPopoverAnchorDirective) => {
            anchor._hasSubmenu = true;
            // Subscribe to submenu open events so we can close any other submenus currently open
            anchor.popoverOpened.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
                this._subMenus.forEach((sub: HcPopoverAnchorDirective) => {
                    if (sub !== anchor && sub.attachedPopover.isOpen()) {
                        sub.attachedPopover._parentCloseBlock = true;
                        sub.closePopover();
                        let closeSub: Subscription = sub.attachedPopover.afterClose.subscribe(() => {
                            sub.attachedPopover._parentCloseBlock = false;
                            closeSub.unsubscribe();
                        });
                    }
                });
            });
        });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
