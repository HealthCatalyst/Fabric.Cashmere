import {AfterContentInit, Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation} from '@angular/core';
import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';
import {parseBooleanAttribute} from '../util';

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
    private animationDisabled = false;
    private currentlyAnimating = false;
    private _hideToolbar = false;
    private _isOpen = false;

    @Input() triggerAlign: 'left' | 'right' = 'left';

    @Input()
    get hideToolbar(): boolean {
        return this._hideToolbar;
    }

    set hideToolbar(hide) {
        this._hideToolbar = parseBooleanAttribute(hide);
    }

    @Input()
    get open(): boolean {
        return this.isOpen;
    }

    set open(opened: boolean) {
        this.toggle(parseBooleanAttribute(opened));
    }

    @Output() opened = new EventEmitter();

    @Output() openStart = new EventEmitter();

    @Output() closed = new EventEmitter();

    @Output() closeStart = new EventEmitter();

    get isOpen(): boolean {
        return this._isOpen;
    }

    @HostBinding('class.hc-accordion') true;

    get alignment(): string {
        return this.triggerAlign === 'right' ? 'hc-align-right' : '';
    }

    get openState(): 'void' | 'open-instant' | 'open' {
        if (this._isOpen) {
            return this.animationDisabled ? 'open-instant' : 'open';
        }
        return 'void';
    }

    animationStart(event: AnimationEvent): void {
        this.currentlyAnimating = true;

        const {fromState, toState} = event;
        if (fromState === 'void' && toState === 'open') {
            this.openStart.emit();
        } else if (fromState === 'open' && toState === 'void') {
            this.closeStart.emit();
        }
    }

    animationEnd(event: AnimationEvent): void {
        const {fromState, toState} = event;
        if (fromState === 'void' && toState === 'open') {
            this.opened.emit();
        } else if (fromState === 'open' && toState === 'void') {
            this.closed.emit();
        }

        this.currentlyAnimating = false;
    }

    @HostBinding('class.hc-accordion-opened')
    get isOpened(): boolean {
        return this._isOpen && !this.currentlyAnimating;
    }

    @HostBinding('class.hc-accordion-opening')
    get isOpening(): boolean {
        return this._isOpen && this.currentlyAnimating;
    }

    @HostBinding('class.hc-accordion-closed')
    get isClosed(): boolean {
        return !this._isOpen && !this.currentlyAnimating;
    }

    @HostBinding('class.hc-accordion-closing')
    get isClosing(): boolean {
        return !this._isOpen && this.currentlyAnimating;
    }

    ngAfterContentInit(): void {
        this.animationDisabled = false;
    }

    triggerClick(event: Event): void {
        event.stopPropagation();
        this.toggle();
    }

    openAccordion(): void {
        return this.toggle(true);
    }

    closeAccordion(): void {
        return this.toggle(false);
    }

    toggle(isOpen: boolean = !this.open): void {
        if (!this.currentlyAnimating) {
            this._isOpen = isOpen;
        }
    }
}
