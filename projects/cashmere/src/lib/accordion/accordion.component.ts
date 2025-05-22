import {AfterContentInit, Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation} from '@angular/core';
import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';
import {parseBooleanAttribute} from '../util';

const supportedAligns = ['left', 'right'];

export function validateAlignInput(inputStr: string): void {
    if (supportedAligns.indexOf(inputStr) < 0) {
        throw Error('Unsupported accordion alignment value: ' + inputStr);
    }
}

/** Parent component that can have a `<hc-accordion-toolbar>` and content that is collapsable */
@Component({
    selector: 'hc-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss'],
    exportAs: 'hcAccordion',
    animations: [
        trigger('openState', [
            state('open, open-instant', style({
                height: '*'
            })),
            state('void', style({
                height: '0px',
                visibility: 'hidden'
            })),
            transition('void => open-instant', animate('0ms')),
            transition('void <=> open', animate('400ms ease'))
        ])
    ],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class AccordionComponent implements AfterContentInit {
    private _animationDisabled = false;
    private _currentlyAnimating = false;
    private _hideToolbar = false;
    private _toolbarTrigger = true;
    private _triggerAlign = 'left';
    private __isOpen = false;
    private _disabled = false;

    /** Side the accordion trigger is attached to: `left` or `right` */
    @Input()
    get triggerAlign(): string {
        return this._triggerAlign;
    }

    set triggerAlign(alignType: string) {
        validateAlignInput(alignType);
        this._triggerAlign = alignType;
    }

    /** Whether the entire width of the accordion bar is clickable, or only the down arrow button; default = true */
    @Input()
    get toolbarTrigger(): boolean {
        return this._toolbarTrigger;
    }

    set toolbarTrigger(doTrigger: boolean) {
        this._toolbarTrigger = parseBooleanAttribute(doTrigger);
    }

    /** Hide toolbar. */
    @Input()
    get hideToolbar(): boolean {
        return this._hideToolbar;
    }

    set hideToolbar(hide: boolean) {
        this._hideToolbar = parseBooleanAttribute(hide);
    }

    /** Whether the accordion is opened. */
    @Input()
    get open(): boolean {
        return this.__isOpen;
    }

    set open(opened: boolean) {
        this.toggle(parseBooleanAttribute(opened));
    }

    /** Whether the accordion button is disabled. */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(isDisabled: boolean) {
        this._disabled = parseBooleanAttribute(isDisabled);
    }

    /** Allows for two-way binding of the `open` property */
    @Output() openChange = new EventEmitter<boolean>();

    /** Event emitted when accordion is opened. */
    @Output()
    opened = new EventEmitter();

    /** Event emitted when accordion has started to open. */
    @Output()
    openStart = new EventEmitter();

    /** Event emitted when accordion is closed. */
    @Output()
    closed = new EventEmitter();

    /** Event emitted when accordion has started to close. */
    @Output()
    closeStart = new EventEmitter();

    @HostBinding('class.hc-accordion')
    _hostClass = true;

    get _alignment(): string {
        return this.triggerAlign === 'right' ? 'hc-align-right' : '';
    }

    get _pointer(): string {
        return this.toolbarTrigger === true && this.disabled === false ? 'hc-toolbar-pointer' : '';
    }

    get _hideButton(): string {
        return this.disabled === true ? 'hc-accordian-hide-button' : '';
    }

    get _openState(): 'void' | 'open-instant' | 'open' {
        if (this.__isOpen) {
            return this._animationDisabled ? 'open-instant' : 'open';
        }
        return 'void';
    }

    _animationStart(event: AnimationEvent): void {
        this._currentlyAnimating = true;

        const {fromState, toState} = event;
        if (fromState === 'void' && toState === 'open') {
            this.openStart.emit();
        } else if (fromState === 'open' && toState === 'void') {
            this.closeStart.emit();
        }
    }

    _animationEnd(event: AnimationEvent): void {
        this._currentlyAnimating = false;

        const {fromState, toState} = event;
        if (fromState === 'void' && toState === 'open') {
            this.opened.emit();
        } else if (fromState === 'open' && toState === 'void') {
            this.closed.emit();
        }
    }

    @HostBinding('class.hc-accordion-opened')
    get _isOpened(): boolean {
        return this.__isOpen && !this._currentlyAnimating;
    }

    @HostBinding('class.hc-accordion-opening')
    get _isOpening(): boolean {
        return this.__isOpen && this._currentlyAnimating;
    }

    @HostBinding('class.hc-accordion-closed')
    get _isClosed(): boolean {
        return !this.__isOpen && !this._currentlyAnimating;
    }

    @HostBinding('class.hc-accordion-closing')
    get _isClosing(): boolean {
        return !this.__isOpen && this._currentlyAnimating;
    }

    ngAfterContentInit(): void {
        this._animationDisabled = false;
    }

    _triggerClick(event: Event, toolbarClick: boolean): void {
        if ((toolbarClick && this.toolbarTrigger && !this.disabled) || !toolbarClick) {
            event.stopPropagation();
            this.toggle();
        }
    }

    /** Opens accordion. */
    toggleOpen(): void {
        return this.toggle(true);
    }

    /** Closes accordion. */
    toggleClose(): void {
        return this.toggle(false);
    }

    /** Toggle this accordion. */
    toggle(isOpen = !this.open): void {
        if (!this._currentlyAnimating) {
            this.__isOpen = isOpen;
            this.openChange.emit(isOpen);
        }
    }
}
