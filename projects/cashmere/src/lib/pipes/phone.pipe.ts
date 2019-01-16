import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'phone'
})
export class PhonePipe implements PipeTransform {
    transform(tel: number, args?: string): any {
        let formattedNumber = '';
        if (!tel) {
            return '';
        }

        let value: string = tel
            .toString()
            .trim()
            .replace(/^\+/, '');
        value = value.replace(/[^0-9]*/g, '');
        if (value.match(/[^0-9]/)) {
            return tel;
        }

        let area: string = value.substring(0, 3);
        let front: string = value.substring(3, 6);
        let end: string = value.substring(6, 10);

        if (area) {
            formattedNumber = '(' + area + ') ';
        }

        if (front) {
            formattedNumber += front;
        }
        if (end) {
            formattedNumber += '-' + end;
        }
        return formattedNumber;
    }
}
