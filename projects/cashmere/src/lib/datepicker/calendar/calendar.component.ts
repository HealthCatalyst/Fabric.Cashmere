import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    forwardRef,
    Inject,
    SimpleChanges,
    Optional,
    ChangeDetectorRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    AfterContentInit,
    AfterViewChecked,
    OnDestroy,
    OnChanges
} from '@angular/core';
import {HcDatepickerIntl} from '../datepicker-intl';
import {ComponentPortal, Portal, ComponentType} from '@angular/cdk/portal';
import {createMissingDateImplError} from '../datetime/datepicker-errors';
import {HC_DATE_FORMATS, HcDateFormats, D} from '../datetime/date-formats';
import {DateAdapter} from '../datetime/date-adapter';
import {Subject, Subscription} from 'rxjs';
import {yearsPerPage, MultiYearViewComponent} from '../multi-year-view/multi-year-view.component';
import {HcCalendarCellCssClasses} from '../calendar-body/calendar-body.component';
import {MonthViewComponent} from '../month-view/month-view.component';
import {YearViewComponent} from '../year-view/year-view.component';
import {FormControl} from '@angular/forms';

// tslint:disable:no-use-before-declare
/**
 * Possible views for the calendar.
 * @docs-private
 */
export type CalendarViewComponent = 'month' | 'year' | 'multi-year';

/** Default header for hcCalendar */
@Component({
    selector: 'hc-calendar-header',
    templateUrl: 'calendar-header.html',
    exportAs: 'hcCalendarHeader',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarHeaderComponent {
    constructor(
        private _intl: HcDatepickerIntl,
        @Inject(forwardRef(() => CalendarComponent)) public calendar: CalendarComponent,
        @Optional() private _dateAdapter: DateAdapter<D>,
        @Optional()
        @Inject(HC_DATE_FORMATS)
        private _dateFormats: HcDateFormats,
        changeDetectorRef: ChangeDetectorRef
    ) {
        this.calendar.stateChanges.subscribe(() => changeDetectorRef.markForCheck());
    }

    /** The label for the currently visible month */
    get monthButtonText(): string {
        return this._dateAdapter.getMonthNames('short')[this._dateAdapter.getMonth(this.calendar.activeDate)];
    }

    /** The label for the current calendar view. */
    get periodButtonText(): string {
        return this._dateAdapter.getYearName(this.calendar.activeDate);
    }

    get periodButtonLabel(): string {
        return this.calendar.currentView === 'month' ? this._intl.switchToMultiYearViewLabel : this._intl.switchToMonthViewLabel;
    }

    /** The label for the jump to today button */
    get _todayButtonLabel(): string {
        return this._intl.switchToTodayLabel;
    }

    /** The label for the currently displayed month */
    get monthButtonLabel(): string {
        return this._intl.currentMonthLabel;
    }

    /** The label for the the previous button. */
    get prevButtonLabel(): string {
        return {
            month: this._intl.prevMonthLabel,
            year: this._intl.prevYearLabel,
            'multi-year': this._intl.prevMultiYearLabel
        }[this.calendar.currentView];
    }

    /** The label for the the next button. */
    get nextButtonLabel(): string {
        return {
            month: this._intl.nextMonthLabel,
            year: this._intl.nextYearLabel,
            'multi-year': this._intl.nextMultiYearLabel
        }[this.calendar.currentView];
    }

    /** Handles user clicks on the period label. */
    currentPeriodClicked(): void {
        this.calendar.currentView = this.calendar.currentView === 'month' ? 'multi-year' : 'month';
    }

    /** Handles user clicks on the previous button. */
    previousClicked(): void {
        this.calendar.activeDate =
            this.calendar.currentView === 'month'
                ? this._dateAdapter.addCalendarMonths(this.calendar.activeDate, -1)
                : this._dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView === 'year' ? -1 : -yearsPerPage);
    }

    /** Handles user clicks on the next button. */
    nextClicked(): void {
        this.calendar.activeDate =
            this.calendar.currentView === 'month'
                ? this._dateAdapter.addCalendarMonths(this.calendar.activeDate, 1)
                : this._dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView === 'year' ? 1 : yearsPerPage);
    }

    /** Handles clicks on the jump to today button */

    _todayClicked(): void {
        this.calendar.activeDate = this._dateAdapter.today();
    }

    /** Whether the previous period button is enabled. */
    previousEnabled(): boolean {
        if (!this.calendar.minDate) {
            return true;
        }
        return !this.calendar.minDate || !this._isSameView(this.calendar.activeDate, this.calendar.minDate);
    }

    /** Whether the next period button is enabled. */
    nextEnabled(): boolean {
        return !this.calendar.maxDate || !this._isSameView(this.calendar.activeDate, this.calendar.maxDate);
    }

    _todayEnabled(): boolean {
        let minDate;
        let maxDate;
        let today = new Date(this._dateAdapter.today().toDateString());

        /** Normalize the compare dates to all be on the first day of the month because we are only concerned
         * about whether today falls outside of the month than min or max is in */
        today.setDate(1);
        if (this.calendar.minDate) {
            minDate = new Date(this.calendar.minDate.toDateString());
            minDate.setDate(1);
        }
        if (this.calendar.maxDate) {
            maxDate = new Date(this.calendar.maxDate.toDateString());
            maxDate.setDate(1);
        }
        return (
            (!minDate || this._dateAdapter.compareDate(minDate, today) < 1) &&
            (!maxDate || this._dateAdapter.compareDate(maxDate, today) > -1)
        );
    }

    /** Whether the two dates represent the same view in the current view mode (month or year). */
    private _isSameView(date1: D, date2: D): boolean {
        if (this.calendar.currentView === 'month') {
            return (
                this._dateAdapter.getYear(date1) === this._dateAdapter.getYear(date2) &&
                this._dateAdapter.getMonth(date1) === this._dateAdapter.getMonth(date2)
            );
        }
        if (this.calendar.currentView === 'year') {
            return this._dateAdapter.getYear(date1) === this._dateAdapter.getYear(date2);
        }
        // Otherwise we are in 'multi-year' view.
        return Math.floor(this._dateAdapter.getYear(date1) / yearsPerPage) === Math.floor(this._dateAdapter.getYear(date2) / yearsPerPage);
    }
}

