import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CashmereModule} from '../cashmere.module';
import {Picklist2RemoteDataExampleComponent} from './picklist2-remote-data-example.component';
import {Picklist2RemoteDataService} from './picklist2-remote-data.service';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule, CashmereModule],
    declarations: [Picklist2RemoteDataExampleComponent],
    entryComponents: [Picklist2RemoteDataExampleComponent],
    exports: [Picklist2RemoteDataExampleComponent],
    providers: [Picklist2RemoteDataService]
})
export class Picklist2RemoteDataExampleModule {}
