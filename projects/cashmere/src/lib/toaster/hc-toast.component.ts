import {Component, EventEmitter, ElementRef, ViewContainerRef, ComponentRef, ChangeDetectorRef, ViewEncapsulation} from '@angular/core';
import {trigger, state, style, transition, animate, AnimationEvent} from '@angular/animations';
import {Portal, CdkPortalOutletAttachedRef} from '@angular/cdk/portal';
import {BehaviorSubject} from 'rxjs';

const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
    selector: 'hc-toaster',
    templateUrl: './hc-toast.component.html',
    styleUrls: ['./hc-toast.component.scss'],
    host: {class: 'hc-toaster'},
    animations: [
        trigger('fade', [
            state('void', style({transform: 'none', opacity: 0})),
            state('enter', style({transform: 'none', opacity: 1})),
            state('leave', style({transform: 'none', opacity: 0})),
            transition('* => *', animate(ANIMATION_TIMINGS))
        ])
    ],
    encapsulation: ViewEncapsulation.None
})
export class HcToastComponent {
    _styleType = 'success';
    _toastIcon = 'fa-check-circle';
    _headerText: string;
    _bodyText: string;
    _animationState: 'void' | 'enter' | 'leave' = 'enter';
    _animationStateChanged = new EventEmitter<AnimationEvent>();
    _closeClick = new EventEmitter<MouseEvent>();
    _canDismiss = false;
    _toastPortal: Portal<any>;
    _width = 300;
    _hasProgressBar = false;
    _progressVal: number;
    _progressWidth = '100%';
    readonly _componentInstance = new BehaviorSubject<any>(null);

    get _widthStr() {
        return this._width ? `${this._width}px` : 'auto';
    }

    constructor(public _el: ElementRef, public _viewContainerRef: ViewContainerRef, public _changeRef: ChangeDetectorRef) {}

    _onAnimationStart(event: AnimationEvent) {
        this._animationStateChanged.emit(event);
    }

    _onAnimationDone(event: AnimationEvent) {
        this._animationStateChanged.emit(event);
    }

    _startExitAnimation() {
        this._animationState = 'leave';
    }

    _dismissClick(event: MouseEvent) {
        this._closeClick.emit(event);
    }

    _customComponentAttached(ref: CdkPortalOutletAttachedRef) {
        if (ref instanceof ComponentRef) {
            this._componentInstance.next(ref.instance);
        }
    }
}
