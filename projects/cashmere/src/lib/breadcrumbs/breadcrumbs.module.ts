import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreadcrumbsComponent} from './breadcrumbs.component';
import {RouterModule} from '@angular/router';
import {IconModule} from '../icon/icon.module';

@NgModule({
    imports: [CommonModule, RouterModule, IconModule],
    exports: [BreadcrumbsComponent],
    declarations: [BreadcrumbsComponent]
})
export class BreadcrumbsModule {}
