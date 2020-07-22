import {Pipe, PipeTransform} from '@angular/core';

export type EllipsisMode = 'characters' | 'words';

@Pipe({
    name: 'ellipsis',
    pure: true
})
export class EllipsisPipe implements PipeTransform {
    static readonly ELLIPSIS = '…';

    transform(value: string, length: number, mode: EllipsisMode = 'characters'): string {
        if (typeof value !== 'string' || typeof length !== 'number' || length < 0 || isNaN(length) || Math.floor(length) !== length) {
            return value;
        }

        const truncated = mode === 'words' ? this.firstNWords(value, length) : this.firstNCharacters(value, length);

        if (truncated === value) {
            return value;
        }

        return truncated + EllipsisPipe.ELLIPSIS;
    }

    private firstNWords(value: string, n: number): string {
        const words = value.split(/\s+/g);
        if (words.length <= n) {
            return value;
        }

        const pattern = new RegExp('^' + words.slice(0, n).join('\\s+'));
        return pattern.exec(value)![0];
    }

    private firstNCharacters(value: string, n: number): string {
        return value.length > n ? value.substring(0, n) : value;
    }
}
