import {
    Component,
    Input,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ViewChild,
    OnDestroy,
    Directive,
    AfterContentInit,
    OnChanges,
    ContentChild,
    Attribute,
    SimpleChanges
} from '@angular/core';
import {merge, Subscription, of as observableOf} from 'rxjs';
import {parseBooleanAttribute} from '../../util';
import {HcDatepickerIntl} from '../datepicker-intl';
import {DatepickerComponent} from '../datepicker.component';
import {ButtonComponent} from '../../button/button.component';

/** Can be used to override the icon of a `hcDatepickerToggle`. */
@Directive({
    selector: '[hcDatepickerToggleIcon]',
    standalone: false
})
export class DatepickerToggleIconDirective {}

@Component({
    selector: 'hc-datepicker-toggle',
    templateUrl: './datepicker-toggle.component.html',
    styleUrls: ['./datepicker-toggle.component.scss'],
    host: {
        class: 'hc-datepicker-toggle',
        // Always set the tabindex to -1 so that it doesn't overlap with any custom tabindex the
        // consumer may have provided, while still being able to receive focus.
        '[attr.tabindex]': '-1',
        '[class.hc-datepicker-toggle-active]': 'datepicker && datepicker.opened',
        '(focus)': '_button.focus()'
    },
    exportAs: 'hcDatepickerToggle',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DatepickerToggleComponent implements AfterContentInit, OnChanges, OnDestroy {
    private _stateChanges = Subscription.EMPTY;

    /** Datepicker instance that the button will toggle. */
    @Input('for')
    datepicker: DatepickerComponent;

    /** Tabindex for the toggle. */
    @Input()
    tabIndex: number | null;

    /** Whether the toggle button is disabled. */
    @Input()
    get disabled(): boolean {
        return this._disabled === undefined ? this.datepicker.disabled : !!this._disabled;
    }
    set disabled(value: boolean) {
        this._disabled = parseBooleanAttribute(value);
    }
    private _disabled: boolean;

    /** Custom icon set by the consumer. */
    @ContentChild(DatepickerToggleIconDirective)
    _customIcon: DatepickerToggleIconDirective;

    /** Underlying button element. */
    @ViewChild('button')
    _button: ButtonComponent;

    constructor(
        public _intl: HcDatepickerIntl,
        private _changeDetectorRef: ChangeDetectorRef,
        @Attribute('tabindex') defaultTabIndex: string
    ) {
        const parsedTabIndex = Number(defaultTabIndex);
        this.tabIndex = parsedTabIndex || parsedTabIndex === 0 ? parsedTabIndex : null;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.datepicker) {
            this._watchStateChanges();
        }
    }

    ngOnDestroy(): void {
        this._stateChanges.unsubscribe();
    }

    ngAfterContentInit(): void {
        this._watchStateChanges();
    }

    _open(event: Event): void {
        if (this.datepicker && !this.disabled) {
            this.datepicker.open();
            event.stopPropagation();
        }
    }

    private _watchStateChanges() {
        const datepickerDisabled = this.datepicker ? this.datepicker._disabledChange : observableOf();
        const inputDisabled =
            this.datepicker && this.datepicker._datepickerInput ? this.datepicker._datepickerInput._disabledChange : observableOf();
        const datepickerToggled = this.datepicker ? merge(this.datepicker.openedStream, this.datepicker.closedStream) : observableOf();

        this._stateChanges.unsubscribe();
        this._stateChanges = merge(this._intl.changes, datepickerDisabled, inputDisabled, datepickerToggled).subscribe(() =>
            this._changeDetectorRef.markForCheck()
        );
    }
}
