import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SectionService} from 'src/app/shared/section.service';
import {BaseDemoComponent} from '../shared/base-demo.component';

@Component({
    selector: 'hc-markdown-demo',
    template: `
        <div class="demo-content"><div [hcMarkdown]="markdownContent" (loaded)="loaded()"></div><hc-feedback-form></hc-feedback-form></div>
    `
})
export class MarkdownContentComponent extends BaseDemoComponent {
    markdownContent: Record<string, unknown>;

    constructor(sectionService: SectionService, private activatedRoute: ActivatedRoute) {
        super(sectionService);

        if ( activatedRoute.snapshot.data['document'] ) {
            this.markdownContent = activatedRoute.snapshot.data['document'];
        }
    }
}
