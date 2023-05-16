import { Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { ResizablePosition, ResizablePositionOption } from './resizable.config';
import { ResizableMetadata as Meta } from './resizable.meta';
import { parseBooleanAttribute, untilDestroyed } from '../util';

/** A container that the user can resize the dimensions of */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[hcResizable]',
    templateUrl: './resizable.component.html',
    styleUrls: ['./resizable.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ResizableComponent implements OnChanges {
    _className: string;
    _classNameSelector: string;

    private _mousePos: number;
    private _startSize: number;
    private _disabled = false;

    private _dragSubscription: Subscription;

    @HostBinding('class.hc-resizable-container')
    _hostClass = true;

    /** Removes the resizable handle from the container when set to `true` */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: boolean | string ) {
        this._disabled = parseBooleanAttribute( value );
    }

    /** Determines which corner of the container the drag handle will be available on.
     * Accepts `bottom`, `left`, `right`, or `top`.*/
    @Input() position: ResizablePosition;

    /** The maximum value (in pixels) that the container may expand to. There is no max by default.*/
    @Input() max: number;

    /** The minimum value (in pixels) that the container may contract to. There is no min by default.*/
    @Input() min: number;

    /** Emits a `DOMRect` after a drag event is complete */
    @Output() resized = new EventEmitter<DOMRect>();

    constructor(public _element: ElementRef<HTMLElement>) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.disabled?.currentValue || changes.position?.currentValue) {
            this._setDefaultStyles();
        }
        if (changes.position?.currentValue) {
            this._initClassName(changes.position.currentValue);
        }
    }

    _dragStarted(event: MouseEvent): void {
        this._className = `${this._className} ${Meta.highlight}`;
        this._startSize = this._isVertical() ? this._element.nativeElement.getBoundingClientRect().height : this._element.nativeElement.getBoundingClientRect().width;
        this._mousePos = this._isVertical() ? event.screenY : event.screenX;

        event.stopPropagation();
        event.preventDefault();

        this._dragSubscription = fromEvent<MouseEvent>(window.document, 'mousemove')
            .pipe(untilDestroyed(this))
            .subscribe(event => this._dragMoved(event));
        this._dragSubscription.add(
            fromEvent(window.document, 'mouseup')
                .pipe(untilDestroyed(this))
                .subscribe(() => this._dragEnded())
        );
    }

    _dragEnded(): void {
        if (this._dragSubscription) {
            this._className = this._className.replace(Meta.highlight, '');
            this.resized.emit(this._element.nativeElement.getBoundingClientRect());
            this._dragSubscription.unsubscribe();
        }
    }

    _dragMoved(event: MouseEvent): void {
        if (this._isVertical()) {
            const delta = event.screenY - this._mousePos;
            this._element.nativeElement.style.height =
                this.position === ResizablePositionOption.top
                    ? `${this._startSize - delta}px`
                    : `${this._startSize + delta}px`;
            this._startSize = this._element.nativeElement.getBoundingClientRect().height;
            if ( this._startSize > this.max ) {
                this._element.nativeElement.style.height = this.max + 'px';
                this._startSize = this.max;
            } else if ( this._startSize < this.min ) {
                this._element.nativeElement.style.height = this.min + 'px';
                this._startSize = this.min;
            }
            this._mousePos = event.screenY;
        } else {
            const delta = event.screenX - this._mousePos;
            this._element.nativeElement.style.width =
                this.position === ResizablePositionOption.left
                    ? `${this._startSize - delta}px`
                    : `${this._startSize + delta}px`;
            this._startSize = this._element.nativeElement.getBoundingClientRect().width;
            if ( this._startSize > this.max ) {
                this._element.nativeElement.style.width = this.max + 'px';
                this._startSize = this.max;
            } else if ( this._startSize < this.min ) {
                this._element.nativeElement.style.width = this.min + 'px';
                this._startSize = this.min;
            }
            this._mousePos = event.screenX;
        }

        event.stopPropagation();
        event.preventDefault();
    }

    /** Resets the resizeable container to its orginal default size */
    reset(): void {
        this._element.nativeElement.style.width = '';
        this._element.nativeElement.style.height = '';
    }

    private _initClassName(position: ResizablePosition): void {
        this._className = `${Meta.baseClass} ${Meta.classPrefix}${position}`;
        this._classNameSelector = `${Meta.classSelectorPrefix}${position}`;
    }

    private _isHorizontal(): boolean {
        return this.position === ResizablePositionOption.left || this.position === ResizablePositionOption.right;
    }

    private _isVertical(): boolean {
        return this.position === ResizablePositionOption.bottom || this.position === ResizablePositionOption.top;
    }

    private _setDefaultStyles(): void {
        const classes = this._element.nativeElement.className ?? '';
        if (this._isHorizontal() && !Meta.regexMaxWidth.test(classes)) {
            this._element.nativeElement.className = `${classes} ${Meta.maxWidthClass}`;
        } else if (this._isVertical() && !Meta.regexMaxHeight.test(classes)) {
            this._element.nativeElement.className = `${classes} ${Meta.maxHeightClass}`;
        }
    }

    // Must be present for AOT compilation to work, even if empty
    public ngOnDestroy(): void { return; }
}
