import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonToggleGroupComponent } from './button-toggle-group.component';
import { ButtonToggleComponent } from './button-toggle.component';

@NgModule({
    imports: [CommonModule],
    declarations:  [ButtonToggleComponent, ButtonToggleGroupComponent],
    exports: [ButtonToggleComponent, ButtonToggleGroupComponent]
})
export class ButtonToggleModule {}
