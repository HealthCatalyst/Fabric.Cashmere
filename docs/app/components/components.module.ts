import { TabsDemoComponent } from './tabs/tabs-demo.component';
import { Tab3DemoComponent } from './tabs/tab3-demo.component';
import { Tab2DemoComponent } from './tabs/tab2-demo.component';
import { Tab1DemoComponent } from './tabs/tab1-demo.component';
import { TabsModule } from '../../../lib/src/tabs/tabs.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from '../../../lib/src/button/button.module';
import { ComponentsComponent } from './components.component';
import { ButtonDemoComponent } from './button/button-demo.component';
import { routes } from './components-routes';
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
import { SubnavModule } from '../../../lib/src/subnav/subnav.module';
import { SubnavDemoComponent } from './subnav/subnav-demo.component';
import { BreadcrumbsModule } from '../../../lib/src/breadcrumbs/breadcrumbs.module';
import { BreadcrumbsDemoComponent } from './breadcrumbs/breadcrumbs-demo.component';
import { Breadcrumb1DemoComponent } from './breadcrumbs/breadcrumbs1-demo.component';
import { Breadcrumb2DemoComponent } from './breadcrumbs/breadcrumbs2-demo.component';

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
        SubnavModule,
        BreadcrumbsModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        NavbarModule,
        AppSwitcherModule,
    ],
    declarations: [
        ComponentsComponent,
        HomeComponent,
        ButtonDemoComponent,
        NavbarDemoComponent,
        PopoverDemoComponent,
        CheckboxDemoComponent,
        RadioButtonDemoComponent,
        SelectDemoComponent,
        DrawerDemoComponent,
        TabsDemoComponent,
        Tab1DemoComponent,
        Tab2DemoComponent,
        Tab3DemoComponent,
        IconDemoComponent,
        ListDemoComponent,
        SubnavDemoComponent,
        BreadcrumbsDemoComponent,
        Breadcrumb1DemoComponent,
        Breadcrumb2DemoComponent
    ],
    providers: [
        {
            provide: 'IAppSwitcherService',
            useClass: MockAppSwitcherService
        }
    ]
})
export class ComponentsModule {
}
