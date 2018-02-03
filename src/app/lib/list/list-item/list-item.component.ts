import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'hc-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ListItemComponent {
    @HostBinding('class.hc-list-item')
    get hostClass(): boolean {
        return true;
    }
}
