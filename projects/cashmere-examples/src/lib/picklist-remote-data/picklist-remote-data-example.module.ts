import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CashmereModule} from '../cashmere.module';
import {PicklistRemoteDataExampleComponent} from './picklist-remote-data-example.component';
import {PicklistRemoteDataService} from './picklist-remote-data.service';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule, CashmereModule],
    declarations: [PicklistRemoteDataExampleComponent],
    entryComponents: [PicklistRemoteDataExampleComponent],
    exports: [PicklistRemoteDataExampleComponent],
    providers: [PicklistRemoteDataService]
})
export class PicklistRemoteDataExampleModule {}
