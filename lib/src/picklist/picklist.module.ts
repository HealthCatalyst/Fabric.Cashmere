import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PicklistPaneComponent } from './pane/picklist-pane.component';
import { PicklistComponent } from './picklist.component';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { InputModule } from '../input/input.module';

@NgModule({
    imports: [CommonModule, FormsModule, ButtonModule, IconModule, InputModule],
    declarations: [
        PicklistPaneComponent,
        PicklistComponent
    ],
    exports: [
        PicklistPaneComponent,
        PicklistComponent
    ]
})
export class PickListModule {
}
