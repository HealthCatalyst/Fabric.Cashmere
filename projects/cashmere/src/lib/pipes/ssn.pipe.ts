import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'ssn'
})
export class SSNPipe implements PipeTransform {

    transform(ssn: string): any {
        ssn = ssn.toString().trim().replace(/^\+/, '');
        ssn = ssn.replace(/[^0-9]*/g, '');

        let first: string;
        let second: string;
        let last: string;
        if (ssn.length <= 3) {
            return ssn;
        }
        if (ssn.length <= 5) {
            first = ssn.substring(0, 3);
            second = ssn.substring(3, 5);
            return first + "-" + second;
        }
        first = ssn.substring(0, 3);
        second = ssn.substring(3, 5);
        last = ssn.substring(5, ssn.length);

        return first + "-" + second + "-" + last;
    }
}
