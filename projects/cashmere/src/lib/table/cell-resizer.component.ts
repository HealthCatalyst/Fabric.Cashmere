/* Based on an example posted at: https://github.com/angular/material2/issues/8312 */

import {ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BindObservable} from './bind-observable/bind-observable';
import {untilDestroyed} from '../util';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {skip} from 'rxjs/operators';

export class CellResizeEvent {
    constructor(public width: number, public directionLeft: boolean) {}
}

@Component({
    selector: 'hc-cell-resizer',
    template: '<div class="hc-cell-resizer-left"></div><div class="hc-cell-resizer-right"></div>',
    styleUrls: ['./cell-resizer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HcCellResizer implements OnInit, OnDestroy {
    /**
     * Sets whether the resizer is active or not
     */
    @HostBinding('class.disabled') @Input() disabled = false;

    /**
     * Stores the width value for this resizer;
     * typically used with two-way binding on the cell's style.width property
     */
    @Input()
    get width(): number {
        return this._width;
    }
    set width(value: number) {
        if (value > 0) {
            this._width = value;
        }
    }
    private _width!: number;

    private _directionModifier: number = 1;

    /**
     * Emits a `CellResizeEvent` when a cell has been resized
     */
    @Output() public resized = new EventEmitter<CellResizeEvent>();

    @BindObservable() private isResizing = false;
    private isResizing$!: Observable<boolean>;

    /**
     * Emits a boolean value of true while a cell is being resized
     */
    @Output() public resizing = new EventEmitter<boolean>();

    private dragSubscription?: Subscription;

    public ngOnInit(): void {
        this.isResizing$
            .pipe(
                // Skip default value
                skip(1),
                untilDestroyed(this)
            )
            .subscribe(isResizing => {
                this.resizing.emit(isResizing);

                if (isResizing) {
                    // We must use arrow function to avoid losing the context,
                    //  we cannot pass directly the functions references
                    this.dragSubscription = fromEvent<MouseEvent>(window.document, 'mousemove')
                        .pipe(untilDestroyed(this))
                        .subscribe(event => this._resizeColumn(event));
                    this.dragSubscription.add(
                        fromEvent(window.document, 'mouseup')
                            .pipe(untilDestroyed(this))
                            .subscribe(() => this._stopResizing())
                    );
                } else {
                    // When resize finishes, we emit one last "resized" event for which
                    //  the corresponding "isResizing" value will be false.
                    // This can be used to detect which is the final resizing event
                    //  and ignore the others
                    this.resized.emit(new CellResizeEvent(this.width, this._directionModifier === -1));
                    if (this.dragSubscription) {
                        this.dragSubscription.unsubscribe();
                    }
                }
            });
    }

    private _resizeColumn(event: MouseEvent) {
        const newWidth = this.width + event.movementX * this._directionModifier;

        if (newWidth >= 0) {
            this.resized.emit(new CellResizeEvent(newWidth, this._directionModifier === -1));
        }
        // Prevent text selection while resizing
        event.preventDefault();
        event.stopPropagation();
    }

    // Same problems that mousemove listener have
    private _stopResizing() {
        this.isResizing = false;
    }

    // isResizing can be set to true only when the component is not disabled
    @HostListener('mousedown', ['$event']) _startResizing(event: MouseEvent) {
        this.isResizing = !this.disabled;

        if ((<Element>event.target).className === 'hc-cell-resizer-left') {
            this._directionModifier = -1;
        } else {
            this._directionModifier = 1;
        }

        // Prevent text selection while resizing
        event.preventDefault();
        event.stopPropagation();
    }

    // Must be present for AOT compilation to work, even if empty
    // Otherwise 'ng build --prod' will optimize away any calls to ngOnDestroy,
    // even if the method is added by the untilDestroyed operator
    public ngOnDestroy() {}
}
