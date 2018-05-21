import {Directive, HostBinding} from '@angular/core';

@Directive({
    selector: '[hcListIcon]'
})
export class ListIconDirective {
    @HostBinding('class.hc-list-icon')
    get hostClass(): boolean {
        return true;
    }
}
