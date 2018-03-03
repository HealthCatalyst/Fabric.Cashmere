import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[hcInputRequired]'
})
export class InputRequiredDirective {
    @HostBinding('class.label-required') hostClass = true;
}
