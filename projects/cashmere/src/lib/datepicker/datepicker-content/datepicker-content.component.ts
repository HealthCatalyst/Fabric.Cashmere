import {Component, ViewEncapsulation, ChangeDetectionStrategy, AfterViewInit, ViewChild} from '@angular/core';
import {HcDatepickerAnimations} from '../datepicker-animations';
import {CalendarComponent} from '../calendar/calendar.component';
import {DatepickerComponent} from '../datepicker.component';

/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * hcCalendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * @docs-private
 */
@Component({
    selector: 'hc-datepicker-content',
    templateUrl: './datepicker-content.component.html',
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        class: 'hc-datepicker-content',
        '[@transformPanel]': '"enter"',
        '[class.hc-datepicker-content-touch]': 'datepicker.touchUi'
    },
    animations: [HcDatepickerAnimations.transformPanel, HcDatepickerAnimations.fadeInCalendar],
    exportAs: 'hcDatepickerContent',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerContentComponent implements AfterViewInit {
    /** Reference to the internal calendar component. */
    @ViewChild(CalendarComponent)
    _calendar: CalendarComponent;

    /** Reference to the datepicker that created the overlay. */
    datepicker: DatepickerComponent;

    /** Whether the datepicker is above or below the input. */
    _isAbove: boolean;

    ngAfterViewInit() {
        this._calendar.focusActiveCell();
    }

    /** Close the datepicker automatically on selection only if in date mode */
    autoClose() {
        if ( this.datepicker.mode === 'date' ) {
            this.datepicker.close();
        }
    }
}
