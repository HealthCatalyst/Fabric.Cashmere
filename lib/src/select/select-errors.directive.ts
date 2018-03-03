import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[hcSelectErrors]'
})
export class SelectErrorDirective {
    @HostBinding('class.select-errors') hostClass = true;
}
