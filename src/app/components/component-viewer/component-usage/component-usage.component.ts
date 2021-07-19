import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentViewerComponent } from '../component-viewer.component';
import { HighlightDirective } from '../../../shared/highlight/highlight.directive';

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

    docLoaded(): void {
        const preTags: Array<ElementRef> = this.el.nativeElement.getElementsByTagName('pre');
        for (const pre of preTags) {
            const syntaxHighlight = new HighlightDirective( pre );
            syntaxHighlight.ngAfterViewInit();
        }

        if ( this.section ) {
            const el = document.getElementById(this.section);
            if ( el ) {
                el.scrollIntoView();
            }
        }
    }
}
