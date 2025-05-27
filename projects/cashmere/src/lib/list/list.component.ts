import {Component, HostBinding, ViewEncapsulation} from '@angular/core';

/** Parent component that can house multiple `<hc-list-item>` and applies Cashmere list styling */
@Component({
    selector: 'hc-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class ListComponent {
    @HostBinding('class.hc-list')
    _hostClass = true;
}
