import { VerticalTabsDemoComponent } from 'app/lib/vertical-tabs/vertical-tabs-demo/vertical-tabs-demo.component';
import { VerticalTabsModule } from 'app/lib/vertical-tabs/vertical-tabs.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'app/lib/button/button.module';
import { DemoComponent } from 'app/demo/demo.component';
import { SideNavComponent } from 'app/demo/side-nav/side-nav.component';
import { ButtonDemoComponent } from 'app/lib/button/button-demo/button-demo.component';
import { ColorDemoComponent } from 'app/lib/color-demo/color-demo.component';
import { TableDemoComponent } from 'app/lib/table-demo/table-demo.component';
import { SwatchDemoComponent } from 'app/lib/color-demo/swatch-demo.component';
import { routes } from './demo-routes';
import { CheckboxDemoComponent } from 'app/lib/checkbox/checkbox-demo/checkbox-demo.component';
import { CheckboxModule } from 'app/lib/checkbox/checkbox.module';
import { SelectModule } from 'app/lib/select/select.module';
import { SelectDemoComponent } from 'app/lib/select/select-demo/select-demo.component';
import { IconModule } from '../lib/icon';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from 'app/home/home.component';
import { DrawerDemoComponent } from '../lib/drawer/drawer-demo/drawer-demo.component';
import { DrawerModule } from '../lib/drawer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    IconModule,
    DrawerModule,
    VerticalTabsModule,
    SelectModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    DemoComponent,
    HomeComponent,
    SideNavComponent,
    ButtonDemoComponent,
    CheckboxDemoComponent,
    ColorDemoComponent,
    SwatchDemoComponent,
    TableDemoComponent,
    SelectDemoComponent,
    DrawerDemoComponent,
    VerticalTabsDemoComponent
  ]
})
export class DemoModule {
}
