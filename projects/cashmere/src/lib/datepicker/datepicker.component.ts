/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Component,
    ViewEncapsulation,
    Output,
    EventEmitter,
    Optional,
    InjectionToken,
    ElementRef,
    ChangeDetectionStrategy,
    OnDestroy,
    Input,
    ComponentRef,
    NgZone,
    ViewContainerRef,
    Inject
} from '@angular/core';
import {D} from './datetime/date-formats';
import {DateAdapter} from './datetime/date-adapter';
import {createMissingDateImplError} from './datetime/datepicker-errors';
import {Subject, Subscription, merge} from 'rxjs';
import {ScrollStrategy, Overlay, ComponentType, OverlayRef, OverlayConfig, PositionStrategy} from '@angular/cdk/overlay';
import {parseBooleanAttribute} from '../util';
import {HcCalendarCellCssClasses} from './calendar-body/calendar-body.component';
import {DatepickerContentComponent} from './datepicker-content/datepicker-content.component';
import {ComponentPortal} from '@angular/cdk/portal';
import {DatepickerInputDirective} from './datepicker-input/datepicker-input.directive';
import {Directionality} from '@angular/cdk/bidi';
import {DOCUMENT} from '@angular/common';
import {take, filter} from 'rxjs/operators';

/** Used to generate a unique ID for each datepicker instance. */
let datepickerUid = 0;

/** Injection token that determines the scroll handling while the calendar is open. */
export const HC_DATEPICKER_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>('hc-datepicker-scroll-strategy');

/** @docs-private */
export function HC_DATEPICKER_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy {
    return () => overlay.scrollStrategies.reposition();
}

/** @docs-private */
export const HC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: HC_DATEPICKER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: HC_DATEPICKER_SCROLL_STRATEGY_FACTORY
};

// Boilerplate for applying mixins to hcDatepickerContent.
/** @docs-private */
export class HcDatepickerContentBase {
    constructor(public _elementRef: ElementRef) {}
}

