import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    forwardRef,
    HostBinding,
    Input,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';
import {Drawer} from '../drawer.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DrawerToolbar} from './drawer-header.directive';

const drawerThemes = ['dark-theme'];

export function validateMenuDrawerTheme(menuTheme: string): void {
    if (!drawerThemes.some(theme => theme === menuTheme)) {
        throw new Error('Unsupported menuTheme: ' + menuTheme);
    }
}

const openStateAnimation = '0.3s ease';
const closeStateAnimation = '0.25s .05s ease';

/** Menu drawer that provides default themes */
@Component({
    selector: 'hc-menu-drawer',
    templateUrl: 'menu-drawer.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../drawer.component.scss', 'menu-drawer.component.scss'],
    animations: [
        trigger('openState', [
            state('open-left, open-right, open-instant', style({
                transform: 'translate3d(0, 0, 0)',
                visibility: 'visible'
            })),
            state('void, close-instant', style({
                'box-shadow': 'none',
                visibility: 'hidden'
            })),
            transition('void => open-instant', animate('0ms')),
            transition('open-instant => void', animate(openStateAnimation)),
            transition('open-instant => close-instant', animate('0ms')),
            transition('open-left => close-instant', animate('0ms')),
            transition('open-right => close-instant', animate('0ms')),
            transition('void => open-left', [
                animate('0ms', style({ transform: 'translate3d(-100%, 0, 0)' })),
                animate(closeStateAnimation)
            ]),
            transition('open-left => void', [
                animate(openStateAnimation, style({ transform: 'translate3d(-100%, 0, 0)' }))
            ]),
            transition('void => open-right', [
                animate('0ms', style({ transform: 'translate3d(100%, 0, 0)' })),
                animate(closeStateAnimation)
            ]),
            transition('open-right => void', [
                animate(openStateAnimation, style({ transform: 'translate3d(100%, 0, 0)' }))
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: Drawer, useExisting: forwardRef(() => MenuDrawer) }],
    standalone: false
})
export class MenuDrawer extends Drawer implements AfterContentInit {
    private _previousTheme: string | null = null;

    @ContentChild(DrawerToolbar)
    toolbar: DrawerToolbar;

    /** Sets menu style of the drawer. Choose from: `'dark-theme'` */
    @Input()
    get menuTheme(): string {
        return this._menuTheme;
    }

    set menuTheme(menuStyle: string) {
        validateMenuDrawerTheme(menuStyle);

        this._setThemeClass(this._themeClass(menuStyle));
        this._previousTheme = this._menuTheme;
        this._menuTheme = menuStyle;
    }

    private _menuTheme: string;

    @HostBinding('class.hc-menu-drawer')
    _hostClass = true;

    constructor(elementRef: ElementRef, private renderer: Renderer2) {
        super(elementRef);
        this.menuTheme = 'dark-theme';
    }

    ngAfterContentInit(): void {
        super.ngAfterContentInit();

        if (this.toolbar != null) {
            this.renderer.addClass(this.elementRef.nativeElement, 'hc-drawer-toolbar-visible');
        } else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'hc-drawer-toolbar-visible');
        }
    }

    private _themeClass(menuStyle: string) {
        return `hc-menu-drawer-${menuStyle}`;
    }

    private _setThemeClass(className: string) {
        if (this._previousTheme !== className) {
            if (this._previousTheme || this._menuTheme) {
                this.renderer.removeClass(this.elementRef.nativeElement, this._previousTheme || this.menuTheme);
            }
            this.renderer.addClass(this.elementRef.nativeElement, className);
        }
    }
}
