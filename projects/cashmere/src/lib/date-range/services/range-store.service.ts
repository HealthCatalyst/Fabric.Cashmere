import { Injectable, Inject, InjectionToken } from '@angular/core';
import { DateRange } from '../model/model';
import { Subject } from 'rxjs';
import { D } from '../../datepicker/datetime/date-formats';

export const DATE = new InjectionToken<D>('date');

@Injectable()
export class RangeStoreService {
    rangeUpdate$: Subject<DateRange> = new Subject<DateRange>();

    constructor(@Inject(DATE) private _fromDate: D, @Inject(DATE) private _toDate: D) {}

    get fromDate(): D {
        return this._fromDate;
    }

    get toDate(): D {
        return this._toDate;
    }

    updateRange(fromDate: D = this._fromDate, toDate: D = this._toDate) {
        this._fromDate = fromDate;
        this._toDate = toDate;
        this.rangeUpdate$.next({ fromDate: this._fromDate, toDate: this._toDate });
    }
}
