import { Routes } from '@angular/router';
import { ColorDemoComponent } from 'app/lib/color-demo/color-demo.component';
import { ButtonDemoComponent } from 'app/lib/button/button-demo/button-demo.component';
import { TableDemoComponent } from 'app/lib/table-demo/table-demo.component';
import { SelectDemoComponent } from 'app/lib/select/select-demo/select-demo.component';
import { DemoComponent } from 'app/demo/demo.component';
import { NavbarDemoComponent } from 'app/lib/navbar/navbar-demo/navbar-demo.component';
import { PopoverDemoComponent } from 'app/lib/popover/popover-demo/popover-demo.component';
import { CheckboxDemoComponent } from 'app/lib/checkbox/checkbox-demo/checkbox-demo.component';
import { IconDemoComponent } from 'app/lib/icon/icon-demo/icon-demo.component';
import { TabsDemoComponent } from 'app/lib/tabs/tabs-demo/tabs-demo.component';
import { DrawerDemoComponent } from '../lib/drawer/drawer-demo/drawer-demo.component';

export const routes: Routes = [
    {
        path: 'demo',
        component: DemoComponent,
        children: [
            {
                path: 'color',
                component: ColorDemoComponent
            },
            {
              path: 'table',
              component: TableDemoComponent
            },
            {
                path: 'button',
                component: ButtonDemoComponent
            },
            {
                path: 'select',
                component: SelectDemoComponent
            },
            {
                path: 'checkbox',
                component: CheckboxDemoComponent
            },
            {
              path: 'icon',
              component: IconDemoComponent
            },
            {
              path: 'drawer',
              component: DrawerDemoComponent
            },
            {
              path: 'tabs',
              component: TabsDemoComponent
            },
            {
                path: 'navbar',
                component: NavbarDemoComponent
            },
            {
                path: 'popover',
                component: PopoverDemoComponent
            },
            {
                path: '**',
                redirectTo: 'color'
            }
        ]
    }
];
