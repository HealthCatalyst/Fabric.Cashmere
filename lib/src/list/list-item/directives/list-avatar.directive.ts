import {Directive, HostBinding} from '@angular/core';

@Directive({
    selector: '[hcListAvatar]'
})
export class ListAvatarDirective {
    @HostBinding('class.hc-list-avatar')
    get hostClass(): boolean {
        return true;
    }
}
