import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Picklist2Component } from './picklist2.component';
import { PickOptionComponent } from './pick-option.component';
import { PickPaneComponent } from './pane/pick-pane.component';
import { SELECTION_MODEL_FACTORY } from './pick.types';
import {
    PickPaneFooterTemplateDirective,
    PickPaneToolbarTemplateDirective,
    PickOptgroupTemplateDirective,
    PickOptionTemplateDirective,
    PickPaneHeaderLeftTemplateDirective,
    PickPaneHeaderRightTemplateDirective,
    PickCustomItemTemplateDirective,
    PickItemLabelDirective
} from './pick-templates.directive';
import { DefaultSelectionModelFactory } from './pane/selection-model';
import { PickPaneListComponent } from './pane/pick-pane-list.component';

@NgModule({
    declarations: [
        PickPaneComponent,
        Picklist2Component,
        PickOptionComponent,
        PickOptgroupTemplateDirective,
        PickOptionTemplateDirective,
        PickPaneHeaderLeftTemplateDirective,
        PickPaneHeaderRightTemplateDirective,
        PickPaneToolbarTemplateDirective,
        PickPaneFooterTemplateDirective,
        PickCustomItemTemplateDirective,
        PickPaneListComponent,
        PickItemLabelDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        PickPaneComponent,
        Picklist2Component,
        PickOptionComponent,
        PickOptgroupTemplateDirective,
        PickOptionTemplateDirective,
        PickPaneHeaderLeftTemplateDirective,
        PickPaneHeaderRightTemplateDirective,
        PickPaneToolbarTemplateDirective,
        PickPaneFooterTemplateDirective,
        PickCustomItemTemplateDirective,
        PickPaneListComponent,
        PickItemLabelDirective
    ],
    providers: [
        { provide: SELECTION_MODEL_FACTORY, useValue: DefaultSelectionModelFactory }
    ]
})
export class Picklist2Module {}
