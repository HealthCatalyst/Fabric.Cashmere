import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewEncapsulation} from '@angular/core';
import {parseBooleanAttribute} from '../../util';
import {validateButtonColor} from '../button.component';

export class SplitButtonClickEvent {
    constructor(public source: SplitButtonComponent) {}
}

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
    private _color: string = 'primary';

    @Output() click = new EventEmitter<SplitButtonClickEvent>();

    @Input() title: string;
    @Input() type = 'button';
    @Input() name: string;
    @Input() value: string;

    @Input()
    get tabIndex(): number {
        return this.disabled ? -1 : this._tabIndex;
    }

    set tabIndex(value: number) {
        this._tabIndex = value == null ? 0 : value;
    }

    @Input()
    get color(): string {
        return this._color;
    }

    set color(btnColor: string) {
        validateButtonColor(btnColor);
        this._color = btnColor;
    }

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(isDisabled) {
        this._disabled = parseBooleanAttribute(isDisabled);
    }

    @HostBinding('class.hc-split-button')
    get hostClass(): boolean {
        return true;
    }

    constructor(private elementRef: ElementRef) {}

    focus(): void {
        this.elementRef.nativeElement.focus();
    }

    mainBtnClick(event: Event): void {
        event.stopPropagation();

        if (!this.disabled) {
            this.click.emit(new SplitButtonClickEvent(this));
        }
    }

    stopMenuClick(event: Event): void {
        event.stopPropagation();
    }
}
