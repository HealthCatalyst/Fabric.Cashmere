import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {highlightBlock} from 'highlight.js';

@Directive({
    selector: '[hcHighlight]'
})
export class HighlightDirective implements AfterViewInit {
    @Input()
    lineNumbers: boolean = true;

    constructor(private el: ElementRef) {}

    ngAfterViewInit() {
        const highlightElement: HTMLPreElement = this.el.nativeElement ? this.el.nativeElement : this.el;
        highlightBlock(highlightElement);
        if (this.lineNumbers) {
            this.addLines(highlightElement);
        }
    }

    private addLines(pre: HTMLPreElement): void {
        pre.innerHTML = `<span class="line-number"></span>${pre.innerHTML}<span class="cl"></span>`;
        const num = pre.innerHTML.split(/\n/).length;
        if (num > 2) {
            for (let j = 1; j < num; j++) {
                const lineNum = pre.getElementsByTagName('span')[0];
                lineNum.innerHTML += `<span>${j}</span>`;
            }
        }
    }
}
