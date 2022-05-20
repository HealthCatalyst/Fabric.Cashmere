import {NgModule} from '@angular/core';
import {ToasterOverviewExampleComponent} from './toaster-overview-example.component';
import {ToasterOverviewCustomComponent} from './toaster-overview-custom.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CashmereModule} from '../cashmere.module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule, CashmereModule, FormsModule, ReactiveFormsModule],
    declarations: [ToasterOverviewExampleComponent, ToasterOverviewCustomComponent],
    exports: [ToasterOverviewExampleComponent, ToasterOverviewCustomComponent]
})
export class ToasterOverviewExampleModule {}
