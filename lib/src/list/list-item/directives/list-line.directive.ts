import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[hcListLine]'
})
export class ListLineDirective {
    @HostBinding('class.hc-list-line')
    get hostClass(): boolean {
        return true;
    }
}
