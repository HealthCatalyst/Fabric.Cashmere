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
    Optional
} from '@angular/core';
import {DateAdapter} from '../datetime/date-adapter';
import {Directionality} from '@angular/cdk/bidi';
import {createMissingDateImplError} from '../datetime/datepicker-errors';
import {D} from '../datetime/date-formats';
import {CalendarBodyComponent, HcCalendarCell} from '../calendar-body/calendar-body.component';

export const yearsPerPage = 24;

export const yearsPerRow = 4;

@Component({
    selector: 'hc-multi-year-view',
    templateUrl: './multi-year-view.component.html',
    exportAs: 'hcMultiYearView',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiYearViewComponent implements AfterContentInit {
    /** The date to display in this multi-year view (everything other than the year is ignored). */
    @Input()
    get activeDate(): D {
        return this._activeDate;
    }
    set activeDate(value: D) {
        const oldActiveDate = this._activeDate;
        const validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
        this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
        if (
            Math.floor(this._dateAdapter.getYear(oldActiveDate) / yearsPerPage) !==
            Math.floor(this._dateAdapter.getYear(this._activeDate) / yearsPerPage)
        ) {
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
        this._selectedYear = this._selected && this._dateAdapter.getYear(this._selected);
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

    /** Emits when a new year is selected. */
    @Output()
    readonly selectedChange: EventEmitter<D> = new EventEmitter<D>();

    /** Emits the selected year. This doesn't imply a change on the selected date */
    @Output()
    readonly yearSelected: EventEmitter<D> = new EventEmitter<D>();

    /** Emits when any date is activated. */
    @Output()
    readonly activeDateChange: EventEmitter<D> = new EventEmitter<D>();

    /** The body of calendar table */
    @ViewChild(CalendarBodyComponent)
    _hcCalendarBody: CalendarBodyComponent;

    /** Grid of calendar cells representing the currently displayed years. */
    _years: HcCalendarCell[][];

    /** The year that today falls on. */
    _todayYear: number;

    /** The year of the selected date. Null if the selected date is null. */
    _selectedYear: number | null;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        @Optional() public _dateAdapter: DateAdapter<D>,
        @Optional() private _dir?: Directionality
    ) {
        if (!this._dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }

        this._activeDate = this._dateAdapter.today();
    }

    ngAfterContentInit() {
        this._init();
    }

    /** Initializes this multi-year view. */
    _init() {
        this._todayYear = this._dateAdapter.getYear(this._dateAdapter.today());
        const activeYear = this._dateAdapter.getYear(this._activeDate);
        const activeOffset = activeYear % yearsPerPage;
        this._years = [];
        for (let i = 0, row: number[] = []; i < yearsPerPage; i++) {
            row.push(activeYear - activeOffset + i);
            if (row.length === yearsPerRow) {
                this._years.push(row.map(year => this._createCellForYear(year)));
                row = [];
            }
        }
        this._changeDetectorRef.markForCheck();
    }

    /** Handles when a new year is selected. */
    _yearSelected(year: number) {
        this.yearSelected.emit(this._dateAdapter.createDate(year, 0, 1));
        const month = this._dateAdapter.getMonth(this.activeDate);
        const daysInMonth = this._dateAdapter.getNumDaysInMonth(this._dateAdapter.createDate(year, month, 1));
        this.selectedChange.emit(
            this._dateAdapter.createDate(year, month, Math.min(this._dateAdapter.getDate(this.activeDate), daysInMonth))
        );
    }

    /** Handles keydown events on the calendar body when calendar is in multi-year view. */
    _handleCalendarBodyKeydown(event: KeyboardEvent): void {
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.

        const oldActiveDate = this._activeDate;
        const isRtl = this._isRtl();

        switch (event.key) {
            case 'ArrowLeft':
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, isRtl ? 1 : -1);
                break;
            case 'ArrowRight':
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, isRtl ? -1 : 1);
                break;
            case 'ArrowUp':
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, -yearsPerRow);
                break;
            case 'ArrowDown':
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, yearsPerRow);
                break;
            case 'Home':
                this.activeDate = this._dateAdapter.addCalendarYears(
                    this._activeDate,
                    -this._dateAdapter.getYear(this._activeDate) % yearsPerPage
                );
                break;
            case 'End':
                this.activeDate = this._dateAdapter.addCalendarYears(
                    this._activeDate,
                    yearsPerPage - (this._dateAdapter.getYear(this._activeDate) % yearsPerPage) - 1
                );
                break;
            case 'PageUp':
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? -yearsPerPage * 10 : -yearsPerPage);
                break;
            case 'PageDown':
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? yearsPerPage * 10 : yearsPerPage);
                break;
            case 'Enter':
            case ' ':
                this._yearSelected(this._dateAdapter.getYear(this._activeDate));
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

    _getActiveCell(): number {
        return this._dateAdapter.getYear(this.activeDate) % yearsPerPage;
    }

    /** Focuses the active cell after the microtask queue is empty. */
    _focusActiveCell() {
        this._hcCalendarBody._focusActiveCell();
    }

    /** Creates an hcCalendarCell for the given year. */
    private _createCellForYear(year: number) {
        const yearName = this._dateAdapter.getYearName(this._dateAdapter.createDate(year, 0, 1));
        return new HcCalendarCell(year, yearName, yearName, this._shouldEnableYear(year));
    }

    /** Whether the given year is enabled. */
    private _shouldEnableYear(year: number) {
        // disable if the year is greater than maxDate lower than minDate
        if (
            year === undefined ||
            year === null ||
            (this.maxDate && year > this._dateAdapter.getYear(this.maxDate)) ||
            (this.minDate && year < this._dateAdapter.getYear(this.minDate))
        ) {
            return false;
        }

        // enable if it reaches here and there's no filter defined
        if (!this.dateFilter) {
            return true;
        }

        const firstOfYear = this._dateAdapter.createDate(year, 0, 1);

        // If any date in the year is enabled count the year as enabled.
        for (let date = firstOfYear; this._dateAdapter.getYear(date) === year; date = this._dateAdapter.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull(obj: any): D | null {
        return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
    }

    /** Determines whether the user has the RTL layout direction. */
    private _isRtl() {
        return this._dir && this._dir.value === 'rtl';
    }
}
