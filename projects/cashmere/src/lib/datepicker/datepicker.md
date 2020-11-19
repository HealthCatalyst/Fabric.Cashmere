##### Overview

The datepicker allows users to enter a date, time, or both either through text input, or by choosing a date from
the calendar. It is made up of several components and directives that work together.

##### Connecting a datepicker to an input

A datepicker is composed of a text input and a calendar pop-up, connected via the `hcDatepicker`
property on the text input.

```html
<input [hcDatepicker]="myDatepicker" />
<hc-datepicker #myDatepicker></hc-datepicker>
```

An optional datepicker toggle button is available. A toggle can be added to the example above:

```html
<input [hcDatepicker]="myDatepicker" />
<hc-datepicker-toggle [for]="myDatepicker"></hc-datepicker-toggle>
<hc-datepicker #myDatepicker></hc-datepicker>
```

This works exactly the same with an input that is part of an `<hc-form-field>` and the toggle
can easily be used as a prefix or suffix on the `hcInput`:

```html
<hc-form-field>
    <input hcInput [hcDatepicker]="myDatepicker" />
    <hc-datepicker-toggle hcSuffix [for]="myDatepicker"></hc-datepicker-toggle>
    <hc-datepicker #myDatepicker></hc-datepicker>
</hc-form-field>
```

If you want to customize the icon that is rendered inside the `hc-datepicker-toggle`, you can do so
by using the `hcDatepickerToggleIcon` directive:

```html
<hc-form-field>
  <input hcInput [hcDatepicker]="picker" placeholder="Choose a date">
  <hc-datepicker-toggle hcSuffix [for]="picker">
    <hc-icon hcDatepickerToggleIcon fontSet="fa" fontIcon="fa-snowflake-o">
  </hc-datepicker-toggle>
  <hc-datepicker #picker></hc-datepicker>
</hc-form-field>
```

##### Setting the datepicker mode

The datepicker may be used to select a calendar date, a time, or both. This is set via the `mode`
parameter on the `hc-datepicker` element. The three available options are  `date`, `time`, or `date-time`.
If using either `time` or `date-time` modes, you may also set the `hourCycle` property to 12 or 24 depending
on whether you would like a clock with AM/PM.

##### Setting the calendar starting view

The `startView` property of `<hc-datepicker>` can be used to set the view that will show up when
the calendar first opens. It can be set to `month`, `year`, or `multi-year`; by default it will open
to month view.

The month, year, or range of years that the calendar opens to is determined by first checking if any
date is currently selected, if so it will open to the month or year containing that date. Otherwise
it will open to the month or year containing today's date. This behavior can be overridden by using
the `startAt` property of `<hc-datepicker>`. In this case the calendar will open to the month or
year containing the `startAt` date.

```html
<hc-form-field>
    <input hcInput [hcDatepicker]="picker" placeholder="Choose a date" />
    <hc-datepicker-toggle hcSuffix [for]="picker"></hc-datepicker-toggle>
    <hc-datepicker #picker startView="year" [startAt]="startDate"></hc-datepicker>
</hc-form-field>
```

```typescript
import {Component} from '@angular/core';

/** @title Datepicker start date */
@Component({
    selector: 'datepicker-start-view-example',
    templateUrl: 'datepicker-start-view-example.html',
    styleUrls: ['datepicker-start-view-example.css']
})
export class DatepickerStartViewExample {
    startDate = new Date(1990, 0, 1);
}
```

##### Watching the views for changes on selected years and months

When a year or a month is selected in `multi-year` and `year` views respectively, the `yearSelected`
and `monthSelected` outputs emit a normalized date representing the chosen year or month. By
"normalized" we mean that the dates representing years will have their month set to January and
their day set to the 1st. Dates representing months will have their day set to the 1st of the
month. For example, if `<hc-datepicker>` is configured to work with javascript native Date
objects, the `yearSelected` will emit `new Date(2017, 0, 1)` if the user selects 2017 in
`multi-year` view. Similarly, `monthSelected` will emit `new Date(2017, 1, 1)` if the user
selects **February** in `year` view and the current date value of the connected `<input>` was
set to something like `new Date(2017, MM, dd)` when the calendar was opened (the month and day are
irrelevant in this case).

