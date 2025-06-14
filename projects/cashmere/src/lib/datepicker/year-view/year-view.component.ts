import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    AfterContentInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ChangeDetectorRef,
    Optional,
    Inject
} from '@angular/core';
import {CalendarBodyComponent, HcCalendarCell} from '../calendar-body/calendar-body.component';
import {Directionality} from '@angular/cdk/bidi';
import {createMissingDateImplError} from '../datetime/datepicker-errors';
import {D, HC_DATE_FORMATS, HcDateFormats} from '../datetime/date-formats';
import {DateAdapter} from '../datetime/date-adapter';

/**
 * An internal component used to display a single year in the datepicker.
 * @docs-private
 */
@Component({
    selector: 'hc-year-view',
    templateUrl: './year-view.component.html',
    exportAs: 'hcYearView',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class YearViewComponent implements AfterContentInit {
    /** The date to display in this year view (everything other than the year is ignored). */
    @Input()
    get activeDate(): D {
        return this._activeDate;
    }
    set activeDate(value: D) {
        const oldActiveDate = this._activeDate;
        const validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
        this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
        if (this._dateAdapter.getYear(oldActiveDate) !== this._dateAdapter.getYear(this._activeDate)) {
            this._init();
        }
    }
    private _activeDate: D;

    /** The currently selected date. */
    @Input()
    get selected(): D | null {
        return this._selected;
    }
    set selected(value: D | null) {
        this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        this._selectedMonth = this._getMonthInCurrentYear(this._selected);
    }
    private _selected: D | null;

    /** The minimum selectable date. */
    @Input()
    get minDate(): D | null {
        return this._minDate;
    }
    set minDate(value: D | null) {
        this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    private _minDate: D | null;

    /** The maximum selectable date. */
    @Input()
    get maxDate(): D | null {
        return this._maxDate;
    }
    set maxDate(value: D | null) {
        this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    private _maxDate: D | null;

    /** A function used to filter which dates are selectable. */
    @Input()
    dateFilter: (date: D) => boolean;

    /** Emits when a new month is selected. */
    @Output()
    readonly selectedChange: EventEmitter<D> = new EventEmitter<D>();

    /** Emits the selected month. This doesn't imply a change on the selected date */
    @Output()
    readonly monthSelected: EventEmitter<D> = new EventEmitter<D>();

    /** Emits when any date is activated. */
    @Output()
    readonly activeDateChange: EventEmitter<D> = new EventEmitter<D>();

    /** The body of calendar table */
    @ViewChild(CalendarBodyComponent)
    _hcCalendarBody: CalendarBodyComponent;

    /** Grid of calendar cells representing the months of the year. */
    _months: HcCalendarCell[][];

    /** The label for this year (e.g. "2017"). */
    _yearLabel: string;

    /** The month in this year that today falls on. Null if today is in a different year. */
    _todayMonth: number | null;

    /**
     * The month in this year that the selected Date falls on.
     * Null if the selected Date is in a different year.
     */
    _selectedMonth: number | null;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        @Optional()
        @Inject(HC_DATE_FORMATS)
        private _dateFormats: HcDateFormats,
        @Optional() public _dateAdapter: DateAdapter<D>,
        @Optional() private _dir?: Directionality
    ) {
        if (!this._dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this._dateFormats) {
            throw createMissingDateImplError('HC_DATE_FORMATS');
        }

        this._activeDate = this._dateAdapter.today();
    }

    ngAfterContentInit(): void {
        this._init();
    }

    /** Handles when a new month is selected. */
    _monthSelected(month: number): void {
        const normalizedDate = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, 1);

        this.monthSelected.emit(normalizedDate);

        const daysInMonth = this._dateAdapter.getNumDaysInMonth(normalizedDate);

        this.selectedChange.emit(
            this._dateAdapter.createDate(
                this._dateAdapter.getYear(this.activeDate),
                month,
                Math.min(this._dateAdapter.getDate(this.activeDate), daysInMonth)
            )
        );
    }

    /** Handles keydown events on the calendar body when calendar is in year view. */
    _handleCalendarBodyKeydown(event: KeyboardEvent): void {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.

        const oldActiveDate = this._activeDate;
        const isRtl = this._isRtl();

        switch (event.key) {
            case 'ArrowLeft':
                this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, isRtl ? 1 : -1);
                break;
            case 'ArrowRight':
                this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, isRtl ? -1 : 1);
                break;
            case 'ArrowUp':
                this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, -4);
                break;
            case 'ArrowDown':
                this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, 4);
                break;
            case 'Home':
                this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, -this._dateAdapter.getMonth(this._activeDate));
                break;
            case 'End':
                this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, 11 - this._dateAdapter.getMonth(this._activeDate));
                break;
            case 'PageUp':
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? -10 : -1);
                break;
            case 'PageDown':
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? 10 : 1);
                break;
            case 'Enter':
            case ' ':
                this._monthSelected(this._dateAdapter.getMonth(this._activeDate));
                break;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }

        if (this._dateAdapter.compareDate(oldActiveDate, this.activeDate)) {
            this.activeDateChange.emit(this.activeDate);
        }

        this._focusActiveCell();
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    }

    /** Initializes this year view. */
    _init(): void {
        this._selectedMonth = this._getMonthInCurrentYear(this.selected);
        this._todayMonth = this._getMonthInCurrentYear(this._dateAdapter.today());
        this._yearLabel = this._dateAdapter.getYearName(this.activeDate);

        const monthNames = this._dateAdapter.getMonthNames('short');
        // First row of months only contains 5 elements so we can fit the year label on the same row.
        this._months = [
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [8, 9, 10, 11]
        ].map(row => row.map(month => this._createCellForMonth(month, monthNames[month])));
        this._changeDetectorRef.markForCheck();
    }

    /** Focuses the active cell after the microtask queue is empty. */
    _focusActiveCell(): void {
        this._hcCalendarBody._focusActiveCell();
    }

    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     */
    private _getMonthInCurrentYear(date: D | null) {
        return date && this._dateAdapter.getYear(date) === this._dateAdapter.getYear(this.activeDate)
            ? this._dateAdapter.getMonth(date)
            : null;
    }

    /** Creates an hcCalendarCell for the given month. */
    private _createCellForMonth(month: number, monthName: string) {
        const ariaLabel = this._dateAdapter.format(
            this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, 1),
            this._dateFormats.display.monthYearA11yLabel
        );
        return new HcCalendarCell(month, monthName.toLocaleUpperCase(), ariaLabel, this._shouldEnableMonth(month));
    }

    /** Whether the given month is enabled. */
    private _shouldEnableMonth(month: number) {
        const activeYear = this._dateAdapter.getYear(this.activeDate);

        if (
            month === undefined ||
            month === null ||
            this._isYearAndMonthAfterMaxDate(activeYear, month) ||
            this._isYearAndMonthBeforeMinDate(activeYear, month)
        ) {
            return false;
        }

        if (!this.dateFilter) {
            return true;
        }

        const firstOfMonth = this._dateAdapter.createDate(activeYear, month, 1);

        // If any date in the month is enabled count the month as enabled.
        for (let date = firstOfMonth; this._dateAdapter.getMonth(date) === month; date = this._dateAdapter.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Tests whether the combination month/year is after this.maxDate, considering
     * just the month and year of this.maxDate
     */
    private _isYearAndMonthAfterMaxDate(year: number, month: number) {
        if (this.maxDate) {
            const maxYear = this._dateAdapter.getYear(this.maxDate);
            const maxMonth = this._dateAdapter.getMonth(this.maxDate);

            return year > maxYear || (year === maxYear && month > maxMonth);
        }

        return false;
    }

    /**
     * Tests whether the combination month/year is before this.minDate, considering
     * just the month and year of this.minDate
     */
    private _isYearAndMonthBeforeMinDate(year: number, month: number) {
        if (this.minDate) {
            const minYear = this._dateAdapter.getYear(this.minDate);
            const minMonth = this._dateAdapter.getMonth(this.minDate);

            return year < minYear || (year === minYear && month < minMonth);
        }

        return false;
    }

    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _getValidDateOrNull(obj: any): D | null {
        return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
    }

    /** Determines whether the user has the RTL layout direction. */
    private _isRtl() {
        return this._dir && this._dir.value === 'rtl';
    }
}
