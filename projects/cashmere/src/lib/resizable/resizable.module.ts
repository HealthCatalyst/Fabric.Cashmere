import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResizableComponent} from './resizable.component';

@NgModule({
    imports: [CommonModule],
    exports: [ResizableComponent],
    declarations: [ResizableComponent]
})
export class ResizableModule {}
