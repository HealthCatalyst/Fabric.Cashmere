import {SubModalDemoComponent} from './modal/sub-modal-demo.component';
import {ModalDemoComponent} from './modal/modal-demo.component';
import {ModalModule} from '../../../lib/src/modal/modal.module';
import {TypeformSurveyModule} from '../../../lib/src/typeform-survey/typeform-survey.module';
import {TypeFormSurveyDemoComponent} from './typeform-survey/typeform-survey-demo.component';
import {TabsDemoComponent} from './tabs/tabs-demo.component';
import {TabDemoComponent} from './tabs/tab-demo.component';
import {TabsModule} from '../../../lib/src/tabs/tabs.module';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from '../../../lib/src/button/button.module';
import {ComponentsComponent} from './components.component';
import {ButtonDemoComponent} from './button/button-demo.component';
import {NavbarModule} from '../../../lib/src/navbar/navbar.module';
import {PicklistModule} from '../../../lib/src/picklist/picklist.module';
import {PopoverModule} from '../../../lib/src/popover/popover.module';
import {NavbarDemoComponent} from './navbar/navbar-demo.component';
import {PicklistDemoComponent} from './picklist/picklist-demo.component';
import {PopoverDemoComponent} from './popover/popover-demo.component';
import {CheckboxDemoComponent} from './checkbox/checkbox-demo.component';
import {CheckboxModule} from '../../../lib/src/checkbox/checkbox.module';
import {RadioButtonModule} from '../../../lib/src/radio-button/radio-button.module';
import {ProgressIndicatorsModule} from '../../../lib/src/progress-indicators/progress-indicators.module';
import {ListModule} from '../../../lib/src/list/list.module';
import {RadioButtonDemoComponent} from './radio-button/radio-button-demo.component';
import {SelectModule} from '../../../lib/src/select/select.module';
import {SelectDemoComponent} from './select/select-demo.component';
import {AppSwitcherModule} from '../../../lib/src/app-switcher/app-switcher.module';
import {MockAppSwitcherService} from '../../../lib/src/app-switcher/app-switcher.service';
import {DrawerDemoComponent} from './drawer/drawer-demo.component';
import {IconModule} from '../../../lib/src/icon/icon.module';
import {DrawerModule} from '../../../lib/src/drawer/drawer.module';
import {HomeComponent} from '../home/home.component';
import {IconDemoComponent} from './icon/icon-demo.component';
import {ListDemoComponent} from './list/list-demo.component';
import {SubnavModule} from '../../../lib/src/subnav/subnav.module';
import {SubnavDemoComponent} from './subnav/subnav-demo.component';
import {AccordionModule} from '../../../lib/src/accordion/accordion.module';
import {AccordionDemoComponent} from './accordion/accordion-demo.component';
import {BreadcrumbsModule} from '../../../lib/src/breadcrumbs/breadcrumbs.module';
import {BreadcrumbsDemoComponent} from './breadcrumbs/breadcrumbs-demo.component';
import {Breadcrumb1DemoComponent} from './breadcrumbs/breadcrumbs1-demo.component';
import {Breadcrumb2DemoComponent} from './breadcrumbs/breadcrumbs2-demo.component';
import {TileModule} from '../../../lib/src/tile/tile.module';
import {TileDemoComponent} from './tile/tile-demo.component';
import {ChipModule} from '../../../lib/src/chip/chip.module';
import {FilterButtonComponent} from './chip/filter-button.component';
import {ChipDemoComponent} from './chip/chip-demo.component';
import {InputModule} from '../../../lib/src/input/input.module';
import {InputDemoComponent} from './input/input-demo.component';
import {LabelModule} from '../../../lib/src/label/label.module';
import {ProgressIndicatorDemoComponent} from './progress-indicator/progress-indicator-demo.component';
import {SharedModule} from '../shared/shared.module';
import {PaginationModule} from '../../../lib/src/pagination/pagination.module';
import {PaginationDemoComponent} from './pagination/pagination-demo.component';
import {ComponentsRoutesModule} from './components-routes.module';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        NavbarModule,
        PicklistModule,
        PopoverModule,
        FormsModule,
        ReactiveFormsModule,
        CheckboxModule,
        RadioButtonModule,
        ProgressIndicatorsModule,
        AppSwitcherModule,
        ModalModule,
        IconModule,
        DrawerModule,
        TabsModule,
        SelectModule,
        ListModule,
        SubnavModule,
        BreadcrumbsModule,
        AccordionModule,
        TypeformSurveyModule,
        TileModule,
        ChipModule,
        InputModule,
        LabelModule,
        PaginationModule,
        SharedModule,
        ComponentsRoutesModule
    ],
    exports: [NavbarModule, AppSwitcherModule],
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
