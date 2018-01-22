import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { ButtonModule } from 'app/lib/button/button.module';
import { DemoComponent } from 'app/demo/demo.component';
import { SideNavComponent } from 'app/demo/side-nav/side-nav.component';
import { ButtonDemoComponent } from 'app/lib/button/button-demo/button-demo.component';
import { NavbarModule } from 'app/lib/navbar/navbar.module';
import { PopoverModule } from 'app/lib/popover/popover.module';
import { NavbarDemoComponent } from 'app/lib/navbar/navbar-demo/navbar-demo.component';
import { PopoverDemoComponent } from 'app/lib/popover/popover-demo/popover-demo.component';
import { routes } from './demo-routes';

@NgModule({
    imports: [
        BrowserModule,
        ButtonModule,
        NavbarModule,
        PopoverModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        ButtonModule,
        NavbarModule,
        PopoverModule
    ],
    declarations: [
        DemoComponent,
        SideNavComponent,
        ButtonDemoComponent,
        NavbarDemoComponent,
        PopoverDemoComponent,
    ]
})
export class DemoModule { }
