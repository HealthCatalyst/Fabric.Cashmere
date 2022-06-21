import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';
import {parseBooleanAttribute} from '../util';
import {filter, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

/** Result of opening or closing the drawer */
export class DrawerPromiseResult {
    constructor(public type: 'open' | 'close') {}
}

const supportedModes = ['over', 'push', 'side'];

export function validateModeInput(inputStr: string): void {
    if (supportedModes.indexOf(inputStr) < 0) {
        throw Error('Unsupported drawer mode value: ' + inputStr);
    }
}

const supportedAligns = ['left', 'right'];

export function validateAlignInput(inputStr: string): void {
    if (supportedAligns.indexOf(inputStr) < 0) {
        throw Error('Unsupported drawer alignment value: ' + inputStr);
    }
}

const openStateAnimation = '0.75s ease';
const closeStateAnimation = '0.7s .05s ease';

/** Drawer that can be opened or closed on the drawer container */
@Component({
    selector: 'hc-drawer',
    template: '<ng-content></ng-content>',
    styleUrls: ['drawer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('openState', [
            state(
                'open-left, open-right, open-instant',
                style({
                    visibility: 'visible'
                })
            ),
            state(
                'void, close-instant',
                style({
                    'box-shadow': 'none',
                    // overflow override included to prevent Safari from still showing the scrollbar when the drawer is closed
                    'overflow-y': 'hidden',
                    visibility: 'hidden'
                })
            ),
            transition('void => open-instant', animate('0ms')),
            transition('open-instant => close-instant', animate('0ms')),
            transition('open-left => close-instant', animate('0ms')),
            transition('open-right => close-instant', animate('0ms')),
            transition('open-instant => void', animate(openStateAnimation)),
            transition('void => open-left', [
                animate('0ms', style({ transform: 'translate3d(-100%, 0, 0)' })),
                animate(closeStateAnimation)
            ]),
            transition('open-left => void', [
                animate(openStateAnimation, style({ transform: 'translate3d(-100%, 0, 0)' }))
            ]),
            transition('void => open-right', [
                animate('0ms', style({ transform: 'translate3d(100%, 0, 0)'})),
                animate(closeStateAnimation)
            ]),
            transition('open-right => void', [
                animate(openStateAnimation, style({ transform: 'translate3d(100%, 0, 0)' }))
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Drawer implements AfterContentInit {
    private _mode = 'push';
    private _align = 'left';
    _animated = false;

    /** Defaults to false. Set to true to disable the closure of drawer by pressing the escape key. */
    @Input() ignoreEscapeKey = false;

    /** Mode of the drawer: `over`, `push` or `side` */
    @Input()
    get mode(): string {
        return this._mode;
    }

    set mode(modeType: string) {
        validateModeInput(modeType);
        this._mode = modeType;
    }

    /** Side the drawer is attached to: `left` or `right` */
    @Input()
    get align(): string {
        return this._align;
    }

    set align(alignType: string) {
        validateAlignInput(alignType);
        this._align = alignType;
    }

    /** Event emitted when drawer has started to open */
    @Output()
    get openStart(): Observable<void> {
        return this._animationStarted.pipe(
            filter(event => event.fromState === 'void' && event.toState.startsWith('open-') ),
            map(() => {
                // do nothing.
            })
        );
    }

    /** Event emitted when drawer has started to close */
    @Output()
    get closeStart(): Observable<void> {
        return this._animationStarted.pipe(
            filter(event => event.fromState.startsWith('open-') && event.toState === 'void'),
            map(() => {
                // do nothing.
            })
        );
    }

    /* Allows for two-way binding of the `opened` property */
    @Output() openedChange = new EventEmitter<boolean>();

    /** Tabindex of the element */
    @HostBinding()
    tabindex = -1;
    @HostBinding('class.hc-drawer')
    _drawerClass = true;

    readonly _animationStarted = new EventEmitter<AnimationEvent>();

    private _animationDisabled = true;
    private _drawerOpened = false;
    private _animationPromise: Promise<DrawerPromiseResult> | null;
    private _resolveAnimationPromise: () => void = () => {
        // do nothing.
    };

    /** Whether the drawer is opened. */
    @Input()
    get opened(): boolean {
        return this._drawerOpened;
    }

    set opened(opened: boolean) {
        if ( opened !== this._drawerOpened ) {
            this.toggle(parseBooleanAttribute(opened));
        }
    }

    get _width(): number {
        return this.elementRef.nativeElement.offsetWidth;
    }

    @HostBinding('class.hc-drawer-opened')
    get _isOpened(): boolean {
        return this._drawerOpened && !this._animationPromise;
    }

    @HostBinding('class.hc-drawer-opening')
    get _isOpening(): boolean {
        return this._drawerOpened && !!this._animationPromise;
    }

    @HostBinding('class.hc-drawer-closed')
    get _isClosed(): boolean {
        return !this._drawerOpened && !this._animationPromise;
    }

    @HostBinding('class.hc-drawer-closing')
    get _isClosing() : boolean{
        return !this._drawerOpened && !!this._animationPromise;
    }

    @HostBinding('class.hc-drawer-right')
    get _isRight(): boolean {
        return this._align === 'right';
    }

    @HostBinding('@openState')
    get _openState(): 'void' | 'open-instant' | 'close-instant'| 'open-left' | 'open-right' {
        if (this._drawerOpened) {
            if (this._animationDisabled || !this._animated) {
                return 'open-instant';
            }

            return this._align === 'right' ? 'open-right' : 'open-left';
        }
        return this._animated ? 'void' : 'close-instant';
    }

    @HostListener('@openState.start', ['$event'])
    _onAnimationStart(event: AnimationEvent): void {
        this._animationStarted.emit(event);
    }

    @HostListener('@openState.done')
    _onAnimationEnd(): void {
        this.openedChange.next(this.opened);

        if (this._animationPromise) {
            this._resolveAnimationPromise();
            this._resolveAnimationPromise = () => {
                // do nothing.
            };
            this._animationPromise = null;
        }
    }

    @HostListener('keydown', ['$event'])
    _onKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Escape' && !this.ignoreEscapeKey) {
            this.toggleClose();
            event.stopPropagation();
        }
    }

    constructor(protected elementRef: ElementRef) {}

    ngAfterContentInit(): void {
        if (this._animationPromise) {
            this._resolveAnimationPromise();
            this._resolveAnimationPromise = () => {
                // do nothing.
            };
            this._animationPromise = null;
        }
        this._animationDisabled = false;
    }

    /** Toggles the drawer open */
    toggleOpen(): Promise<DrawerPromiseResult> {
        return this.toggle(true);
    }

    /** Toggles the drawer closed */
    toggleClose(): Promise<DrawerPromiseResult> {
        return this.toggle(false);
    }

    /** Toggles the drawer */
    toggle(isOpen = !this.opened): Promise<DrawerPromiseResult> {
        if (!this._animationPromise) {
            this._drawerOpened = isOpen;

            this._animationPromise = new Promise<DrawerPromiseResult>(resolve => {
                this._resolveAnimationPromise = () => resolve(new DrawerPromiseResult(isOpen ? 'open' : 'close'));
            });
        }
        return this._animationPromise;
    }
}
