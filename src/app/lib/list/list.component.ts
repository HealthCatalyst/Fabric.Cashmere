import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'hc-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ListComponent {
    @HostBinding('class.hc-list')
    get hostClass(): boolean {
        return true;
    }
}
