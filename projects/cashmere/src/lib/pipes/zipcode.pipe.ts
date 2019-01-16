import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'zipCode'
})
export class ZipcodePipe implements PipeTransform {
    transform(zipCode: string): string {
        zipCode = zipCode
            .toString()
            .trim()
            .replace(/^\+/, '');
        zipCode = zipCode.replace(/[^0-9]*/g, '');

        if (zipCode.length <= 5) {
            return zipCode;
        }

        let zip: string = zipCode.substring(0, 5);
        let ext: string = zipCode.substring(5, zipCode.length);

        return zip + '-' + ext;
    }
}
