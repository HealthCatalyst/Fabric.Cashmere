import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    Output
} from '@angular/core';
import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';
import {parseBooleanAttribute} from '../util';
import {Observable} from 'rxjs/internal/Observable';
import {filter, map} from 'rxjs/operators';

export class DrawerPromiseResult {
    constructor(public type: 'open' | 'close') {
    }
}

@Component({
    selector: 'hc-drawer',
    template: '<ng-content></ng-content>',
    styleUrls: ['drawer.component.scss'],
    animations: [
        trigger('openState', [
            state(
                'open, open-instant',
                style({
                    'transform': 'translate3d(0, 0, 0)',
                    'visibility': 'visible'
                })
            ),
            state(
                'void',
                style({
                    'box-shadow': 'none',
                    'visibility': 'hidden'
                })
            ),
            transition('void => open-instant', animate('0ms')),
            transition('void <=> open, open-instant => void', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerComponent implements AfterContentInit {
    @Input() mode: 'over' | 'push' | 'side' = 'push';
    @Input() align: 'left' | 'right' = 'left';

    @Output()
    get openStart(): Observable<void> {
        return this._animationStarted.pipe(
            filter(event => event.fromState === 'void' && event.toState === 'open'),
            map(() => {
            })
        );
    }

    @Output()
    get closeStart(): Observable<void> {
        return this._animationStarted.pipe(
            filter(event => event.fromState === 'open' && event.toState === 'void'),
            map(() => {
            })
        );
    }

    @Output() openChange = new EventEmitter<boolean>();

    @HostBinding() tabindex = -1;
    @HostBinding('class.drawer') drawerClass = true;

    _animationStarted = new EventEmitter<AnimationEvent>();

    private animationDisabled = true;
    private drawerOpened = false;
    private animationPromise: Promise<DrawerPromiseResult> | null;
    private resolveAnimationPromise: () => void = () => {
    };

    @Input()
    get opened(): boolean {
        return this.drawerOpened;
    }

    set opened(opened) {
        this.toggle(parseBooleanAttribute(opened));
    }

    get width(): number {
        return this.elementRef.nativeElement.offsetWidth;
    }

    @HostBinding('class.drawer-opened')
    get isOpened() {
        return this.drawerOpened && !this.animationPromise;
    }

    @HostBinding('class.drawer-opening')
    get isOpening() {
        return this.drawerOpened && !!this.animationPromise;
    }

    @HostBinding('class.drawer-closed')
    get isClosed() {
        return !this.drawerOpened && !this.animationPromise;
    }

    @HostBinding('class.drawer-closing')
    get isClosing() {
        return !this.drawerOpened && !!this.animationPromise;
    }

    @HostBinding('class.drawer-right')
    get isRight() {
        return this.align === 'right';
    }

    @HostBinding('@openState')
    get openState(): 'void' | 'open-instant' | 'open' {
        if (this.drawerOpened) {
            return this.animationDisabled ? 'open-instant' : 'open';
        }
        return 'void';
    }

    @HostListener('@openState.start', ['$event'])
    onAnimationStart(event: AnimationEvent) {
        this._animationStarted.emit(event);
    }

    @HostListener('@openState.done', ['$event'])
    onAnimationEnd(event: AnimationEvent) {
        this.openChange.emit(this.opened);

        if (this.animationPromise) {
            this.resolveAnimationPromise();
            this.resolveAnimationPromise = () => {
            };
            this.animationPromise = null;
        }
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (event.keyCode === 27) {
            this.toggleClose();
            event.stopPropagation();
        }
    }

    constructor(private elementRef: ElementRef) {
    }

    ngAfterContentInit() {
        if (this.animationPromise) {
            this.resolveAnimationPromise();
            this.resolveAnimationPromise = () => {
            };
            this.animationPromise = null;
        }
        this.animationDisabled = false;
    }

    toggleOpen(): Promise<DrawerPromiseResult> {
        return this.toggle(true);
    }

    toggleClose(): Promise<DrawerPromiseResult> {
        return this.toggle(false);
    }

    toggle(isOpen: boolean = !this.opened): Promise<DrawerPromiseResult> {
        if (!this.animationPromise) {
            this.drawerOpened = isOpen;

            this.animationPromise = new Promise<DrawerPromiseResult>(resolve => {
                this.resolveAnimationPromise = () => resolve(new DrawerPromiseResult(isOpen ? 'open' : 'close'));
            });
        }
        return this.animationPromise;
    }
}
