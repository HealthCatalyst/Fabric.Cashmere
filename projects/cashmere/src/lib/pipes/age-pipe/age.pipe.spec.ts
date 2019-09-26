
import { AgePipe } from './age.pipe';
import { Date as SugarDate } from 'sugar';

describe('AgePipe', () => {
    let pipe: AgePipe = new AgePipe();

    it('create an instance', () => {
        // assert
        expect(pipe).toBeTruthy();
    });

    it('give the duration in mos if less than a year', () => {
        // arrange
        const testDate: string = adjustDate(0, -2, 0).toDateString();

        // act
        const result: string = pipe.transform(testDate);

        // assert
        expect(result).toEqual('2 mos');
    });

    it('give the duration in yr if equal to one year', () => {
        // arrange
        const testDate: string = adjustDate(-1, 0, 0).toDateString();

        // act
        const result: string = pipe.transform(testDate);

        // assert
        expect(result).toEqual('1 yr');
    });

    it('give the duration in mos if less than a year and not quite the birthdate', () => {
        // arrange
        const testDate: string = adjustDate(0, -6, 1).toDateString();

        // act
        const result: string = pipe.transform(testDate);

        // assert
        expect(result).toEqual('5 mos');
    });

    it('give the duration as 0 mos if less than a month', () => {
        // arrange
        const testDate: string = adjustDate(0, 0, -3).toDateString();

        // act
        const result: string = pipe.transform(testDate);

        // assert
        expect(result).toEqual('0 mos');
    });

    it('give the duration as 1 mo if equal to one month', () => {
        // arrange
        const testDate: string = adjustDate(0, 1, 0).toDateString();

        // act
        const result: string = pipe.transform(testDate);

        // assert
        expect(result).toEqual('0 mos');
    });

    it('give the duration in years if more than a year', () => {
        // arrange
        const testDate: string = adjustDate(-3, 0, 0).toDateString();

        // act
        const result: string = pipe.transform(testDate);

        // assert
        expect(result).toEqual('3 yrs');
    });

    it('give the duration in years if much more than a year and not quite the birthdate', () => {
        // arrange
        const testDate: string = adjustDate(-49, 0, 1).toISOString();

        // act
        const result: string = pipe.transform(testDate);

        // assert
        expect(result).toEqual('48 yrs');
    });

    it('return valid duration if given a simple valid string date', () => {
        // arrange
        const testDate: Date = adjustDate(-2, 0, 0);
        const testDateStr: string = `${testDate.getMonth()}/${testDate.getDate()}/${testDate.getFullYear()}`;

        // act
        const result: string = pipe.transform(testDateStr);

        // assert
        expect(result).toEqual('2 yrs');
    });

    it('return "" if undefined when given undefined', () => {
        // arrange
        const testDate: any = undefined;

        // act
        const result: string = pipe.transform(testDate);

        // assert
        expect(result).toEqual('');
    });

    it('return "Invalid Birth Date" when an unexpected date string is given', () => {
        // arrange
        const testDate: string = "Test";
        const consoleSpy: jasmine.Spy = spyOn(console, "log");

        // act
        const result: string = pipe.transform(testDate);

        // assert
        expect(consoleSpy).toHaveBeenCalledWith('AgePipe Error: Invalid Birth Date');
        expect(result).toEqual('');
    });

    it('return "Value must be of type Date or String" when given a number', () => {
        // arrange
        const testDate: any = 25;
        const consoleSpy: jasmine.Spy = spyOn(console, "log");

        // act
        const result: string = pipe.transform(testDate);

        // assert
        expect(consoleSpy).toHaveBeenCalledWith('AgePipe Error: Value must be of type Date or string');
        expect(result).toEqual('');
    });
});

export function adjustDate(adjustYearBy: number, adjustMonthBy: number, adjustDayBy: number ): Date {
    let adjustedDate: Date = SugarDate.create("today");

    adjustedDate = SugarDate.addYears(adjustedDate, adjustYearBy);
    adjustedDate = SugarDate.addMonths(adjustedDate, adjustMonthBy);
    adjustedDate = SugarDate.addDays(adjustedDate, adjustDayBy);

    return adjustedDate;
}
