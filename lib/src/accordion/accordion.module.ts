import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion.component';
import { AccordionToolbarComponent } from './accordion-toolbar.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        AccordionComponent,
        AccordionToolbarComponent
    ],
    exports: [
        AccordionComponent,
        AccordionToolbarComponent
    ]
})
export class AccordionModule {
}
