import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
    name: 'highlight',
    pure: true
})
export class HighlightPipe implements PipeTransform {
    transform(text: string, search?: string): string {
        if (search && text) {
            let pattern: string = this.escapeTags(search).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
            pattern = pattern
                .split(' ')
                .filter(t => {
                    return t.length > 0;
                })
                .join('|');
            const regex: RegExp = new RegExp(pattern, 'gi');

            return this.escapeTags(text).replace(regex, match => `<span class="hc-text-highlight">${match}</span>`);
        } else {
            return this.escapeTags(text);
        }
    }

    escapeTags(input: string): string {
        return (input || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
}
