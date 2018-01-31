import { TabsDemoComponent } from 'app/lib/tabs/tabs-demo/tabs-demo.component';
import { TabsModule } from 'app/lib/tabs/tabs.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'app/lib/button/button.module';
import { DemoComponent } from 'app/demo/demo.component';
import { SideNavComponent } from 'app/demo/side-nav/side-nav.component';
import { ButtonDemoComponent } from 'app/lib/button/button-demo/button-demo.component';
import { ColorDemoComponent } from 'app/lib/color-demo/color-demo.component';
import { TableDemoComponent } from 'app/lib/table-demo/table-demo.component';
import { SwatchDemoComponent } from 'app/lib/color-demo/swatch-demo.component';
import { routes } from './demo-routes';
import { NavbarModule } from 'app/lib/navbar/navbar.module';
import { PopoverModule } from 'app/lib/popover/popover.module';
import { NavbarDemoComponent } from 'app/lib/navbar/navbar-demo/navbar-demo.component';
import { PopoverDemoComponent } from 'app/lib/popover/popover-demo/popover-demo.component';
import { CheckboxDemoComponent } from 'app/lib/checkbox/checkbox-demo/checkbox-demo.component';
import { CheckboxModule } from 'app/lib/checkbox/checkbox.module';
import { SelectModule } from 'app/lib/select/select.module';
import { SelectDemoComponent } from 'app/lib/select/select-demo/select-demo.component';
import { AppSwitcherModule } from 'app/lib/app-switcher/app-switcher.module';
import { MockAppSwitcherService } from 'app/lib/app-switcher/app-switcher.service';
import { SelectComponent } from 'app/lib/select/select.component';
import { DrawerDemoComponent } from 'app/lib/drawer/drawer-demo/drawer-demo.component';
import { IconModule } from 'app/lib/icon';
import { DrawerModule } from 'app/lib/drawer';
import { HomeComponent } from 'app/home/home.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        ButtonModule,
        NavbarModule,
        PopoverModule,
        FormsModule,
        CheckboxModule,
        AppSwitcherModule,
        IconModule,
        DrawerModule,
        TabsModule,
        SelectModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        NavbarModule,
        AppSwitcherModule,
    ],
    declarations: [
        DemoComponent,
        HomeComponent,
        SideNavComponent,
        ButtonDemoComponent,
        NavbarDemoComponent,
        PopoverDemoComponent,
        CheckboxDemoComponent,
        ColorDemoComponent,
        TableDemoComponent,
        SwatchDemoComponent,
        SelectDemoComponent,
        DrawerDemoComponent,
        TabsDemoComponent
    ],
    providers: [
        {
            provide: 'IAppSwitcherService',
            useClass: MockAppSwitcherService
        }
    ]
})
export class DemoModule {
}
