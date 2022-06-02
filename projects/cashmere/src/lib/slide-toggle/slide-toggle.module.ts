import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SlideToggleComponent} from './slide-toggle.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [SlideToggleComponent],
    declarations: [SlideToggleComponent]
})
export class SlideToggleModule {}
