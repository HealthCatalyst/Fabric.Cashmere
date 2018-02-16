import { Tab3DemoComponent } from './tabs/tab3-demo.component';
import { Tab2DemoComponent } from './tabs/tab2-demo.component';
import { Tab1DemoComponent } from './tabs/tab1-demo.component';
import { Routes } from '@angular/router';
import { ButtonDemoComponent } from './button/button-demo.component';
import { SelectDemoComponent } from './select/select-demo.component';
import { ComponentsComponent } from './components.component';
import { NavbarDemoComponent } from './navbar/navbar-demo.component';
import { PopoverDemoComponent } from './popover/popover-demo.component';
import { CheckboxDemoComponent } from './checkbox/checkbox-demo.component';
import { RadioButtonDemoComponent } from './radio-button/radio-button-demo.component';
import { IconDemoComponent } from './icon/icon-demo.component';
import { TabsDemoComponent } from './tabs/tabs-demo.component';
import { DrawerDemoComponent } from './drawer/drawer-demo.component';
import { ListDemoComponent } from './list/list-demo.component';
import { SubnavDemoComponent } from './subnav/subnav-demo.component';
import { AccordionDemoComponent } from './accordion/accordion-demo.component';
import { BreadcrumbsDemoComponent } from './breadcrumbs/breadcrumbs-demo.component';
import { Breadcrumb1DemoComponent } from './breadcrumbs/breadcrumbs1-demo.component';
import { Breadcrumb2DemoComponent } from './breadcrumbs/breadcrumbs2-demo.component';
import { TileDemoComponent } from './tile/tile-demo.component'

export const routes: Routes = [
    {
        path: 'components',
        component: ComponentsComponent,
        children: [
            {
                path: 'button',
                component: ButtonDemoComponent,
                children: [
                    {
                        path: 'breadcrumb1',
                        component: Breadcrumb1DemoComponent,
                    }
                ]
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
                path: 'breadcrumbs',
                component: BreadcrumbsDemoComponent,
                data: { breadcrumb: 'Home Page' },
                children: [
                    {
                        path: 'breadcrumb1',
                        component: Breadcrumb1DemoComponent,
                        data: { breadcrumb: 'Second Page' },
                        children: [
                            {
                                path: 'breadcrumb2',
                                component: Breadcrumb2DemoComponent,
                                data: { breadcrumb: 'Third Page' }
                            }
                        ]
                    }
                ]
            },
            {
                path: 'list',
                component: ListDemoComponent
            },
            {
                path: 'accordion',
                component: AccordionDemoComponent
            },
            {
                path: 'tile',
                component: TileDemoComponent
            },
            {
                path: '**',
                redirectTo: 'accordion'
            }
        ]
    }
];
