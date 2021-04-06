import {Injectable} from '@angular/core';
import {DateRangeOptions, DateRange} from '../model/model';
import {Observable, BehaviorSubject} from 'rxjs';
import {D} from '../../datepicker';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class ConfigStoreService {
    private defaultOptions: DateRangeOptions = {
        presets: [],
        format: 'medium',
        mode: 'date',
        hourCycle: 12,
        excludeWeekends: false,
        locale: 'en-us',
        applyLabel: 'Apply',
        cancelLabel: 'Cancel',
        startDatePrefix: 'Start date:',
        endDatePrefix: 'End date:',
        invalidDateLabel: 'Please enter valid date',
        center: false
    };

    private dateRangeOptionsSubject: BehaviorSubject<DateRangeOptions> = new BehaviorSubject<DateRangeOptions>(this.defaultOptions);
    public dateRangeOptions$: Observable<DateRangeOptions>;

    private rangeUpdateSubject: BehaviorSubject<DateRange> = new BehaviorSubject<DateRange>({fromDate: undefined, toDate: undefined});
    public rangeUpdate$: Observable<DateRange>;

    private presetUpdateSubject: BehaviorSubject<number | DateRange> = new BehaviorSubject<number | DateRange>({
        fromDate: undefined,
        toDate: undefined
    });
    public presetUpdate$: Observable<number | DateRange>;

    public weekendFilter: (d: D) => boolean = () => true;

    private readonly emptyWeekendFilter = () => true;
    private readonly excludeWeekendFilter = (d: Date): boolean => {
        const day = d.getDay();
        return day !== 0 && day !== 6;
    };

    constructor() {
        this.dateRangeOptions$ = this.dateRangeOptionsSubject.pipe(
            map((options: DateRangeOptions) => {
                return {
                    ...this.defaultOptions,
                    ...options
                };
            }),
            tap((options: DateRangeOptions) => {
                if (!!options.excludeWeekends) {
                    this.weekendFilter = this.excludeWeekendFilter;
                } else {
                    this.weekendFilter = this.emptyWeekendFilter;
                }
            })
        );

        this.rangeUpdate$ = this.rangeUpdateSubject.pipe();
        this.presetUpdate$ = this.presetUpdateSubject.pipe();
    }

    updateDateRangeOptions(options: DateRangeOptions) {
        this.dateRangeOptionsSubject.next(options);
    }

    updateRange(dateRange: DateRange) {
        this.rangeUpdateSubject.next(dateRange);
    }

    updatePreset(value: number | DateRange) {
        this.presetUpdateSubject.next(value);
    }
}
