import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewEncapsulation } from '@angular/core';

import { ButtonToggleChangeEvent } from './button-toggle-change-event';

/** Notification banners are used for general information about the state of the application or upcoming events. For instant
 * feedback responding to user actions, use a toaster message.*/

@Component({
    selector: 'hc-button-toggle',
    templateUrl: './button-toggle.component.html',
    styleUrls: ['./button-toggle.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ButtonToggleComponent {

    supportedStyles: string[] = ['primary', 'primary-alt', 'destructive', 'neutral', 'secondary', 'minimal', 'link', 'link-inline'];
    supportedColors = ['blue', 'green', 'purple', 'red', 'orange', 'ruby-red', 'deep-red', 'red-orange', 'magenta', 'pink', 'light-pink', 'azure', 'teal', 'dark-green', 'brown', 'purple-gray', 'yellow', 'yellow-orange', 'tan'];
    supportedSizes = ['sm', 'md', 'lg'];
    buttonAttributes = ['hc-icon-button', 'hc-button'];

    private _disabled = false;
    private _style: string;
    private _size: string;

    @Input() public selected: boolean;
    @Input() public uniqueId: number;
    private _value: any = null;
    @Input() public id: string;


    @Input()
    get color(): string {
        return this.buttonStyle;
    }

    set color(btnStyle: string) {
        this.buttonStyle = btnStyle;
    }

    @Input()
    get buttonStyle(): string {
        return this._style;
    }

    /** Whether the control is disabled. */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(isDisabled) {
        // this._disabled = parseBooleanAttribute(isDisabled);
    }

    set buttonStyle(btnStyle: string) {
        this.validateStyleInput(btnStyle);
        if (this.supportedStyles.indexOf(btnStyle) < 0) {
            btnStyle = "button-" + btnStyle;
        }
        this.setHostClass(this._style, btnStyle);
        this._style = btnStyle;
    }

    /** Sets size of button. Choose from: `'sm' | 'md' | 'lg' |`. *Defaults to `md`.* */
    @Input()
    get size(): string {
        return this._size;
    }


    @Output() buttonSelected: EventEmitter<ButtonToggleChangeEvent> = new EventEmitter<ButtonToggleChangeEvent>();


    public selectButtonToggle(): void {
        this.buttonSelected.emit(new ButtonToggleChangeEvent(this, this.value));
    }

    /** Value of radio buttons */
    @Input()
    get value(): any {
        return this._value;
    }

    set value(newValue: any) {
        if (this._value !== newValue) {
            this._value = newValue;
        }
    }



    set size(size: string) {
        this.validateSizeInput(size);
        this.setHostClass(this._size, size);
        this._size = size;
    }




    constructor( public elementRef: ElementRef, private renderer: Renderer2) {
        // this.buttonStyle = 'primary';
        // this.size = 'md';

        // for (const attr of this.buttonAttributes) {
        //     if (elementRef.nativeElement.hasAttribute(attr)) {
        //         renderer.addClass(elementRef.nativeElement, attr);
        //     }
        // }
    }



    focus(): void {
        this.elementRef.nativeElement.focus();
    }

    private setHostClass(previous: string, current) {
        // if (previous !== current) {
        //     if (previous) {
        //         this.renderer.removeClass(this.elementRef.nativeElement, this._hcClassify(previous));
        //     }
        //     this.renderer.addClass(this.elementRef.nativeElement, this._hcClassify(current));
        // }
    }

    private _hcClassify(style: string): string {
        return `hc-${style}`;
    }


    validateStyleInput(style: string) {
        if (this.supportedStyles.indexOf(style) < 0 && this.supportedColors.indexOf(style) < 0) {
            throw Error('Unsupported buttonStyle attribute value on ButtonComponent: ' + style);
        }
    }

    validateSizeInput(size: string) {
        if (this.supportedSizes.indexOf(size) < 0) {
            throw Error('Unsupported size attribute value on ButtonComponent: ' + size);
        }
    }
}