/** Component responsible for managing the datepicker popup */
@Component({
    selector: 'hc-datepicker',
    template: '',
    exportAs: 'hcDatepicker',
    styleUrls: ['datepicker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DatepickerComponent implements OnDestroy {
    private _scrollStrategy: () => ScrollStrategy;

    /**
     * Whether the datepicker includes the calendar, time selector, or both. Defaults to `date`.
     */
    @Input()
    get mode(): 'date' | 'time' | 'date-time' {
        return this._mode;
    }
    set mode( value: 'date' | 'time' | 'date-time' ) {
        this._mode = value;
        if ( this._selected ) {
            this._selectedChanged.next(this._selected);
        }
    }
    private _mode: 'date' | 'time' | 'date-time' = 'date';

    /**
     * Whether the time picker uses a 12 or 24 hour clock. Defaults to 12.
     */
    @Input()
    get hourCycle(): string | number {
        return this._hourCycle;
    }
    set hourCycle( value: string | number ) {
        if ( +value !== this._hourCycle) {
            this._hourCycle = +value;
            if ( this._selected ) {
                this._selectedChanged.next(this._selected);
            }
        }
    }
    private _hourCycle = 12;

    /** An input indicating the type of the custom header component for the calendar, if set. */
    @Input()
    calendarHeaderComponent: ComponentType<unknown>;

    /** The date to open the calendar to initially. */
    @Input()
    get startAt(): D | null {
        // If an explicit startAt is set we start there, otherwise we start at whatever the currently
        // selected value is.
        return this._startAt || (this._datepickerInput ? this._datepickerInput.value : null);
    }
    set startAt(value: D | null) {
        this._startAt = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    private _startAt: D | null;

    /** The view that the calendar should start in. */
    @Input()
    startView: 'month' | 'year' | 'multi-year' = 'month';

    /** Whether the datepicker pop-up should be disabled. */
    @Input()
    get disabled(): boolean {
        return this._disabled === undefined && this._datepickerInput ? this._datepickerInput.disabled : !!this._disabled;
    }
    set disabled(value: boolean) {
        const newValue = parseBooleanAttribute(value);

        if (newValue !== this._disabled) {
            this._disabled = newValue;
            this._disabledChange.next(newValue);
        }
    }
    private _disabled: boolean;

    /**
     * Emits selected year in multiyear view.
     * This doesn't imply a change on the selected date.
     */
    @Output()
    readonly yearSelected: EventEmitter<D> = new EventEmitter<D>();

    /**
     * Emits selected month in year view.
     * This doesn't imply a change on the selected date.
     */
    @Output()
    readonly monthSelected: EventEmitter<D> = new EventEmitter<D>();

    /** Classes to be passed to the date picker panel. Supports the same syntax as `ngClass`. */
    @Input()
    panelClass: string | string[];

    /** Function that can be used to add custom CSS classes to dates. */
    @Input()
    dateClass: (date: D) => HcCalendarCellCssClasses;

    /** Emits when the datepicker has been opened. */
    @Output('opened')
    openedStream: EventEmitter<void> = new EventEmitter<void>();

    /** Emits when the datepicker has been closed. */
    @Output('closed')
    closedStream: EventEmitter<void> = new EventEmitter<void>();

    /** Whether the calendar is open. */
    @Input()
    get opened(): boolean {
        return this._opened;
    }
    set opened(value: boolean) {
        value ? this.open() : this.close();
    }
    private _opened = false;

    /** The id for the datepicker calendar. */
    id = `hc-datepicker-${datepickerUid++}`;

    /** The currently selected date. */
    get _selected(): D | null {
        return this._validSelected;
    }
    set _selected(value: D | null) {
        this._validSelected = value;
    }
    private _validSelected: D | null = null;

    /** The minimum selectable date. */
    get _minDate(): D | null {
        return this._datepickerInput && this._datepickerInput.min;
    }

    /** The maximum selectable date. */
    get _maxDate(): D | null {
        return this._datepickerInput && this._datepickerInput.max;
    }

    get _dateFilter(): (date: D | null) => boolean {
        return this._datepickerInput && this._datepickerInput._dateFilter;
    }

    /** A reference to the overlay when the calendar is opened as a popup. */
    _popupRef: OverlayRef | null;

    /** A portal containing the calendar for this datepicker. */
    private _calendarPortal: ComponentPortal<DatepickerContentComponent>;

    /** Reference to the component instantiated in popup mode. */
    private _popupComponentRef: ComponentRef<DatepickerContentComponent> | null;

    /** The element that was focused before the datepicker was opened. */
    private _focusedElementBeforeOpen: HTMLElement | null = null;

    /** Subscription to value changes in the associated input element. */
    private _inputSubscription = Subscription.EMPTY;

    /** The input element this datepicker is associated with. */
    _datepickerInput: DatepickerInputDirective;

    /** Emits when the datepicker is disabled. */
    readonly _disabledChange = new Subject<boolean>();

    /** Emits new selected date when selected date changes. */
    readonly _selectedChanged = new Subject<D>();

    constructor(
        private _overlay: Overlay,
        private _ngZone: NgZone,
        private _viewContainerRef: ViewContainerRef,
        @Inject(HC_DATEPICKER_SCROLL_STRATEGY) scrollStrategy: any,
        @Optional() private _dateAdapter: DateAdapter<D>,
        @Optional() private _dir: Directionality,
        @Optional()
        @Inject(DOCUMENT)
        private _document: any
    ) {
        if (!this._dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }

        this._scrollStrategy = scrollStrategy;
    }

    ngOnDestroy(): void {
        this.close();
        this._inputSubscription.unsubscribe();
        this._disabledChange.complete();

        if (this._popupRef) {
            this._popupRef.dispose();
            this._popupComponentRef = null;
        }
    }

    /** Selects the given date */
    select(date: D): void {
        const oldValue = this._selected;
        this._selected = date;
        if (!this._dateAdapter.sameDate(oldValue, this._selected)) {
            this._selectedChanged.next(date);
        }
    }

    /** Emits the selected year in multiyear view */
    _selectYear(normalizedYear: D): void {
        this.yearSelected.emit(normalizedYear);
    }

    /** Emits selected month in year view */
    _selectMonth(normalizedMonth: D): void {
        this.monthSelected.emit(normalizedMonth);
    }

    /**
     * Register an input with this datepicker.
     * @param input The datepicker input to register with this datepicker.
     */
    _registerInput(input: DatepickerInputDirective): void {
        if (this._datepickerInput) {
            throw Error('A hcDatepicker can only be associated with a single input.');
        }
        this._datepickerInput = input;
        this._inputSubscription = this._datepickerInput._valueChange.subscribe((value: D | null) => (this._selected = value));
    }

    /** Open the calendar. */
    open(): void {
        if (this._opened || this.disabled) {
            return;
        }
        if (!this._datepickerInput) {
            throw Error('Attempted to open an hcDatepicker with no associated input.');
        }
        if (this._document) {
            this._focusedElementBeforeOpen = this._document.activeElement as HTMLElement;
        }

        this._openAsPopup();
        this._opened = true;
        this.openedStream.emit();
    }

    /** Close the calendar. */
    close(): void {
        if (!this._opened) {
            return;
        }
        if (this._popupRef && this._popupRef.hasAttached()) {
            this._popupRef.detach();
            this._popupRef.dispose();
            this._popupRef = null;
        }
        if (this._calendarPortal && this._calendarPortal.isAttached) {
            this._calendarPortal.detach();
        }

        const completeClose = () => {
            // The `_opened` could've been reset already if
            // we got two events in quick succession.
            if (this._opened) {
                this._opened = false;
                this.closedStream.emit();
                this._focusedElementBeforeOpen = null;
            }
        };

        if (this._focusedElementBeforeOpen && typeof this._focusedElementBeforeOpen.focus === 'function') {
            // Because IE moves focus asynchronously, we can't count on it being restored before we've
            // marked the datepicker as closed. If the event fires out of sequence and the element that
            // we're refocusing opens the datepicker on focus, the user could be stuck with not being
            // able to close the calendar at all. We work around it by making the logic, that marks
            // the datepicker as closed, async as well.
            this._focusedElementBeforeOpen.focus();
            setTimeout(completeClose);
        } else {
            completeClose();
        }
    }

    /** Open the calendar as a popup. */
    private _openAsPopup(): void {
        if (!this._calendarPortal) {
            this._calendarPortal = new ComponentPortal<DatepickerContentComponent>(DatepickerContentComponent, this._viewContainerRef);
        }

        if (!this._popupRef) {
            this._createPopup();
        }

        if (this._popupRef && !this._popupRef.hasAttached()) {
            this._popupComponentRef = this._popupRef.attach(this._calendarPortal);
            this._popupComponentRef.instance.datepicker = this;

            // Update the position once the calendar has rendered.
            this._ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe(() => {
                    if (this._popupRef) { this._popupRef.updatePosition(); }
                });
        }
    }

    /** Create the popup. */
    private _createPopup(): void {
        const overlayConfig = new OverlayConfig({
            positionStrategy: this._createPopupPositionStrategy(),
            hasBackdrop: true,
            backdropClass: 'hc-overlay-transparent-backdrop',
            direction: this._dir,
            scrollStrategy: this._scrollStrategy(),
            panelClass: 'hc-datepicker-popup'
        });

        this._popupRef = this._overlay.create(overlayConfig);
        this._popupRef.overlayElement.setAttribute('role', 'dialog');

        merge(
            this._popupRef.backdropClick(),
            this._popupRef.detachments(),
            this._popupRef.keydownEvents().pipe(
                filter(event => {
                    // Closing on alt + up is only valid when there's an input associated with the datepicker.
                    return event.key === 'Escape' || (this._datepickerInput && event.altKey && event.key === 'ArrowUp');
                })
            )
        ).subscribe(() => this.close());
    }

    /** Create the popup PositionStrategy. */
    private _createPopupPositionStrategy(): PositionStrategy {
        return this._overlay
            .position()
            .flexibleConnectedTo(this._datepickerInput.getConnectedOverlayOrigin())
            .withTransformOriginOn('.hc-datepicker-content')
            .withFlexibleDimensions(false)
            .withViewportMargin(8)
            .withLockedPosition()
            .withPositions([
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top',
                    // hc form field wrapper bottom margin
                    offsetY: -20
                },
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'center'
                },
                {
                    originX: 'end',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'top'
                },
                {
                    originX: 'end',
                    originY: 'top',
                    overlayX: 'end',
                    overlayY: 'bottom',
                    offsetY: 60
                }
            ]);
    }

    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull(obj: any): D | null {
        return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
    }
}
