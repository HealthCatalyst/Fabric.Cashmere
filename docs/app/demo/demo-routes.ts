import { Tab3DemoComponent } from './tabs/tab3-demo.component';
import { Tab2DemoComponent } from './tabs/tab2-demo.component';
import { Tab1DemoComponent } from './tabs/tab1-demo.component';
import { Routes } from '@angular/router';
import { ColorDemoComponent } from './color/color-demo.component';
import { ButtonDemoComponent } from './button/button-demo.component';
import { TableDemoComponent } from './table/table-demo.component';
import { SelectDemoComponent } from './select/select-demo.component';
import { DemoComponent } from './demo.component';
import { NavbarDemoComponent } from './navbar/navbar-demo.component';
import { PopoverDemoComponent } from './popover/popover-demo.component';
import { CheckboxDemoComponent } from './checkbox/checkbox-demo.component';
import { RadioButtonDemoComponent } from './radio-button/radio-button-demo.component';
import { IconDemoComponent } from './icon/icon-demo.component';
import { TabsDemoComponent } from './tabs/tabs-demo.component';
import { DrawerDemoComponent } from './drawer/drawer-demo.component';
import { ListDemoComponent } from './list/list-demo.component';
import { SubnavDemoComponent } from './subnav/subnav-demo.component';
import { TypographyDemoComponent } from './typography/typography-demo.component';

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
                path: 'typography',
                component: TypographyDemoComponent
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
                path: 'radio-button',
                component: RadioButtonDemoComponent
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
                component: TabsDemoComponent,
                children: [
                    {
                        path: 'tab1',
                        component: Tab1DemoComponent
                    },
                    {
                        path: 'tab2',
                        component: Tab2DemoComponent
                    },
                    {
                        path: 'tab3',
                        component: Tab3DemoComponent
                    }
                ]
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
                path: 'subnav',
                component: SubnavDemoComponent
            },
            {
                path: 'list',
                component: ListDemoComponent
            },
            {
                path: '**',
                redirectTo: 'color'
            }
        ]
    }
];
