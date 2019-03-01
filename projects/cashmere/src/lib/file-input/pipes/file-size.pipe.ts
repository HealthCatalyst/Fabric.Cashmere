import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'hcFileSize',
    pure: true
})
export class FileSizePipe implements PipeTransform {
    transform(value: number | any): string {
        return bytesToFileSize(value);
    }
}

export function bytesToFileSize(value: number | any) {
    if (value === null || value === undefined) {
        return '';
    }
    if (isNaN(+value)) {
        return `${value}`;
    }
    let numberValue = +value;

    let suffix = ' bytes';
    if (numberValue >= 1024) {
        numberValue /= 1024;
        suffix = 'KB';
        if (numberValue >= 1024) {
            numberValue /= 1024;
            suffix = 'MB';
            if (numberValue >= 1024) {
                numberValue /= 1024;
                suffix = 'GB';
            }
        }
    }
    return `${Math.round(numberValue * 10) / 10}${suffix}`;
}
