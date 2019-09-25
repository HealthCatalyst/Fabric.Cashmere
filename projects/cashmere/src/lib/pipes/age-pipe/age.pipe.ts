import { Pipe, PipeTransform } from '@angular/core';
import { Date } from 'sugar';

@Pipe({
  'name': 'age'
})
export class AgePipe implements PipeTransform {

  public transform(value: string): string {
    const birth: Date = Date.create(value);

    // if under 12 months then show in months
    let ageInMonths: number = Date.monthsAgo(birth);
    if (ageInMonths < 12) {
      return `${ageInMonths} ` + ((ageInMonths === 0 || ageInMonths > 1) ? 'mos' : 'mo');
    }

    let ageInYears: number = Date.yearsAgo(birth);

    return `${ageInYears} ` + (ageInYears > 1 ? 'yrs' : 'yr');
  }
}
