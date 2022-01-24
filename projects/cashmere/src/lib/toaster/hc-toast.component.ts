import {Component, EventEmitter, ElementRef, ViewContainerRef, ComponentRef, ChangeDetectorRef, ViewEncapsulation} from '@angular/core';
import {trigger, state, style, transition, animate, AnimationEvent} from '@angular/animations';
import {Portal, CdkPortalOutletAttachedRef} from '@angular/cdk/portal';
import {BehaviorSubject} from 'rxjs';
import {HcIcon} from '../icon/icon.component';

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
    _canClick = false;
    _toastPortal: Portal<unknown>;
    _width = 300;
    _hasProgressBar = false;
    _progressVal: number;
    _progressWidth = '100%';
    _customImage: string | HcIcon;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly _componentInstance = new BehaviorSubject<any>(null);

    get _widthStr(): string {
        return this._width ? `${this._width}px` : 'auto';
    }

    constructor(public _el: ElementRef, public _viewContainerRef: ViewContainerRef, public _changeRef: ChangeDetectorRef) {}

    _onAnimationStart(event: AnimationEvent): void {
        this._animationStateChanged.emit(event);
    }

    _onAnimationDone(event: AnimationEvent): void {
        this._animationStateChanged.emit(event);
    }

    _startExitAnimation(): void {
        this._animationState = 'leave';
    }

    _dismissClick(event: MouseEvent): void {
        this._closeClick.emit(event);
    }

    _customComponentAttached(ref: CdkPortalOutletAttachedRef): void {
        if (ref instanceof ComponentRef) {
            this._componentInstance.next(ref.instance);
        }
    }

    _imgIsURL( val:string | HcIcon ): boolean {
        return typeof val === 'string';
    }

    _customFontSet( val: string | HcIcon ): string {
        const icon = val as HcIcon;
        return icon.fontSet;
    }

    _customFontIcon( val: string | HcIcon ): string {
        const icon = val as HcIcon;
        return icon.fontIcon;
    }
}
