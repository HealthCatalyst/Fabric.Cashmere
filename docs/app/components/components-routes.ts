import { TypeFormSurveyDemoComponent } from './typeform-survey/typeform-survey-demo.component';
import { TabDemoComponent } from './tabs/tab-demo.component';
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
import { ChipDemoComponent } from './chip/chip-demo.component';

export const routes: Routes = [
    {
        path: 'components',
        component: ComponentsComponent,
        children: [
            {
                path: 'accordion',
                component: AccordionDemoComponent
            },
            {
                path: 'button',
                component: ButtonDemoComponent,
                data: { title: 'Button' }
            },
            {
                path: 'select',
                component: SelectDemoComponent,
                data: { title: 'Select' }
            },
            {
                path: 'checkbox',
                component: CheckboxDemoComponent,
                data: { title: 'Checkbox' }
            },
            {
                path: 'radio-button',
                component: RadioButtonDemoComponent,
                data: { title: 'Radio Button' }
            },
            {
                path: 'icon',
                component: IconDemoComponent,
                data: { title: 'Icon' }
            },
            {
                path: 'drawer',
                component: DrawerDemoComponent,
                data: { title: 'Drawer' }
            },
            {
                path: 'tabs',
                component: TabsDemoComponent,
                data: { title: 'Tabs' },
                children: [
                    {
                        path: ':id',
                        component: TabDemoComponent
                    }
                ]
            },
            {
                path: 'navbar',
                component: NavbarDemoComponent,
                data: { title: 'Navbar' }
            },
            {
                path: 'popover',
                component: PopoverDemoComponent,
                data: { title: 'Popover' }
            },
            {
                path: 'subnav',
                component: SubnavDemoComponent,
                data: { title: 'Subnavbar' }
            },
            {
                path: 'breadcrumbs',
                component: BreadcrumbsDemoComponent,
                data: { breadcrumb: 'Home Page', title: 'Breadcrumbs' },
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
                component: ListDemoComponent,
                data: { title: 'List' }
            },
            {
                path: 'accordion',
                component: AccordionDemoComponent,
                data: { title: 'Accordion' }
            },
            {
                path: 'tile',
                component: TileDemoComponent,
                data: { title: 'Tile' }
            },
            {
                path: 'chip',
                component: ChipDemoComponent,
                data: { title: 'Chips' }
            },
            {
                path: 'typeform-survey',
                component: TypeFormSurveyDemoComponent,
                data: { title: 'Typeform Survey' }
            },
            {
                path: '**',
                redirectTo: 'accordion'
            }
        ]
    }
];
