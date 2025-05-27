import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
    name: 'highlight',
    pure: true,
    standalone: false
})
export class HighlightPipe implements PipeTransform {
    transform(text: string, search?: string, preserveHTML = false): string {
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

            if ( preserveHTML ) {
                const parser = new DOMParser();
                const htmlDoc = parser.parseFromString(text, 'text/html');

                this.searchChildren( htmlDoc.children[0].children[1], regex );
                return this.reverseEscapeTags(htmlDoc.children[0].children[1].innerHTML);
            } else {
                return this.escapeTags(text).replace(regex, match => `<span class="hc-text-highlight">${match}</span>`);
            }
        } else {
            return preserveHTML ? text : this.escapeTags(text);
        }
    }

    searchChildren( parent: ChildNode, regex: RegExp ): void {
        if( parent.childNodes.length > 0 ){
            parent.childNodes.forEach( child => this.searchChildren( child, regex ) );
        } else {
            if( parent.nodeValue ) {
                parent.nodeValue = parent.nodeValue.replace(regex, match => `<span class="hc-text-highlight">${match}</span>`);
            }
        }
    }

    escapeTags(input: string): string {
        return (input || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    reverseEscapeTags( input: string ): string {
        return (input || '').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    }
}
