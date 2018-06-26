import {AfterContentInit, Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation} from '@angular/core';
import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';
import {parseBooleanAttribute} from '../util';

/** Parent component that can have a `<hc-accordion-toolbar>` and content that is collapsable */
@Component({
    selector: 'hc-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss'],
    exportAs: 'hcAccordion',
    animations: [
        trigger('openState', [
            state(
                'open, open-instant',
                style({
                    height: '*'
                })
            ),
            state(
                'void',
                style({
                    height: '0px',
                    visibility: 'hidden'
                })
            ),
            transition('void => open-instant', animate('0ms')),
            transition('void <=> open', animate('400ms ease'))
        ])
    ],
    encapsulation: ViewEncapsulation.None
})
export class AccordionComponent implements AfterContentInit {
    private _animationDisabled = false;
    private _currentlyAnimating = false;
    private _hideToolbar = false;
    private __isOpen = false;

    /** Side the the accordion trigger is attached to. */
    @Input() triggerAlign: 'left' | 'right' = 'left';

    /** Hide toolbar. */
    @Input()
    get hideToolbar(): boolean {
        return this._hideToolbar;
    }

    set hideToolbar(hide) {
        this._hideToolbar = parseBooleanAttribute(hide);
    }

    /** Whether the accordion is opened. */
    @Input()
    get open(): boolean {
        return this._isOpen;
    }

    set open(opened: boolean) {
        this.toggle(parseBooleanAttribute(opened));
    }

    /** Event emitted when accordion is opened. */
    @Output() opened = new EventEmitter();

    /** Event emitted when accordion has started to open. */
    @Output() openStart = new EventEmitter();

    /** Event emitted when accordion is closed. */
    @Output() closed = new EventEmitter();

    /** Event emitted when accordion has started to close. */
    @Output() closeStart = new EventEmitter();

    get _isOpen(): boolean {
        return this.__isOpen;
    }

    @HostBinding('class.hc-accordion') _hostClass = true;

    get _alignment(): string {
        return this.triggerAlign === 'right' ? 'hc-align-right' : '';
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
        const {fromState, toState} = event;
        if (fromState === 'void' && toState === 'open') {
            this.opened.emit();
        } else if (fromState === 'open' && toState === 'void') {
            this.closed.emit();
        }

        this._currentlyAnimating = false;
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

    _triggerClick(event: Event): void {
        event.stopPropagation();
        this.toggle();
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
    toggle(isOpen: boolean = !this.open): void {
        if (!this._currentlyAnimating) {
            this.__isOpen = isOpen;
        }
    }
}
