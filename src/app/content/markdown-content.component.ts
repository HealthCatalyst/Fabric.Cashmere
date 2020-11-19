import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SectionService} from 'src/app/shared/section.service';
import {BaseContentComponent} from './base-content.component';

@Component({
    selector: 'hc-trademarks-demo',
    template: `
        <div class="demo-content"><div [hcMarkdown]="markdownContent" (loaded)="loaded()"></div></div>
    `
})
export class MarkdownContentComponent extends BaseContentComponent {
    markdownContent: string = '';

    constructor(sectionService: SectionService, private activatedRoute: ActivatedRoute) {
        super(sectionService);

        if ( activatedRoute.snapshot.data['document'] ) {
            this.markdownContent = activatedRoute.snapshot.data['document'];
        }
    }
}
