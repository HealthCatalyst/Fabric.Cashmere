/**
 * @license
 * Copyright Health Catalyst All Rights Reserved.
 *
 * Use of this source code is governed by an Apache-2.0 license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/HealthCatalyst/Fabric.Cashmere/dev/LICENSE
 */

import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

/** Datepicker data that requires internationalization. */
@Injectable({providedIn: 'root'})
export class HcDatepickerIntl {
    /**
     * Stream that emits whenever the labels here are changed. Use this to notify
     * components if the labels have changed after initialization.
     */
    readonly changes: Subject<void> = new Subject<void>();

    /** A label for the calendar popup (used by screen readers). */
    calendarLabel: string = 'Calendar';

    /** A label for the button used to open the calendar popup (used by screen readers). */
    openCalendarLabel: string = 'Open calendar';

    /** A label for the current month button (used by screen readers). */
    currentMonthLabel: string = 'Current month';

    /** A label for the previous month button (used by screen readers). */
    prevMonthLabel: string = 'Previous month';

    /** A label for the next month button (used by screen readers). */
    nextMonthLabel: string = 'Next month';

    /** A label for the previous year button (used by screen readers). */
    prevYearLabel: string = 'Previous year';

    /** A label for the next year button (used by screen readers). */
    nextYearLabel: string = 'Next year';

    /** A label for the previous multi-year button (used by screen readers). */
    prevMultiYearLabel: string = 'Previous 20 years';

    /** A label for the next multi-year button (used by screen readers). */
    nextMultiYearLabel: string = 'Next 20 years';

    /** A label for the 'switch to month view' button (used by screen readers). */
    switchToMonthViewLabel: string = 'Choose date';

    /** A label for the 'switch to year view' button (used by screen readers). */
    switchToMultiYearViewLabel: string = 'Choose month and year';

    /** A label for the 'jump to the current date' button (used by screen readers). */
    switchToTodayLabel: string = 'Jump to the current date';
}
