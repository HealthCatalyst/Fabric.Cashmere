import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarkdownDirective} from './markdown/markdown.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [MarkdownDirective],
    exports: [MarkdownDirective]
})
export class SharedModule {}
