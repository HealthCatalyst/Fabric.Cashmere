import { CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';

import { ResizablePosition, ResizablePositionOption } from './resizable.config';
import { ResizableMetadata as Meta } from './resizable.meta';

/** A container that the user can resize the dimensions of */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[hc-resizable]',
    templateUrl: './resizable.component.html',
    styleUrls: ['./resizable.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})

export class ResizableComponent implements OnChanges {
    @Input() isResizable = true;
    @Input() position: ResizablePosition;

    @Output() resized = new EventEmitter<DOMRect>();

    className: string;
    classNameSelector: string;

    private _dragMove$ = new Subject<CdkDragMove>();
    private _startSize$ = new Subject<DOMRect>();

    subscription$ = this._dragMove$.pipe(
        withLatestFrom(this._startSize$),
        tap(([{ distance }, rect]) => {
            if (this._isHorizontal()) {
                this._element.nativeElement.style.width =
                    this.position === ResizablePositionOption.left
                        ? `${rect.width - distance.x}px`
                        : `${rect.width + distance.x}px`;
            } else if (this._isVertical()) {
                this._element.nativeElement.style.height =
                    this.position === ResizablePositionOption.top
                        ? `${rect.height - distance.y}px`
                        : `${rect.height + distance.y}px`;
            }
        })
    );

    constructor(private _element: ElementRef<HTMLElement>) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.isResizable?.currentValue || changes.position?.currentValue) {
            this._setDefaultStyles();
        }
        if (changes.position?.currentValue) {
            this._initClassName(changes.position.currentValue);
        }
    }

    dragStarted(): void {
        this.className = `${this.className}${Meta.highlight}`;
        this._startSize$.next(this._element.nativeElement.getBoundingClientRect());
    }

    dragEnded($event: CdkDragEnd): void {
        this.className = this.className.replace(Meta.highlight, '');
        $event.source._dragRef.reset();
        this.resized.emit(this._element.nativeElement.getBoundingClientRect());
    }

    dragMoved($event: CdkDragMove): void {
        this._dragMove$.next($event);
    }

    private _initClassName(position: ResizablePosition): void {
        this.className = `${Meta.classPrefix}${position}`;
        this.classNameSelector = `${Meta.classSelectorPrefix}${position}`;
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
}
