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
import {parseBooleanAttribute} from '../../util';
import {validateStyleInput, validateSizeInput, ButtonComponent} from '../button.component';
import {HcPopComponent} from '../../pop/popover.component';

/** SplitButton click event */
export class SplitButtonClickEvent {
    constructor(public source: SplitButtonComponent) {}
}

/** Split button provides a primary action button along with a secondary menu of actions */
@Component({
    selector: 'hc-split-button',
    templateUrl: './split-button.component.html',
    styleUrls: ['../button.component.scss', './split-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SplitButtonComponent {
    private _tabIndex: number;
    private _disabled: boolean = false;
    private _style: string = 'primary';
    private _size: string = 'md';

    @ViewChild('splitBtnToggle')
    _splitBtnToggle: ButtonComponent;

    @ViewChild('splitMenu')
    _splitMenu: HcPopComponent;

    /** Primary button's click event */
    @Output()
    click = new EventEmitter<SplitButtonClickEvent>();

    /** Additional information shown as tooltip */
    @Input()
    title: string;

    /** Positioning for the menu. Possible values: 'start', 'end', 'center' */
    @Input()
    menuPosition: string = 'end';

    /** True if clicking anywhere in the menu should automatically close it. */
    @Input()
    autoCloseMenuOnClick = true;

    /** Type of button. Possible values: 'submit', 'reset', 'button' */
    @Input()
    type = 'button';

    /** Used as a reference in JavaScript, or to reference form data after a form is submitted */
    @Input()
    name: string;

    /** Value of primary button when submitted within a form */
    @Input()
    value: string;

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

    /** Sets size of button. Choose from: `'sm' | 'md' | 'lg'` */
    @Input()
    get size(): string {
        return this._size;
    }

    set size(size: string) {
        validateSizeInput(size);
        this._size = size;
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

    constructor(private elementRef: ElementRef) {}

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
        this._splitMenu.close();
    }

    /** Manually open the menu */
    openMenu() {
        this._splitMenu.open();
    }
}
