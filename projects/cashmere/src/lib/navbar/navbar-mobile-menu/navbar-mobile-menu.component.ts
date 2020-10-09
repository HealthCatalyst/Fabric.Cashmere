import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewEncapsulation } from '@angular/core';

/** Navigation dropdown for small screen sizes */
@Component({
    selector: 'hc-navbar-mobile-menu',
    templateUrl: './navbar-mobile-menu.component.html',
    styleUrls: ['./navbar-mobile-menu.component.scss'],
    animations: [
        trigger('openClose', [
            state('open', style({
                top: '0'
            })),
            state('closed', style({
                top: '-100vh'
            })),
            transition('open <=> closed', [
                animate('0.7s ease')
            ])
        ])
    ],
    encapsulation: ViewEncapsulation.None
})
export class NavbarMobileMenuComponent {
    _openState = 'closed';

    /** Slide the mobile menu down from under the navbar */
    show(): void {
        this._openState = 'open';
    }

    /** Slide the mobile menu back up under the navbar */
    hide(): void {
        this._openState = 'closed';
    }
}
