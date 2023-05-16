import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizableComponent } from './resizable.component';
import { ResizableStaticDirective } from './resizable-static.directive';
import { ResizableContainerDirective } from './resizable-container.directive';

@NgModule({
    imports: [CommonModule],
    exports: [ResizableComponent, ResizableStaticDirective, ResizableContainerDirective],
    declarations: [ResizableComponent, ResizableStaticDirective, ResizableContainerDirective]
})
export class ResizableModule {}
