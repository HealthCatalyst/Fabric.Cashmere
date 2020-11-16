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

export function validateModeInput(inputStr: string) {
    if (supportedModes.indexOf(inputStr) < 0) {
        throw Error('Unsupported drawer mode value: ' + inputStr);
    }
}

const supportedAligns = ['left', 'right'];

export function validateAlignInput(inputStr: string) {
    if (supportedAligns.indexOf(inputStr) < 0) {
        throw Error('Unsupported drawer alignment value: ' + inputStr);
    }
}

const openStateAnimation = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

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
                'void',
                style({
                    'box-shadow': 'none',
                    visibility: 'hidden'
                })
            ),
            transition('void => open-instant', animate('0ms')),
            transition('open-instant => void', animate(openStateAnimation)),
            transition('void => open-left', [
                animate('0ms', style({ transform: 'translate3d(-100%, 0, 0)' })),
                animate(openStateAnimation)
            ]),
            transition('open-left => void', [
                animate(openStateAnimation, style({ transform: 'translate3d(-100%, 0, 0)' }))
            ]),
            transition('void => open-right', [
                animate('0ms', style({ transform: 'translate3d(100%, 0, 0)'})),
                animate(openStateAnimation)
            ]),
            transition('open-right => void', [
                animate(openStateAnimation, style({ transform: 'translate3d(100%, 0, 0)' }))
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Drawer implements AfterContentInit {
    readonly _openChange = new EventEmitter<boolean>();
    private _mode: string = 'push';
    private _align: string = 'left';

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
            filter(event => event.fromState === 'void' && event.toState === 'open'),
            map(() => {})
        );
    }

    /** Event emitted when drawer has started to close */
    @Output()
    get closeStart(): Observable<void> {
        return this._animationStarted.pipe(
            filter(event => event.fromState === 'open' && event.toState === 'void'),
            map(() => {})
        );
    }

    /** Event emitted when drawer has opened */
    @Output('opened')
    get _openStream() {
        return this._openChange.pipe(
            filter(value => value),
            map(() => {})
        );
    }

    /** Event emitted when drawer has closed */
    @Output('closed')
    get _closeStream() {
        return this._openChange.pipe(
            filter(value => !value),
            map(() => {})
        );
    }

    /** Tabindex of the element */
    @HostBinding()
    tabindex = -1;
    @HostBinding('class.hc-drawer')
    _drawerClass = true;

    readonly _animationStarted = new EventEmitter<AnimationEvent>();

    private _animationDisabled = true;
    private _drawerOpened = false;
    private _animationPromise: Promise<DrawerPromiseResult> | null;
    private _resolveAnimationPromise: () => void = () => {};

    /** Whether the drawer is opened. */
    @Input()
    get opened(): boolean {
        return this._drawerOpened;
    }

    set opened(opened) {
        this.toggle(parseBooleanAttribute(opened));
    }

    get _width(): number {
        return this.elementRef.nativeElement.offsetWidth;
    }

    @HostBinding('class.hc-drawer-opened')
    get _isOpened() {
        return this._drawerOpened && !this._animationPromise;
    }

    @HostBinding('class.hc-drawer-opening')
    get _isOpening() {
        return this._drawerOpened && !!this._animationPromise;
    }

    @HostBinding('class.hc-drawer-closed')
    get _isClosed() {
        return !this._drawerOpened && !this._animationPromise;
    }

    @HostBinding('class.hc-drawer-closing')
    get _isClosing() {
        return !this._drawerOpened && !!this._animationPromise;
    }

    @HostBinding('class.hc-drawer-right')
    get _isRight() {
        return this._align === 'right';
    }

    @HostBinding('@openState')
    get _openState(): 'void' | 'open-instant' | 'open-left' | 'open-right' {
        if (this._drawerOpened) {
            if (this._animationDisabled) {
                return 'open-instant';
            }

            return this._align === 'right' ? 'open-right' : 'open-left';
        }
        return 'void';
    }

    @HostListener('@openState.start', ['$event'])
    _onAnimationStart(event: AnimationEvent) {
        this._animationStarted.emit(event);
    }

    @HostListener('@openState.done', ['$event'])
    _onAnimationEnd(event: AnimationEvent) {
        this._openChange.next(this.opened);

        if (this._animationPromise) {
            this._resolveAnimationPromise();
            this._resolveAnimationPromise = () => {};
            this._animationPromise = null;
        }
    }

    @HostListener('keydown', ['$event'])
    _onKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.toggleClose();
            event.stopPropagation();
        }
    }

    constructor(protected elementRef: ElementRef) {}

    ngAfterContentInit() {
        if (this._animationPromise) {
            this._resolveAnimationPromise();
            this._resolveAnimationPromise = () => {};
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
    toggle(isOpen: boolean = !this.opened): Promise<DrawerPromiseResult> {
        if (!this._animationPromise) {
            this._drawerOpened = isOpen;

            this._animationPromise = new Promise<DrawerPromiseResult>(resolve => {
                this._resolveAnimationPromise = () => resolve(new DrawerPromiseResult(isOpen ? 'open' : 'close'));
            });
        }
        return this._animationPromise;
    }
}
