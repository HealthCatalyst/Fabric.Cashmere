import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[hcSelectRequired]'
})
export class SelectRequiredDirective {
    @HostBinding('class.select-required') hostClass = true;
}
