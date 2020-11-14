import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentViewerComponent } from '../component-viewer.component';
import { highlightBlock } from 'highlight.js';

@Component({
    templateUrl: 'component-usage.component.html',
    styleUrls: ['component-usage.component.scss']
})
export class ComponentUsageComponent {
    private section: string;

    constructor(public componentViewer: ComponentViewerComponent, private activatedRoute: ActivatedRoute, private el: ElementRef) {
        this.activatedRoute.queryParams.subscribe(params => {
            if (params['section']) {
                this.section = params['section'];
            }
        });
    }

    docLoaded() {
        const preTags: Array<HTMLPreElement> = this.el.nativeElement.getElementsByTagName('pre');
        for (const pre of preTags) {
            pre.classList.add(pre.getElementsByTagName('code')[0].className.split('-')[1]);
            this.removeLines(pre);
            highlightBlock(pre);
            this.addLines(pre);
        }

        if ( this.section ) {
            const el = document.getElementById(this.section);
            if ( el ) {
                el.scrollIntoView();
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
