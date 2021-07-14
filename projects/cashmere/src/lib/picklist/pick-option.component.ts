import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges
} from '@angular/core';
import { Subject } from 'rxjs';
export interface PickOptionStateChange { value: boolean; disabled: boolean; label?: string; }

/** Component used to add options to a picklist in declarative way. `<hc-pick-option>` */
@Component({
    selector: 'hc-pick-option',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<ng-content></ng-content>`
})
export class PickOptionComponent implements OnChanges, AfterViewChecked, OnDestroy {
    /** Value for this option. */
    @Input() value: boolean;
    /** If true, the option cannot be selected. */
    @Input() set disabled(value: boolean) { this._disabled = this._isDisabled(value); }
    get disabled(): boolean { return this._disabled; }

    readonly _stateChange$ = new Subject<PickOptionStateChange>();

    private _disabled = false;
    private _previousLabel: string;

    constructor(
        /** Reference to underlying HTML element. */
        public elementRef: ElementRef<HTMLElement>) { }

    /** Getter. Returns the text used as the label for this option. */
    get label(): string { return (this.elementRef.nativeElement.textContent || '').trim(); }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.disabled) {
            this._stateChange$.next({
                value: this.value,
                disabled: this._disabled
            });
        }
    }

    ngAfterViewChecked(): void {
        if (this.label !== this._previousLabel) {
            this._previousLabel = this.label;
            this._stateChange$.next({
                value: this.value,
                disabled: this._disabled,
                label: this.elementRef.nativeElement.textContent || undefined
            });
        }
    }

    ngOnDestroy(): void {
        this._stateChange$.complete();
    }

    private _isDisabled(value) {
        return value != null && `${value}` !== 'false';
    }
}
