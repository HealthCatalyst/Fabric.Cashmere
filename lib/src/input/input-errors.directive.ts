import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[hcInputErrors]'
})
export class InputErrorDirective {
    @HostBinding('class.input-errors') hostClass = true;
}
