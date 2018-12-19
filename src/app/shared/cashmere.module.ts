import {NgModule} from '@angular/core';
import {
    AccordionModule,
    AppSwitcherModule,
    BreadcrumbsModule,
    ButtonModule,
    CheckboxModule,
    ChipModule,
    DrawerModule,
    FormFieldModule,
    IconModule,
    InputModule,
    ListModule,
    ModalModule,
    NavbarModule,
    PaginationModule,
    PicklistModule,
    PopoverModule,
    ProgressIndicatorsModule,
    RadioButtonModule,
    SelectModule,
    SubnavModule,
    TabsModule,
    TileModule,
    ToasterModule,
    TypeformSurveyModule
} from '@wcf-insurance/cashmere';
import {AppSwitcherServiceModule} from './app-switcher-service.module';

@NgModule({
    exports: [
        AccordionModule,
        AppSwitcherModule,
        AppSwitcherServiceModule,
        BreadcrumbsModule,
        ButtonModule,
        CheckboxModule,
        ChipModule,
        DrawerModule,
        FormFieldModule,
        IconModule,
        InputModule,
        ListModule,
        ModalModule,
        NavbarModule,
        PaginationModule,
        PicklistModule,
        PopoverModule,
        ProgressIndicatorsModule,
        RadioButtonModule,
        SelectModule,
        SubnavModule,
        TabsModule,
        TileModule,
        ToasterModule,
        TypeformSurveyModule
    ]
})
export class CashmereModule {
}
