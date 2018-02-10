import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        BreadcrumbsComponent
    ],
    declarations: [
        BreadcrumbsComponent
    ]
})
export class BreadcrumbsModule {
}
