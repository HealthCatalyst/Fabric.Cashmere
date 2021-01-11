import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PicklistPaneComponent} from './pane/picklist-pane.component';
import {PicklistOldComponent} from './picklist-old.component';
import {ButtonModule} from '../button/button.module';
import {IconModule} from '../icon/icon.module';
import {InputModule} from '../input/input.module';
import {FormFieldModule} from '../form-field/hc-form-field.module';
import {ProgressIndicatorsModule} from '../progress-indicators/progress-indicators.module';

export {PicklistPaneComponent} from './pane/picklist-pane.component';
export {PicklistOldComponent} from './picklist-old.component';
export {
    IPicklistSettings,
    IValueOption,
    IValueSetOption,
    IPicklistOptions,
    IPicklistOptionsSource,
    PicklistRemoteQueryOptions,
    IPicklistRemoteQueryResponse,
    IPageSettings,
    IPagedCollection
} from './picklist-old.model';

@NgModule({
    imports: [CommonModule, FormsModule, ButtonModule, IconModule, InputModule, FormFieldModule, ProgressIndicatorsModule],
    declarations: [PicklistPaneComponent, PicklistOldComponent],
    exports: [PicklistPaneComponent, PicklistOldComponent]
})
export class PicklistOldModule {}