/**
 * A calendar that is used as part of the datepicker.
 * @docs-private
 */
@Component({
    selector: 'hc-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['calendar.component.scss'],
    host: {
        class: 'hc-calendar'
    },
    exportAs: 'hcCalendar',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements AfterContentInit, AfterViewChecked, OnDestroy, OnChanges {
    /** An input indicating the type of the header component, if set. */
    @Input()
    headerComponent: ComponentType<any>;

    /** A portal containing the header component type for this calendar. */
    _calendarHeaderPortal: Portal<any>;

    /** Stores the current am/pm value */
    _period: FormControl = new FormControl('am');

    private _intlChanges: Subscription;

    /**
     * Used for scheduling that focus should be moved to the active cell on the next tick.
     * We need to schedule it, rather than do it immediately, because we have to wait
     * for Angular to re-evaluate the view children.
     */
    private _moveFocusOnNextTick = false;

    /** A date representing the period (month or year) to start the calendar in. */
    @Input()
    get startAt(): D | null {
        return this._startAt;
    }
    set startAt(value: D | null) {
        this._startAt = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    private _startAt: D | null;

    /** Whether the calendar should be started in month or year view. */
    @Input()
    startView: CalendarViewComponent = 'month';

    /** Whether the calendar should show calendar, time-picker, or both */
    @Input()
    mode: 'date' | 'time' | 'date-time' = 'date';

    /** Whether the time picker should display a 12-hour or 24-clock. Accepts 12 or 24. Defaults to 12. */
    @Input()
    get hourCycle(): string | number {
        return this._hourCycle;
    }
    set hourCycle(value: string | number) {
        if (+value === 12 || +value === 24) {
            this._hourCycle = +value;
        } else if (value) {
            throw Error('Unsupported hourCycle value: ' + value + '. Accepted values are 12 or 24.');
        }
    }
    _hourCycle: number = 12;

    /** The currently selected date. */
    @Input()
    get selected(): D | null {
        return this._selected;
    }
    set selected(value: D | null) {
        this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        if (this._selected) {
            this._period.setValue(this._selected.getHours() > 11 ? 'pm' : 'am');
        }
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

    /** Function used to filter which dates are selectable. */
    @Input()
    dateFilter: (date: D) => boolean;

    /** Function that can be used to add custom CSS classes to dates. */
    @Input()
    dateClass: (date: D) => HcCalendarCellCssClasses;

    /** Emits when the currently selected date changes. */
    @Output()
    readonly selectedChange: EventEmitter<D> = new EventEmitter<D>();

    /**
     * Emits the year chosen in multiyear view.
     * This doesn't imply a change on the selected date.
     */
    @Output()
    readonly yearSelected: EventEmitter<D> = new EventEmitter<D>();

    /**
     * Emits the month chosen in year view.
     * This doesn't imply a change on the selected date.
     */
    @Output()
    readonly monthSelected: EventEmitter<D> = new EventEmitter<D>();

    /** Emits when any date is selected. */
    @Output()
    readonly _userSelection: EventEmitter<void> = new EventEmitter<void>();

    /** Reference to the current month view component. */
    @ViewChild(MonthViewComponent)
    monthView: MonthViewComponent;

    /** Reference to the current year view component. */
    @ViewChild(YearViewComponent)
    yearView: YearViewComponent;

    /** Reference to the current multi-year view component. */
    @ViewChild(MultiYearViewComponent)
    multiYearView: MultiYearViewComponent;

    /**
     * The current active date. This determines which time period is shown and which date is
     * highlighted when using keyboard navigation.
     */
    get activeDate(): D {
        return this._clampedActiveDate;
    }
    set activeDate(value: D) {
        this._clampedActiveDate = this._dateAdapter.clampDate(value, this.minDate, this.maxDate);
        this.stateChanges.next();
    }
    private _clampedActiveDate: D;

    /** Whether the calendar is in month view. */
    get currentView(): CalendarViewComponent {
        return this._currentView;
    }
    set currentView(value: CalendarViewComponent) {
        this._currentView = value;
        this._moveFocusOnNextTick = true;
    }
    private _currentView: CalendarViewComponent;

    /**
     * Emits whenever there is a state change that the header may need to respond to.
     */
    stateChanges = new Subject<void>();

    /** A string containing the value of minutes for the current date */
    get minutes(): string | null {
        if (this.selected) {
            let minVal = this.selected.getMinutes();
            return minVal < 10 ? '0' + minVal : minVal.toString();
        } else {
            return this.selected;
        }
    }
    set minutes(value: string | null) {
        if (value && !isNaN(+value)) {
            let tempDate = this.selected ? new Date(this.selected.getTime()) : new Date();
            tempDate.setMinutes(+value);
            this.selectedChange.emit(tempDate);
            this._userSelected();
        }
    }

    /** A string containing the hour for the current date */
    get hours(): string | null {
        if (this.selected) {
            let hourVal = this.selected.getHours();
            if (this._hourCycle === 12) {
                if (hourVal > 11) {
                    return hourVal === 12 ? hourVal.toString() : (hourVal - 12).toString();
                } else {
                    return hourVal === 0 ? '12' : hourVal.toString();
                }
            } else {
                return hourVal.toString();
            }
        } else {
            return this.selected;
        }
    }
    set hours(value: string | null) {
        if (value && !isNaN(+value)) {
            let hourVal: number = +value;
            if (this._hourCycle === 12) {
                if (this._period.value === 'pm' && hourVal !== 12) {
                    hourVal += 12;
                } else if (this._period.value === 'am' && hourVal === 12) {
                    hourVal = 0;
                }
            }
            let tempDate = this.selected ? new Date(this.selected.getTime()) : new Date();
            tempDate.setHours(hourVal);
            this.selectedChange.emit(tempDate);
            this._userSelected();
        }
    }

    _periodChange() {
        if (this.selected) {
            let tempDate = new Date(this.selected.getTime());
            let curHours = tempDate.getHours();
            if (this._period.value === 'pm') {
                tempDate.setHours(curHours + 12);
            } else {
                tempDate.setHours(curHours - 12);
            }
            this.selectedChange.emit(tempDate);
            this._userSelected();
        }
    }

    constructor(
        private _intl: HcDatepickerIntl,
        @Optional() private _dateAdapter: DateAdapter<D>,
        @Optional()
        @Inject(HC_DATE_FORMATS)
        private _dateFormats: HcDateFormats,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        if (!this._dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }

        if (!this._dateFormats) {
            throw createMissingDateImplError('HC_DATE_FORMATS');
        }

        this._intlChanges = _intl.changes.subscribe(() => {
            _changeDetectorRef.markForCheck();
            this.stateChanges.next();
        });
    }

    ngAfterContentInit() {
        this._calendarHeaderPortal = new ComponentPortal(this.headerComponent || CalendarHeaderComponent);
        this.activeDate = this.startAt || this._dateAdapter.today();

        // Assign to the private property since we don't want to move focus on init.
        this._currentView = this.startView;
    }

    ngAfterViewChecked() {
        if (this._moveFocusOnNextTick) {
            this._moveFocusOnNextTick = false;
            this.focusActiveCell();
        }
    }

    ngOnDestroy() {
        this._intlChanges.unsubscribe();
        this.stateChanges.complete();
    }

    ngOnChanges(changes: SimpleChanges) {
        const change = changes.minDate || changes.maxDate || changes.dateFilter;

        if (change && !change.firstChange) {
            const view = this._getCurrentViewComponent();

            if (view) {
                // We need to `detectChanges` manually here, because the `minDate`, `maxDate` etc. are
                // passed down to the view via data bindings which won't be up-to-date when we call `_init`.
                this._changeDetectorRef.detectChanges();
                view._init();
            }
        }

        this.stateChanges.next();
    }

    focusActiveCell() {
        if (this.mode !== 'time') {
            this._getCurrentViewComponent()._focusActiveCell();
        }
    }

    /** Updates today's date after an update of the active date */
    updateTodaysDate() {
        const view = this.currentView === 'month' ? this.monthView : this.currentView === 'year' ? this.yearView : this.multiYearView;

        view.ngAfterContentInit();
    }

    /** Handles date selection in the month view. */
    _dateSelected(date: D): void {
        if (!this._dateAdapter.sameDate(date, this.selected)) {
            this.selectedChange.emit(date);
        }
    }

    /** Handles year selection in the multiyear view. */
    _yearSelectedInMultiYearView(normalizedYear: D) {
        this.yearSelected.emit(normalizedYear);
    }

    /** Handles month selection in the year view. */
    _monthSelectedInYearView(normalizedMonth: D) {
        this.monthSelected.emit(normalizedMonth);
    }

    _userSelected(): void {
        this._userSelection.emit();
    }

    /** Handles year/month selection in the multi-year/year views. */
    _goToDateInView(date: D, view: 'month' | 'year' | 'multi-year'): void {
        this.activeDate = date;
        this.currentView = view;
    }

    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull(obj: any): D | null {
        return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
    }

    /** Returns the component instance that corresponds to the current calendar view. */
    private _getCurrentViewComponent() {
        return this.monthView || this.yearView || this.multiYearView;
    }

    _hoursUp() {
        if (!this.hours) {
            this.hours = this._hourCycle > 12 ? '0' : '1';
        } else {
            let curHour = +this.hours;
            curHour++;
            const tempCycle = this._hourCycle > 12 ? 23 : 12;
            if (curHour > tempCycle) {
                curHour = tempCycle;
            }
            this.hours = curHour.toString();
        }
    }

    _hoursDown() {
        if (!this.hours) {
            this.hours = this._hourCycle > 12 ? '23' : '12';
        } else {
            let curHour = +this.hours;
            curHour--;
            const tempCycle = this._hourCycle > 12 ? 0 : 1;
            if (curHour < tempCycle) {
                curHour = tempCycle;
            }
            this.hours = curHour.toString();
        }
    }

    _minutesUp() {
        if (!this.minutes) {
            this.minutes = '00';
        } else {
            let curMin = +this.minutes;
            curMin++;
            if (curMin > 59) {
                curMin = 59;
            }
            this.minutes = curMin.toString();
        }
    }

    _minutesDown() {
        if (!this.minutes) {
            this.minutes = '59';
        } else {
            let curMin = +this.minutes;
            curMin--;
            if (curMin < 1) {
                curMin = 1;
            }
            this.minutes = curMin.toString();
        }
    }
}
