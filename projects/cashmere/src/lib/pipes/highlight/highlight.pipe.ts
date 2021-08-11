import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
    name: 'highlight',
    pure: true
})
export class HighlightPipe implements PipeTransform {
    transform(text: string, search?: string, preserveHTML: boolean = false): string {
        if (search && text) {
            // eslint-disable-next-line no-useless-escape
            let pattern: string = this.escapeTags(search).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
            pattern = pattern
                .split(' ')
                .filter(t => {
                    return t.length > 0;
                })
                .join('|');
            const regex = new RegExp(pattern, 'gi');

            const highlightedText = this.escapeTags(text).replace(regex, match => `<span class="hc-text-highlight">${match}</span>`)

            return preserveHTML ? this.reverseEscapeTags( highlightedText ) : highlightedText;
        } else {
            return preserveHTML ? text : this.escapeTags(text);
        }
    }

    escapeTags(input: string): string {
        return (input || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    reverseEscapeTags( input: string ): string {
        return (input || '').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    }
}
