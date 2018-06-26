import {Directive, HostBinding} from '@angular/core';

/** Prepends an avatar styled element to the beginning of a `<hc-list-item>`. */
@Directive({
    selector: '[hcListAvatar]'
})
export class ListAvatarDirective {
    @HostBinding('class.hc-list-avatar')
    get hostClass(): boolean {
        return true;
    }
}
