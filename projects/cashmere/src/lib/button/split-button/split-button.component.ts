import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    ViewEncapsulation,
    ViewChild
} from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef, ConnectionPositionPair} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';

import {parseBooleanAttribute} from '../../util';
import {validateStyleInput, ButtonComponent} from '../button.component';

/** SplitButton click event */
export class SplitButtonClickEvent {
    constructor(public source: SplitButtonComponent) {}
}

/** Split button provides a primary action button along with a secondary menu of actions */
@Component({
    selector: 'hc-split-button',
    templateUrl: './split-button.component.html',
    styleUrls: ['../button.component.scss', './split-button.component.scss'],
    providers: [Overlay],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SplitButtonComponent {
    private _tabIndex: number;
    private _disabled: boolean = false;
    private _style: string = 'primary';
    private _menuClickedCallback = this._menuClicked.bind(this);

    private _menuPortalHost: OverlayRef;
    @ViewChild('menuPortal') _menuPortal: TemplatePortal<any>;
    @ViewChild('splitBtnToggle') _splitBtnToggle: ButtonComponent;

    /** Primary button's click event */
    @Output() click = new EventEmitter<SplitButtonClickEvent>();

    /** Additional information shown as tooltip */
    @Input() title: string;

    /** Positioning for the menu. Possible values: 'start', 'end', 'center' */
    @Input() menuPosition: string = 'end';

    /** True if clicking anywhere in the menu should automatically close it. */
    @Input() autoCloseMenuOnClick = true;

    /** Type of button. Possible values: 'submit', 'reset', 'button' */
    @Input() type = 'button';

    /** Used as a reference in JavaScript, or to reference form data after a form is submitted */
    @Input() name: string;

    /** Value of primary button when submitted within a form */
    @Input() value: string;

    /** Button tabindex */
    @Input()
    get tabIndex(): number {
        return this.disabled ? -1 : this._tabIndex;
    }

    set tabIndex(value: number) {
        this._tabIndex = value == null ? 0 : value;
    }

    /**
     * @deprecated
     * @description Use `buttonStyle` instead
     * */
    @Input()
    get color(): string {
        return this.buttonStyle;
    }

    set color(btnStyle: string) {
        this.buttonStyle = btnStyle;
    }

    /** Sets style of button. Choose from: `'primary' | 'primary-alt' | 'destructive' | 'neutral' | 'secondary' | 'link' | 'link-inline'` */
    @Input()
    get buttonStyle(): string {
        return this._style;
    }

    set buttonStyle(btnStyle: string) {
        validateStyleInput(btnStyle);
        this._style = btnStyle;
    }

    /** Whether the control is disabled. */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(isDisabled) {
        this._disabled = parseBooleanAttribute(isDisabled);
    }

    @HostBinding('class.hc-split-button')
    get _hostClass(): boolean {
        return true;
    }

    constructor(private elementRef: ElementRef, private overlay: Overlay) {}

    _stopClick($event: MouseEvent) {
        $event.stopPropagation();
    }

    /** Used to give focus to the button */
    focus(): void {
        this.elementRef.nativeElement.focus();
    }

    _mainBtnClick(event: MouseEvent): void {
        event.stopPropagation();

        if (!this.disabled) {
            this.click.emit(new SplitButtonClickEvent(this));
        }
    }

    /** Manually close the menu */
    closeMenu() {
        this._menuPortalHost.hostElement.removeEventListener('click', this._menuClickedCallback);
        this._menuPortalHost.dispose();
    }

    /** Manually open the menu */
    openMenu() {
        this._menuPortalHost = this.overlay.create(this._getOverlayConfig());
        this._menuPortalHost.attach(this._menuPortal);

        // close if clicking the backdrop, pressing escape, and optionally if clicking anywhere on the menu itself
        this._menuPortalHost.backdropClick().subscribe(_ => this.closeMenu());
        this._menuPortalHost.hostElement.addEventListener('click', this._menuClickedCallback);
        this._menuPortalHost.keydownEvents().subscribe(e => {
            if (e.key === 'Escape') {
                this.closeMenu();
            }
        });
    }

    private _getOverlayConfig(): OverlayConfig {
        const position = this._getPositionForMenu();
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this._splitBtnToggle.elementRef)
            .withFlexibleDimensions(true)
            .withPush(true)
            .withViewportMargin(10)
            .withPositions([
                new ConnectionPositionPair({originX: position, originY: 'bottom'}, {overlayX: position, overlayY: 'top'}),
                new ConnectionPositionPair({originX: position, originY: 'top'}, {overlayX: position, overlayY: 'bottom'})
            ]);

        const overlayConfig = new OverlayConfig({
            hasBackdrop: true,
            backdropClass: 'hc-menu-backdrop',
            panelClass: 'hc-menu-panel',
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy: positionStrategy
        });

        return overlayConfig;
    }

    private _menuClicked() {
        if (this.autoCloseMenuOnClick) {
            this.closeMenu();
        }
    }

    private _getPositionForMenu() {
        const pos = this.menuPosition;
        return pos !== 'center' && pos !== 'start' && pos !== 'end' ? 'end' : pos;
    }
}
