import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonToggleGroupComponent } from './button-toggle-group.component';
import { ButtonToggleComponent } from './button-toggle.component';


@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [ButtonToggleComponent, ButtonToggleGroupComponent],
    exports: [ButtonToggleComponent, ButtonToggleGroupComponent],
    providers: [ButtonToggleGroupComponent]
})
export class ButtonToggleModule {}
