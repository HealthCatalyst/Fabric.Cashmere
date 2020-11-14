import {Directive, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import * as markdownIt from 'markdown-it';
import * as container_plugin from 'markdown-it-container';
import * as mdnh from 'markdown-it-named-headers';
import {highlightBlock} from 'highlight.js';

@Directive({
    selector: '[hcMarkdown]'
})
export class MarkdownDirective implements OnChanges {
    @Input()
    hcMarkdown: string;
    @Input()
    sanitize: boolean;
    @Input()
    highlight: boolean = true;
    @Input()
    lineNumbers: boolean = true;

    @Output()
    loaded: EventEmitter<boolean> = new EventEmitter();

    constructor(private el: ElementRef) {}

    ngOnChanges(_: SimpleChanges): void {
        const md = new markdownIt({html: true});

        // plugin to add id values to header tags
        md.use(mdnh);

        // plugin to markdown-it to interpret :::
        md.use(container_plugin, 'hc-tile', {
            validate: function(params) {
                // markdown-it-container allows multiple ::: containers
                // This function allows you to validate this is the one you want
                // We only have one, so always validate
                return true;
            }
        });
        this.el.nativeElement.innerHTML = md.render(this.hcMarkdown, {sanitize: this.sanitize});
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

        this.loaded.emit( true );
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
