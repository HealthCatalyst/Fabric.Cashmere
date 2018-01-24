import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'app/lib/button/button.module';
import { DemoComponent } from 'app/demo/demo.component';
import { SideNavComponent } from 'app/demo/side-nav/side-nav.component';
import { ButtonDemoComponent } from 'app/lib/button/button-demo/button-demo.component';
import { routes } from './demo-routes';
import { NavbarModule } from 'app/lib/navbar/navbar.module';
import { PopoverModule } from 'app/lib/popover/popover.module';
import { NavbarDemoComponent } from 'app/lib/navbar/navbar-demo/navbar-demo.component';
import { PopoverDemoComponent } from 'app/lib/popover/popover-demo/popover-demo.component';
import { SelectComponent } from 'app/lib/select/select.component';
import { SelectDemoComponent } from 'app/lib/select/select-demo/select-demo.component';

@NgModule({
    imports: [
        BrowserModule,
        ButtonModule,
        NavbarModule,
        PopoverModule,
        FormsModule,
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
        SelectComponent,
        SelectDemoComponent
    ]
})
export class DemoModule { }
