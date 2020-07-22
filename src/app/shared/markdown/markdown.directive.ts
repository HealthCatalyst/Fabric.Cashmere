import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as markdownIt from 'markdown-it';
import * as container_plugin from 'markdown-it-container';
import {highlightBlock} from 'highlight.js';

@Directive({
    selector: '[hcMarkdown]'
})
export class MarkdownDirective implements OnChanges {
    @Input()
    hcMarkdown: any;
    @Input()
    sanitize: boolean;
    @Input()
    highlight: boolean = true;
    @Input()
    lineNumbers: boolean = true;

    constructor(private el: ElementRef) {}

    ngOnChanges(_: SimpleChanges): void {
        const md = new markdownIt({html: true});

        // plugin to markdown-it to interpret :::
        md.use(container_plugin, 'hc-tile', {
            validate: function(params) {
                // markdown-it-container allows multiple ::: containers
                // This function allows you to validate this is the one you want
                // We only have one, so always validate
                return true;
            }
        });
        this.el.nativeElement.innerHTML = md.render(this.hcMarkdown.default, {sanitize: this.sanitize});
        if (this.highlight) {
            const preTags: Array<HTMLPreElement> = this.el.nativeElement.getElementsByTagName('pre');
            for (const pre of preTags) {
                pre.classList.add(pre.getElementsByTagName('code')[0].className.split('-')[1]);
                this.removeLines(pre);
                highlightBlock(pre);
                if (this.lineNumbers) {
                    this.addLines(pre);
                }
            }
        }
    }

    private removeLines(pre: HTMLPreElement): void {
        const span = pre.querySelector('span.line-number');
        if (span) {
            pre.removeChild(span);
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
