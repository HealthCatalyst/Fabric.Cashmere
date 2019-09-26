import { Pipe, PipeTransform } from '@angular/core';
import { Date as SugarDate } from 'sugar';
import chalk from 'chalk';

@Pipe({
  'name': 'age'
})
export class AgePipe implements PipeTransform {

  public transform(value: any): string {
    if (!value) {
        return '';
    } else if (!(value instanceof Date) && typeof value !== "string") {
        console.log(chalk.red("AgePipe Error: Value must be of type Date or string"));
        return '';
    }

    const birth: Date = SugarDate.create(value);

    // checks for valid date
    if (isNaN(birth.getTime())) {
        console.log(chalk.red("AgePipe Error: Invalid Birth Date"));
        return '';
    }

    // if under 12 months then show in months
    let ageInMonths: number = SugarDate.monthsAgo(birth);
    if (ageInMonths < 12) {
      return `${ageInMonths} ` + ((ageInMonths === 0 || ageInMonths > 1) ? 'mos' : 'mo');
    }

    let ageInYears: number = SugarDate.yearsAgo(birth);

    return `${ageInYears} ` + (ageInYears > 1 ? 'yrs' : 'yr');
  }
}
