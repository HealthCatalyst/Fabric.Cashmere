import {Pipe, PipeTransform} from '@angular/core';
import {SafeHtml} from '@angular/platform-browser';

type MatchType = 'Single-Match' | 'Single-And-StartsWith-Match' | 'Multi-Match';

@Pipe({name: 'hcHighlight', pure: true})
export class HighlightPipe implements PipeTransform {
    /* use this for single match search */
    static SINGLE_MATCH: MatchType = 'Single-Match';
    /* use this for single match search with a restriction that target should start with search string */
    static SINGLE_AND_STARTS_WITH_MATCH: MatchType = 'Single-And-StartsWith-Match';
    /* use this for global search */
    static MULTI_MATCH: MatchType = 'Multi-Match';

    constructor() {}

    transform(
        data: string,
        highlightText: string,
        option: MatchType = HighlightPipe.SINGLE_MATCH,
        caseSensitive: boolean = false,
        highlightStyleName: string = 'search-highlight'
    ): SafeHtml {
        if (!data || data.length === 0) {
            return data;
        }
        if (highlightText && data && option) {
            let regex: any = '';
            let caseFlag: string = !caseSensitive ? 'i' : '';
            switch (option) {
                case HighlightPipe.SINGLE_MATCH: {
                    regex = new RegExp(highlightText, caseFlag);
                    break;
                }
                case HighlightPipe.SINGLE_AND_STARTS_WITH_MATCH: {
                    regex = new RegExp('^' + highlightText, caseFlag);
                    break;
                }
                case HighlightPipe.MULTI_MATCH: {
                    regex = new RegExp(highlightText, 'g' + caseFlag);
                    break;
                }
                default: {
                    // default will be a global case-insensitive match
                    regex = new RegExp(highlightText, 'gi');
                }
            }
            let tempData: string = String(data);
            if (!tempData.toLowerCase().includes(highlightText.toLowerCase())) {
                return data;
            }

            return tempData.replace(regex, match => '<span class="highlight">' + match + '</span>');
        } else {
            return data;
        }
    }
}
