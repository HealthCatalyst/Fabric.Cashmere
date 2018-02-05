import { TabsDemoComponent } from './tabs/tabs-demo.component';
import { TabsModule } from '../../../lib/src/tabs/tabs.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from '../../../lib/src/button/button.module';
import { DemoComponent } from './demo.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ButtonDemoComponent } from './button/button-demo.component';
import { ColorDemoComponent } from './color/color-demo.component';
import { TableDemoComponent } from './table/table-demo.component';
import { SwatchDemoComponent } from './color/swatch-demo.component';
import { routes } from './demo-routes';
import { NavbarModule } from '../../../lib/src/navbar/navbar.module';
import { PopoverModule } from '../../../lib/src/popover/popover.module';
import { NavbarDemoComponent } from './navbar/navbar-demo.component';
import { PopoverDemoComponent } from './popover/popover-demo.component';
import { CheckboxDemoComponent } from './checkbox/checkbox-demo.component';
import { CheckboxModule } from '../../../lib/src/checkbox/checkbox.module';
import { RadioButtonModule } from '../../../lib/src/radio-button/radio-button.module';
import { ListModule } from '../../../lib/src/list/list.module';
import { RadioButtonDemoComponent } from './radio-button/radio-button-demo.component';
import { SelectModule } from '../../../lib/src/select/select.module';
import { SelectDemoComponent } from './select/select-demo.component';
import { AppSwitcherModule } from '../../../lib/src/app-switcher/app-switcher.module';
import { MockAppSwitcherService } from '../../../lib/src/app-switcher/app-switcher.service';
import { SelectComponent } from '../../../lib/src/select/select.component';
import { DrawerDemoComponent } from './drawer/drawer-demo.component';
import { IconModule } from '../../../lib/src/icon';
import { DrawerModule } from '../../../lib/src/drawer';
import { HomeComponent } from '../home/home.component';
import { IconDemoComponent } from './icon/icon-demo.component';
import { ListDemoComponent } from './list/list-demo.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        ButtonModule,
        NavbarModule,
        PopoverModule,
        FormsModule,
        CheckboxModule,
        RadioButtonModule,
        AppSwitcherModule,
        IconModule,
        DrawerModule,
        TabsModule,
        SelectModule,
        ListModule,
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
        RadioButtonDemoComponent,
        ColorDemoComponent,
        TableDemoComponent,
        SwatchDemoComponent,
        SelectDemoComponent,
        DrawerDemoComponent,
        TabsDemoComponent,
        IconDemoComponent,
        ListDemoComponent
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
