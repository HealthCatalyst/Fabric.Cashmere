import {Pipe, PipeTransform} from '@angular/core';

// Convert bytes into largest possible unit.
// Credit to https://gist.github.com/JonCatmull/ecdf9441aaa37336d9ae2c7f9cb7289a
@Pipe({
    name: 'fileSize', pure: true,
    standalone: false
})
export class FileSizePipe implements PipeTransform {
    private units: string[] = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

    public transform(bytes: number, precision = 2): string {
        const originalInput = bytes;
        if (typeof bytes === 'string') {
            bytes = +bytes;
        }
        if (typeof bytes !== 'number' || isNaN(bytes) || !isFinite(bytes) || bytes < 0 || Math.floor(bytes) !== bytes) {
            return `${originalInput}`;
        }

        if (
            typeof precision !== 'number' ||
            isNaN(precision) ||
            !isFinite(precision) ||
            precision < 0 ||
            Math.floor(precision) !== precision
        ) {
            precision = 2;
        }
        if (precision > 100) {
            precision = 100;
        }

        let unit = 0;

        while (bytes >= 1024) {
            bytes /= 1024;
            unit++;

            if (unit === 5) {
                // PB, largest size for pipe
                break;
            }
        }

        let rounded = bytes.toFixed(precision);

        // if the value after truncating is a whole number, don't display a decimal
        if (Math.floor(+rounded) === +rounded) {
            rounded = (+rounded).toString();
        }

        return rounded + ' ' + this.units[unit];
    }
}
