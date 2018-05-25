import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ComponentsRoutesModule} from './components-routes.module';
import {SubModalDemoComponent} from './modal/sub-modal-demo.component';
import {ModalDemoComponent} from './modal/modal-demo.component';
import {TypeFormSurveyDemoComponent} from './typeform-survey/typeform-survey-demo.component';
import {TabsDemoComponent} from './tabs/tabs-demo.component';
import {TabDemoComponent} from './tabs/tab-demo.component';
import {ComponentsComponent} from './components.component';
import {ButtonDemoComponent} from './button/button-demo.component';
import {NavbarDemoComponent} from './navbar/navbar-demo.component';
import {PicklistDemoComponent} from './picklist/picklist-demo.component';
import {PopoverDemoComponent} from './popover/popover-demo.component';
import {CheckboxDemoComponent} from './checkbox/checkbox-demo.component';
import {RadioButtonDemoComponent} from './radio-button/radio-button-demo.component';
import {SelectDemoComponent} from './select/select-demo.component';
import {MockAppSwitcherService} from '../../../projects/cashmere/src/lib/app-switcher/app-switcher.service';
import {DrawerDemoComponent} from './drawer/drawer-demo.component';
import {HomeComponent} from '../home/home.component';
import {IconDemoComponent} from './icon/icon-demo.component';
import {ListDemoComponent} from './list/list-demo.component';
import {SubnavDemoComponent} from './subnav/subnav-demo.component';
import {AccordionDemoComponent} from './accordion/accordion-demo.component';
import {BreadcrumbsDemoComponent} from './breadcrumbs/breadcrumbs-demo.component';
import {Breadcrumb1DemoComponent} from './breadcrumbs/breadcrumbs1-demo.component';
import {Breadcrumb2DemoComponent} from './breadcrumbs/breadcrumbs2-demo.component';
import {TileDemoComponent} from './tile/tile-demo.component';
import {FilterButtonComponent} from './chip/filter-button.component';
import {ChipDemoComponent} from './chip/chip-demo.component';
import {InputDemoComponent} from './input/input-demo.component';
import {ProgressIndicatorDemoComponent} from './progress-indicator/progress-indicator-demo.component';
import {PaginationDemoComponent} from './pagination/pagination-demo.component';

@NgModule({
    imports: [SharedModule, ComponentsRoutesModule],
    declarations: [
        ComponentsComponent,
        HomeComponent,
        ButtonDemoComponent,
        NavbarDemoComponent,
        PicklistDemoComponent,
        PopoverDemoComponent,
        CheckboxDemoComponent,
        RadioButtonDemoComponent,
        SelectDemoComponent,
        DrawerDemoComponent,
        TabsDemoComponent,
        TabDemoComponent,
        IconDemoComponent,
        ListDemoComponent,
        ModalDemoComponent,
        SubnavDemoComponent,
        AccordionDemoComponent,
        SubnavDemoComponent,
        SubModalDemoComponent,
        BreadcrumbsDemoComponent,
        Breadcrumb1DemoComponent,
        Breadcrumb2DemoComponent,
        TileDemoComponent,
        ChipDemoComponent,
        ProgressIndicatorDemoComponent,
        FilterButtonComponent,
        TypeFormSurveyDemoComponent,
        InputDemoComponent,
        ModalDemoComponent,
        PaginationDemoComponent
    ],
    providers: [
        {
            provide: 'IAppSwitcherService',
            useClass: MockAppSwitcherService
        }
    ],
    entryComponents: [SubModalDemoComponent]
})
export class ComponentsModule {}
