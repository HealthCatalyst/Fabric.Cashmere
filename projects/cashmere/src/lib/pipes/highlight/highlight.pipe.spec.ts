import {HighlightPipe} from './highlight.pipe';

describe('HighlightPipe', () => {
    let highlightPipe: HighlightPipe;

    beforeEach(() => {
        highlightPipe = new HighlightPipe();
    });

    describe('when text and search contain no HTML', () => {
        const text = 'the quick brown fox jumps over the lazy dog';

        describe('when search term is found in the string', () => {
            it('should wrap the match with a highlight span', () => {
                const result: string = highlightPipe.transform(text, 'quick');
                expect(result).toBe('the <span class="hc-text-highlight">quick</span> brown fox jumps over the lazy dog');
            });
        });
        describe(`when search term doesn't match casing with the text`, () => {
            it('should still find the search term in the text and wrap the match with a highlight span', () => {
                const result: string = highlightPipe.transform(text, 'QUICK');
                expect(result).toBe('the <span class="hc-text-highlight">quick</span> brown fox jumps over the lazy dog');
            });
        });
        describe('when search term is multiple words', () => {
            it('should wrap each adjacent word in the match with its own highlight span', () => {
                const result: string = highlightPipe.transform(text, 'quick brown');
                expect(result).toBe(
                    'the <span class="hc-text-highlight">quick</span> <span class="hc-text-highlight">brown</span> fox jumps over the lazy dog'
                );
            });

            describe('if those multiple words are not adjacent in the text', () => {
                it('should wrap each matching word from the search in its own highlight span', () => {
                    const result: string = highlightPipe.transform(text, 'quick dog');
                    expect(result).toBe(
                        'the <span class="hc-text-highlight">quick</span> brown fox jumps over the lazy <span class="hc-text-highlight">dog</span>'
                    );
                });
            });
        });
        describe('when search term is a partial word found in the string', () => {
            it('should wrap the match with a highlight span', () => {
                const result: string = highlightPipe.transform(text, 'mp');
                expect(result).toBe('the quick brown fox ju<span class="hc-text-highlight">mp</span>s over the lazy dog');
            });
        });
        describe('when search term is found multiple times in the string', () => {
            it('should wrap all matches with highlight spans', () => {
                const result: string = highlightPipe.transform(text, 'the');
                expect(result).toBe(
                    '<span class="hc-text-highlight">the</span> quick brown fox jumps over <span class="hc-text-highlight">the</span> lazy dog'
                );
            });
        });
        describe('when search term is not found in the string', () => {
            it('should return the input string', () => {
                const result: string = highlightPipe.transform(text, 'boy');
                expect(result).toBe(text);
            });
        });
        describe('when search term is `undefined`', () => {
            it('should return the input string', () => {
                const result: string = highlightPipe.transform(text, undefined);
                expect(result).toBe(text);
            });
        });
    });

    describe('when text contains HTML', () => {
        const text = 'the quick brown <span class="hc-text-highlight">fox</span> jumps over the lazy dog';

        it('should highlight matches on the escaped HTML', () => {
            const result: string = highlightPipe.transform(text, 'highlight');
            expect(result).toBe(
                'the quick brown &lt;span class="hc-text-<span class="hc-text-highlight">highlight</span>"&gt;fox&lt;/span&gt; jumps over the lazy dog'
            );
        });
        describe('when the search term contains HTML', () => {
            it('should highlight matches on the escaped HTML', () => {
                const result: string = highlightPipe.transform(text, '<span');
                expect(result).toBe(
                    'the quick brown <span class="hc-text-highlight">&lt;span</span> class="hc-text-highlight"&gt;fox&lt;/span&gt; jumps over the lazy dog'
                );
            });
        });
        describe('when the search term is blank', () => {
            it('should still escape the HTML in the text', () => {
                const result: string = highlightPipe.transform(text, undefined);
                expect(result).toBe('the quick brown &lt;span class="hc-text-highlight"&gt;fox&lt;/span&gt; jumps over the lazy dog');
            });
        });
    });

    describe('when text is `undefined`', () => {
        it('should return the empty string', () => {
            const result: string = highlightPipe.transform((undefined as unknown) as string, 'boy');
            expect(result).toBe('');
        });
    });
    describe('when both search term and text are `undefined`', () => {
        it('should return the empty string', () => {
            const result: string = highlightPipe.transform((undefined as unknown) as string, undefined);
            expect(result).toBe('');
        });
    });
});
