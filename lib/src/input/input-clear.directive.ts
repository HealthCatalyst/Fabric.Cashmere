import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[hcInputClearable]'
})
export class InputClearDirective {
    @HostBinding('class.input-clearable') hostClass = true;
}