import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarkdownDirective} from './markdown/markdown.directive';
import {MarkdownContentComponent} from '../shared/markdown-content.component';
import {SwatchDemoComponent} from './swatch/swatch-demo.component';
import {HighlightDirective} from './highlight/highlight.directive';
import {CashmereModule} from './cashmere.module';
import {FeedbackFormComponent} from '../shared/feedback-form/feedback-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ChangeCasePipe } from './change-case-pipe/change-case.pipe';

@NgModule({
    imports: [CommonModule, CashmereModule, ReactiveFormsModule],
    declarations: [MarkdownDirective, HighlightDirective, MarkdownContentComponent, SwatchDemoComponent, FeedbackFormComponent, ChangeCasePipe],
    exports: [
        MarkdownDirective,
        HighlightDirective,
        SwatchDemoComponent,
        FeedbackFormComponent,
        ChangeCasePipe,
        CommonModule,
        CashmereModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class SharedModule {}
