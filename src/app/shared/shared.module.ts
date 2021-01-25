import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarkdownDirective} from './markdown/markdown.directive';
import {MarkdownContentComponent} from '../shared/markdown-content.component';
import {SwatchDemoComponent} from './swatch/swatch-demo.component';
import {HighlightDirective} from './highlight/highlight.directive';
import {CashmereModule} from './cashmere.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [CommonModule],
    declarations: [MarkdownDirective, HighlightDirective, MarkdownContentComponent, SwatchDemoComponent],
    exports: [MarkdownDirective, HighlightDirective, SwatchDemoComponent, CommonModule, CashmereModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule {}
