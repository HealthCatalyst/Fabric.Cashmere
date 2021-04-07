import {Directive, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import * as markdownIt from 'markdown-it';
import * as container_plugin from 'markdown-it-container';
import * as mdnh from 'markdown-it-named-headers';
import {HighlightDirective} from '../highlight/highlight.directive';

@Directive({
    selector: '[hcMarkdown]'
})
export class MarkdownDirective implements OnChanges {
    @Input()
    hcMarkdown: Object;
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
        this.el.nativeElement.innerHTML = md.render(this.hcMarkdown['default'], {sanitize: this.sanitize});
        if (this.highlight) {
            const preTags: Array<ElementRef> = this.el.nativeElement.getElementsByTagName('pre');
            for (const pre of preTags) {
                const syntaxHighlight = new HighlightDirective( pre );
                syntaxHighlight.lineNumbers = this.lineNumbers;
                syntaxHighlight.ngAfterViewInit();
            }
        }

        this.loaded.emit( true );
    }
}
