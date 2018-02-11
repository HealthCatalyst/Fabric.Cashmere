import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubnavComponent } from './subnav.component';
import { SubnavRightDirective } from './subnav-right.directive';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        SubnavComponent,
        SubnavRightDirective
    ],
    declarations: [
        SubnavComponent,
        SubnavRightDirective
    ]
})
export class SubnavModule {
}
