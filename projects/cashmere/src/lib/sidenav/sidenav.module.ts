import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav.component';
import { ProgressIndicatorsModule } from '../progress-indicators';
import { ButtonModule } from '../button';
import { PopModule } from '../pop';
import { SidenavHeaderDirective } from './sidenav-header.directive';

@NgModule({
    imports: [CommonModule, ProgressIndicatorsModule, ButtonModule, PopModule, RouterModule],
    exports: [SidenavComponent, SidenavHeaderDirective],
    declarations: [SidenavComponent, SidenavHeaderDirective]
})
export class SidenavModule {}