Notice that the emitted value does not affect the current value in the connected `<input>`, which
is only bound to the selection made in the `month` view. So if the end user closes the calendar
after choosing a year in `multi-view` mode (by pressing the `ESC` key, for example), the selected
year, emitted by `yearSelected` output, will not cause any change in the value of the date in the
associated `<input>`.

##### Setting the selected date

The type of values that the datepicker expects depends on the type of `DateAdapter` provided in your
application. The `NativeDateAdapter`, for example, works directly with plain JavaScript `Date`
objects.

Depending on the `DateAdapter` being used, the datepicker may automatically deserialize certain date
formats for you as well. For example, the `NativeDateAdapter` allows
[ISO 8601](https://tools.ietf.org/html/rfc3339) strings to be passed to the datepicker and
automatically converted to the proper object type. This can be convenient when binding data directly
from your backend to the datepicker. However, the datepicker will not accept date strings formatted
in user format such as `"1/2/2017"` as this is ambiguous and will mean different things depending on
the locale of the browser running the code.

As with other types of `<input>`, the datepicker works with `@angular/forms` directives such as
`formGroup`, `formControl`, `ngModel`, etc.

##### Date validation

Date validation will only occur if the `input` element is bound via `ngModel` or `formControl`. The validator will check to see if the value entered is a valid date. Beyond that, there are three properties that add additional date validation to the datepicker input. The first two are the
`min` and `max` properties. In addition to enforcing validation on the input, these properties will
disable all dates on the calendar popup before or after the respective values and prevent the user
from advancing the calendar past the `month` or `year` (depending on current view) containing the
`min` or `max` date.

The second way to add date validation is using the `hcDatepickerFilter` property of the datepicker
input. This property accepts a function of `<D> => boolean` (where `<D>` is the date type used by
the datepicker, see
[Choosing a date implementation](/components/datepicker/usage#choosing-date-implementation).
A result of `true` indicates that the date is valid and a result of `false` indicates that it is
not. Again this will also disable the dates on the calendar that are invalid. However, one important
difference between using `hcDatepickerFilter` vs using `min` or `max` is that filtering out all
dates before or after a certain point, will not prevent the user from advancing the calendar past
that point.

In this example the user can back past 2005, but all of the dates before then will be unselectable.
They will not be able to go further back in the calendar than 2000. If they manually type in a date
that is before the min, after the max, or filtered out, the input will have validation errors.

Each validation property has a different error that can be checked:

-   A value that violates the `min` property will have a `hcDatepickerMin` error.
-   A value that violates the `max` property will have a `hcDatepickerMax` error.
-   A value that violates the `hcDatepickerFilter` property will have a `hcDatepickerFilter` error.

The input's native `(input)` and `(change)` events will only trigger due to user interaction with
the input element; they will not fire when the user selects a date from the calendar popup.
Therefore, the datepicker input also has support for `(dateInput)` and `(dateChange)` events. These
trigger when the user interacts with either the input or the popup.

The `(dateInput)` event will fire whenever the value changes due to the user typing or selecting a
date from the calendar. The `(dateChange)` event will fire whenever the user finishes typing input
(on `<input>` blur), or when the user chooses a date from the calendar.

##### Disabling parts of the datepicker

As with any standard `<input>`, it is possible to disable the datepicker input by adding the
`disabled` property. By default, the `<hc-datepicker>` and `<hc-datepicker-toggle>` will inherit
their disabled state from the `<input>`, but this can be overridden by setting the `disabled`
property on the datepicker or toggle elements. This can be useful if you want to disable text input
but allow selection via the calendar or vice-versa.

##### Manually opening and closing the calendar

The calendar popup can be programmatically controlled using the `open` and `close` methods on the
`<hc-datepicker>`. It also has an `opened` property that reflects the status of the popup.

##### Internationalization

Internationalization of the datepicker is configured via four aspects:

1.  The date locale.
2.  The date implementation that the datepicker accepts.
3.  The display and parse formats used by the datepicker.
4.  The message strings used in the datepicker's UI.

##### Setting the locale code

By default, the `HC_DATE_LOCALE` injection token will use the existing `LOCALE_ID` locale code
from `@angular/core`. If you want to override it, you can provide a new value for the
`HC_DATE_LOCALE` token:

```ts
@NgModule({
    providers: [{provide: HC_DATE_LOCALE, useValue: 'en-GB'}]
})
export class MyApp {}
```

<a name="choosing-date-implementation"></a>It's also possible to set the locale at runtime using the `setLocale` method of the `DateAdapter`.

##### Choosing a date implementation and date format settings

The datepicker was built to be date implementation agnostic. This means that it can be made to work
with a variety of different date implementations. However it also means that developers need to make
sure to provide the appropriate pieces for the datepicker to work with their chosen implementation.
The easiest way to ensure this is just to import one of the pre-made modules:

| Module               | Date type | Supported locales | Dependencies | Import from         |
| -------------------- | --------- | ----------------- | ------------ | ------------------- |
| `HcNativeDateModule` | `Date`    | en-US             | None         | `@healthcatalyst/cashmere` |

These modules include providers for `DateAdapter` and `HC_DATE_FORMATS`

```ts
@NgModule({
    imports: [DatepickerModule, HcNativeDateModule]
})
export class MyApp {}
```

Because `DateAdapter` is a generic class, `HcDatepicker` and `HcDatepickerInput` also need to be
made generic. When working with these classes (for example as a `ViewChild`) you should include the
appropriate generic type that corresponds to the `DateAdapter` implementation you are using. For
example:

```ts
@Component({...})
export class MyComponent {
  @ViewChild(HcDatepicker) datepicker: HcDatepicker<Date>;
}
```

_Please note: `HcNativeDateModule` is based off of the functionality available in JavaScript's
native `Date` object, and is thus not suitable for many locales. One of the biggest shortcomings of
the native `Date` object is the inability to set the parse format.

<a href="https://sugarjs.com/dates/#/Parsing">SugarJS</a> is a JavaScript library used by many Health
Catalyst applications to handle parsing user input into Date objects.  It handles a wide variety of
input formats and supports multiple languages.  To use SugarJS with the Cashmere DatePicker,
you need to declare a Sugar Date Adapter as demonstrated in the example below.  See the **Datepicker Sugar**
example on the examples tab for more information.

```ts
export class SugarDateAdapter extends NativeDateAdapter {
    parse(value: any): Date | null {
        return createDate(value);
    }
}
```

It is also possible to create your own `DateAdapter` that works with any date format your app
requires. This is accomplished by subclassing `DateAdapter` and providing your subclass as the
`DateAdapter` implementation. You will also want to make sure that the `HC_DATE_FORMATS` provided
in your app are formats that can be understood by your date implementation. See
[Customizing the parse and display formats](/components/datepicker/usage#customizing-parse) for more
information about `HC_DATE_FORMATS`.

```ts
@NgModule({
    imports: [DatepickerModule],
    providers: [
        {provide: DateAdapter, useClass: MyDateAdapter},
        {provide: HC_DATE_FORMATS, useValue: MY_DATE_FORMATS}
    ]
})
export class MyApp {}
```

<a name="customizing-parse" style="height:25px; display: block;"></a>

##### Customizing the parse and display formats

The `HC_DATE_FORMATS` object is just a collection of formats that the datepicker uses when parsing
and displaying dates. These formats are passed through to the `DateAdapter` so you will want to make
sure that the format objects you're using are compatible with the `DateAdapter` used in your app.

If you want use one of the `DateAdapters` that ships with Cashmere, but use your own
`HC_DATE_FORMATS`, you can import the `NativeDateModule`. This module is
identical to the "Hc"-prefixed version (`HcNativeDateModule`) except
they do not include the default formats. For example:

```ts
@NgModule({
    imports: [DatepickerModule, NativeDateModule],
    providers: [{provide: HC_DATE_FORMATS, useValue: MY_NATIVE_DATE_FORMATS}]
})
export class MyApp {}
```

##### Customizing the calendar header

The header section of the calendar (the part containing the view switcher and previous and next
buttons) can be replaced with a custom component if desired. This is accomplished using the
`calendarHeaderComponent` property of `<hc-datepicker>`. It takes a component class and constructs
an instance of the component to use as the header.

In order to interact with the calendar in your custom header component, you can inject the parent
`HcCalendar` in the constructor. To make sure your header stays in sync with the calendar,
subscribe to the `stateChanges` observable of the calendar and mark your header component for change
detection.

##### Localizing labels and messages

The various text strings used by the datepicker are provided through `HcDatepickerIntl`.
Localization of these messages can be done by providing a subclass with translated values in your
application root module.

```ts
@NgModule({
    imports: [DatepickerModule, HcNativeDateModule],
    providers: [{provide: HcDatepickerIntl, useClass: MyIntl}]
})
export class MyApp {}
```

##### Highlighting specific dates

If you want to apply one or more CSS classes to some dates in the calendar (e.g. to highlight a
holiday), you can do so with the `dateClass` input. It accepts a function which will be called
with each of the dates in the calendar and will apply any classes that are returned. The return
value can be anything that is accepted by `ngClass`.

##### Accessibility

The `HcDatepickerInput` and `HcDatepickerToggle` directives add the `aria-haspopup` attribute to
the native input and toggle button elements respectively, and they trigger a calendar dialog with
`role="dialog"`.

`HcDatepickerIntl` includes strings that are used for `aria-label`s. The datepicker input
should have a placeholder or be given a meaningful label via `aria-label`, `aria-labelledby` or
`HcDatepickerIntl`.

##### Keyboard shortcuts

The datepicker supports the following keyboard shortcuts:

| Shortcut             | Action                    |
| -------------------- | ------------------------- |
| `ALT` + `DOWN_ARROW` | Open the calendar pop-up  |
| `ESCAPE`             | Close the calendar pop-up |

In month view:

| Shortcut            | Action                                   |
| ------------------- | ---------------------------------------- |
| `LEFT_ARROW`        | Go to previous day                       |
| `RIGHT_ARROW`       | Go to next day                           |
| `UP_ARROW`          | Go to same day in the previous week      |
| `DOWN_ARROW`        | Go to same day in the next week          |
| `HOME`              | Go to the first day of the month         |
| `END`               | Go to the last day of the month          |
| `PAGE_UP`           | Go to the same day in the previous month |
| `ALT` + `PAGE_UP`   | Go to the same day in the previous year  |
| `PAGE_DOWN`         | Go to the same day in the next month     |
| `ALT` + `PAGE_DOWN` | Go to the same day in the next year      |
| `ENTER`             | Select current date                      |

In year view:

| Shortcut            | Action                                    |
| ------------------- | ----------------------------------------- |
| `LEFT_ARROW`        | Go to previous month                      |
| `RIGHT_ARROW`       | Go to next month                          |
| `UP_ARROW`          | Go up a row (back 4 months)               |
| `DOWN_ARROW`        | Go down a row (forward 4 months)          |
| `HOME`              | Go to the first month of the year         |
| `END`               | Go to the last month of the year          |
| `PAGE_UP`           | Go to the same month in the previous year |
| `ALT` + `PAGE_UP`   | Go to the same month 10 years back        |
| `PAGE_DOWN`         | Go to the same month in the next year     |
| `ALT` + `PAGE_DOWN` | Go to the same month 10 years forward     |
| `ENTER`             | Select current month                      |

In multi-year view:

| Shortcut            | Action                                    |
| ------------------- | ----------------------------------------- |
| `LEFT_ARROW`        | Go to previous year                       |
| `RIGHT_ARROW`       | Go to next year                           |
| `UP_ARROW`          | Go up a row (back 4 years)                |
| `DOWN_ARROW`        | Go down a row (forward 4 years)           |
| `HOME`              | Go to the first year in the current range |
| `END`               | Go to the last year in the current range  |
| `PAGE_UP`           | Go back 24 years                          |
| `ALT` + `PAGE_UP`   | Go back 240 years                         |
| `PAGE_DOWN`         | Go forward 24 years                       |
| `ALT` + `PAGE_DOWN` | Go forward 240 years                      |
| `ENTER`             | Select current year                       |

##### Troubleshooting

#### Error: HcDatepicker: No provider found for DateAdapter/HC_DATE_FORMATS

This error is thrown if you have not provided all of the injectables the datepicker needs to work.
The easiest way to resolve this is to import the `HcNativeDateModule` in
your application's root module. See
[Choosing a date implementation](/components/datepicker/usage#choosing-date-implementation) for
more information.

#### Error: A HcDatepicker can only be associated with a single input

This error is thrown if more than one `<input>` tries to claim ownership over the same
`<hc-datepicker>` (via the `hcDatepicker` attribute on the input). A datepicker can only be
associated with a single input.

#### Error: Attempted to open an HcDatepicker with no associated input.

This error occurs if your `<hc-datepicker>` is not associated with any `<input>`. To associate an
input with your datepicker, create a template reference for the datepicker and assign it to the
`hcDatepicker` attribute on the input:

```html
<input [hcDatepicker]="picker" />
<hc-datepicker #picker></hc-datepicker>
```
