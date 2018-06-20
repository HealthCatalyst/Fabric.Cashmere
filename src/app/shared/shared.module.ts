import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarkdownDirective} from './markdown/markdown.directive';
import {CashmereModule} from './cashmere.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DocumentViewerComponent} from './document-viewer/document-viewer.component';

@NgModule({
    imports: [CommonModule],
    declarations: [MarkdownDirective, DocumentViewerComponent],
    exports: [MarkdownDirective, DocumentViewerComponent, CommonModule, CashmereModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule {}
