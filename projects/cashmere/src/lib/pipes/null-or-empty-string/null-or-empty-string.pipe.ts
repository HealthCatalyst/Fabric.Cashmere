import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    'name': 'ifNullOrEmpty',
    standalone: false
})
export class NullOrEmptyStringPipe implements PipeTransform {

    public transform(value: unknown, altText: string): string | unknown {
        if (typeof(value) === 'string') {
            value = value.trim();
            return value ? value : altText;
        }

        if (value === undefined || value === null) {
            return altText;
        }

        // if given value is not null or undefined, and is not a string, return as is
        return value;
    }
}
