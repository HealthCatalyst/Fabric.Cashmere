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

@Component({
    selector: 'hc-pick-option',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<ng-content></ng-content>`
})
/** Component used to add options to a picklist in declarative way. */
export class PickOptionComponent implements OnChanges, AfterViewChecked, OnDestroy {
    @Input() value: any;
    @Input() set disabled(value: boolean) { this._disabled = this._isDisabled(value) }
    get disabled() { return this._disabled; }

    readonly stateChange$ = new Subject<{ value: any, disabled: boolean, label?: string }>();

    private _disabled = false;
    private _previousLabel: string;

    constructor(public elementRef: ElementRef<HTMLElement>) { }

    get label(): string { return (this.elementRef.nativeElement.textContent || '').trim(); }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.disabled) {
            this.stateChange$.next({
                value: this.value,
                disabled: this._disabled
            });
        }
    }

    ngAfterViewChecked() {
        if (this.label !== this._previousLabel) {
            this._previousLabel = this.label;
            this.stateChange$.next({
                value: this.value,
                disabled: this._disabled,
                label: this.elementRef.nativeElement.textContent || undefined
            });
        }
    }

    ngOnDestroy() {
        this.stateChange$.complete();
    }

    private _isDisabled(value) {
        return value != null && `${value}` !== 'false';
    }
}
