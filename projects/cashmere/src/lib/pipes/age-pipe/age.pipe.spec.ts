
import {async, inject, TestBed} from '@angular/core/testing';

import { AgePipe } from './age.pipe';
import { Date } from 'sugar';

describe('AgePipe', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [AgePipe]
        }).compileComponents();
    }));

    it('create an instance', inject([AgePipe], pipe => {
        // assert
        expect(pipe).toBeTruthy();
    }));

    it('give the duration in mos if less than a year', inject([AgePipe], pipe => {
        // arrange
        const testDate: string = adjustDate(0, -2, 0).toDateString();

        // act
        const result: string = pipe.transform(testDate);

        // assert
        expect(result).toEqual('2 mos');
    }));

    it('give the duration in yr if equal to one year', inject([AgePipe], pipe => {
        // arrange
        const testDate: string = adjustDate(-1, 0, 0).toDateString();

        // act
        const result: string = pipe.transform(testDate);

        // assert
        expect(result).toEqual('1 yr');
    }));

    it('give the duration in mos if less than a year and not quite the birthdate', inject([AgePipe], pipe => {
        // arrange
        const testDate: string = adjustDate(0, -6, 1).toDateString();

        // act
        const result: string = pipe.transform(testDate);

        // assert
        expect(result).toEqual('5 mos');
    }));

    it('give the duration as 0 mos if less than a month', inject([AgePipe], pipe => {
        // arrange
        const testDate: string = adjustDate(0, 0, -3).toDateString();

        // act
        const result: string = pipe.transform(testDate);

        // assert
        expect(result).toEqual('0 mos');
    }));

    it('give the duration as 1 mo if equal to one month', inject([AgePipe], pipe => {
        // arrange
        const testDate: string = adjustDate(0, 1, 0).toDateString();

        // act
        const result: string = pipe.transform(testDate);

        // assert
        expect(result).toEqual('0 mos');
    }));

    it('give the duration in years if more than a year', inject([AgePipe], pipe => {
        // arrange
        const testDate: string = adjustDate(-3, 0, 0).toDateString();

        // act
        const result: string = pipe.transform(testDate);

        // assert
        expect(result).toEqual('3 yrs');
    }));

    it('give the duration in years if much more than a year and not quite the birthdate', inject([AgePipe], pipe => {
        // arrange
        const testDate: string = adjustDate(-49, 0, 1).toISOString();

        // act
        const result: string = pipe.transform(testDate);

        // assert
        expect(result).toEqual('48 yrs');
    }));
});

export function adjustDate(adjustYearBy: number, adjustMonthBy: number, adjustDayBy: number ): Date {
    let adjustedDate: Date = Date.create("today");

    adjustedDate = Date.addYears(adjustedDate, adjustYearBy);
    adjustedDate = Date.addMonths(adjustedDate, adjustMonthBy);
    adjustedDate = Date.addDays(adjustedDate, adjustDayBy);

    return adjustedDate;
}
