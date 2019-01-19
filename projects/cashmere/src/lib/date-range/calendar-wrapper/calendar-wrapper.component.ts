import {
    Component,
    ViewChild,
    Input,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    OnInit,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import {ConfigStoreService} from '../services/config-store.service';
import {CalendarComponent} from '../../datepicker/calendar/calendar.component';
import {DatepickerInputDirective, HcDatepickerInputEvent} from '../../datepicker/datepicker-input/datepicker-input.directive';
import {D} from '../../datepicker/datetime/date-formats';

/** Component combining a calendar and input as a representation of a date  */
@Component({
    selector: 'hc-calendar-wrapper',
    templateUrl: './calendar-wrapper.component.html',
    styleUrls: ['./calendar-wrapper.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CalendarWrapperComponent implements OnInit, OnChanges {
    @ViewChild(CalendarComponent)
    hcCalendar: CalendarComponent;

    @ViewChild(DatepickerInputDirective)
    datePickerInput: DatepickerInputDirective;

    /** Emits when selected date has changed. */
    @Output()
    readonly selectedDateChange: EventEmitter<D> = new EventEmitter<D>();

    /** Current selected date. */
    @Input()
    selectedDate: D;

    _dateFormat: string;

    /** Prefix label on top of component. */
    @Input()
    prefixLabel: string;

    /** The minimum selectable date. */
    @Input()
    minDate: D;

    /** Flag to filter out weekends. */
    @Input()
    maxDate: D;
    weekendFilter = (d: D) => true;

    constructor(configStore: ConfigStoreService) {
        this._dateFormat = configStore.DateRangeOptions.format;
        if (configStore.DateRangeOptions.excludeWeekends) {
            this.weekendFilter = (d: Date): boolean => {
                const day = d.getDay();
                return day !== 0 && day !== 6;
            };
        }
    }

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges) {
        // Necessary to force view refresh
        const date: D = changes.selectedDate.currentValue;
        if (date) {
            this.hcCalendar.activeDate = date;
            this.datePickerInput.setDate(date);
            this.selectedDateChange.emit(date);
        }
    }

    _onCalendarChange(date: D) {
        this.selectedDateChange.emit(date);
    }

    _onInputChange(event: HcDatepickerInputEvent) {
        this.selectedDateChange.emit(event.value || undefined);
    }

    /** Focus inner input */
    focusInput() {
        this.datePickerInput.focus();
    }
}
