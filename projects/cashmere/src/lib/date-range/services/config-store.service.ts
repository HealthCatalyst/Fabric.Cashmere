import {Injectable} from '@angular/core';
import {DateRangeOptions} from '../model/model';

@Injectable()
export class ConfigStoreService {
    private _dateRangeOptions: DateRangeOptions;
    private defaultOptions: DateRangeOptions = {
        excludeWeekends: false,
        locale: 'en-US',
        fromMinMax: {fromDate: undefined, toDate: undefined},
        toMinMax: {fromDate: undefined, toDate: undefined},
        presets: [],
        format: '',
        range: {fromDate: undefined, toDate: undefined}
    };

    constructor() {}

    get DateRangeOptions(): DateRangeOptions {
        return this._dateRangeOptions;
    }

    set DateRangeOptions(options: DateRangeOptions) {
        this._dateRangeOptions = {...this.defaultOptions, ...options};
    }
}
