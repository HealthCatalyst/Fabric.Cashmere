import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewEncapsulation} from '@angular/core';
import {parseBooleanAttribute} from '../../util';
import {ButtonStyle} from '../button.component';

/** SplitButton click event */
export class SplitButtonClickEvent {
    constructor(public source: SplitButtonComponent) {}
}

/** Split button provides a primary action button along with a secondary menu of actions */
@Component({
    selector: 'hc-split-button',
    templateUrl: './split-button.component.html',
    styleUrls: ['../button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SplitButtonComponent {
    private _tabIndex: number;
    private _disabled: boolean = false;
    private _style: ButtonStyle = 'primary';

    /** Primary button's click event */
    @Output() click = new EventEmitter<SplitButtonClickEvent>();

    /** Additional information shown as tooltip */
    @Input() title: string;

    /** Type of button, possible values: 'submit', 'reset', 'button' */
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
    get color(): ButtonStyle {
        return this._style;
    }

    set color(btnStyle: ButtonStyle) {
        this._style = btnStyle;
    }

    /** Sets style of button. Choose from: `'primary' | 'primary-alt' | 'destructive' | 'neutral' | 'secondary' | 'link' | 'link-inline'` */
    @Input()
    get buttonStyle(): ButtonStyle {
        return this._style;
    }

    set buttonStyle(btnStyle: ButtonStyle) {
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
}
