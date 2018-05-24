import {Directive, HostBinding} from '@angular/core';

@Directive({
    selector: '[hcInputIcon]'
})
export class InputIconDirective {
    @HostBinding('class.input-icon') hostClass = true;
}
