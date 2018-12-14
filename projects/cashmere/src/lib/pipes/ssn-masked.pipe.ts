import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'ssnMasked'
})
export class SSNMaskedPipe implements PipeTransform {

    transform(ssn: string): any {
        if (!ssn || ssn.length < 9) {
            return ssn;
        }
        ssn = ssn.toString().trim().replace(/^\+/, '');
        ssn = ssn.replace(/[^0-9]*/g, '');

        return "XXX-XX-" + ssn.slice(5).trim();
    }
}
