import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PicklistComponent } from './picklist.component';
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
import {ButtonModule} from '../button/button.module';
import {InputModule} from '../input/input.module';
import {FormFieldModule} from '../form-field/hc-form-field.module';
import {ProgressIndicatorsModule} from '../progress-indicators/progress-indicators.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        PickPaneComponent,
        PicklistComponent,
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
        CommonModule,
        FormsModule,
        ButtonModule,
        InputModule,
        FormFieldModule,
        ProgressIndicatorsModule
    ],
    exports: [
        PickPaneComponent,
        PicklistComponent,
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
export class PicklistModule {}
