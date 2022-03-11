import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';

/**
 * Helper component for creating a container which automatically
 * overflows components into a more menu.
 */
@Component({
  selector: 'hc-measurable',
  templateUrl: './measurable.component.html',
  encapsulation: ViewEncapsulation.None
})
export class MeasurableComponent {

    private _width = 0;
    private _height = 0;

    _isShown = true;
    _itemKey: string | null;

    @ViewChild('measurableItem')
    _targetItem: ElementRef;

    /**
     * The unique key of the item displayed inside this measurable component.
     */
    @Input()
    get itemKey(): string {
        if (this._itemKey) {
            return this._itemKey
        }

        throw new Error('The current item is missing its unique key.');
    }

    set itemKey(itemKeyVal: string) {
        this._itemKey = itemKeyVal;
    }

    /**
     * Calculates and returns the measured width of this container.
     * The width is cached for future calls to this property.
     */
    get width(): number {
        if (!this._width) {
            const shouldShow = this._isShown;
            this.show();

            this._width = this._targetItem?.nativeElement?.scrollWidth ?? 0;

            if (!shouldShow) {
                this.hide();
            }
        }

        return this._width;
    }

    /**
     * Calculates and returns the measured height of this container.
     * The height is cached for future calls to this property.
     */
     get height(): number {
        if (!this._height) {
            const shouldShow = this._isShown;
            this.show();

            this._height = this._targetItem?.nativeElement?.scrollHeight ?? 0;

            if (!shouldShow) {
                this.hide();
            }
        }

        return this._height;
    }

    constructor(private ref: ChangeDetectorRef) {}

    /**
     * Shows the contents of this container, forcing a change detection
     * cycle to run.
     */
    show(): void {
        this._isShown = true;
        this.ref.detectChanges();
    }

    /**
     * Hides the contents of this container, forcing a change detection
     * cycle to run.
     */
     hide(): void {
        this._isShown = false;
        this.ref.detectChanges();
    }
}
