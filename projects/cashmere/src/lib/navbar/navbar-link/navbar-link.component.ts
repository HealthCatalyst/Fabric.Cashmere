import {ChangeDetectorRef, Component, ElementRef, HostBinding, Input} from '@angular/core';

/** Primary navigation links */
@Component({
    selector: 'hc-navbar-link',
    templateUrl: './navbar-link.component.html'
})
export class NavbarLinkComponent {
    @HostBinding('class') _hostClass = 'navbar-item';

    /** (optional) forces active state *Default is `null`.* */
    @Input() active?: boolean;

    /** RouterLink uri. See https://angular.io/api/router/RouterLink */
    @Input() uri: string;

    /** The text to display. This can also optionally be the contents within the element */
    @Input() linkText: string;

    /** Sets the RouterLinkActive options to match the url exactly to set active state. *Default is false.*
     * See https://angular.io/api/router/RouterLinkActive#description
     */
    @Input() exact: boolean = false;

    _hidden: boolean = false;

    constructor(private el: ElementRef, private ref: ChangeDetectorRef) {}

    /** Disable visibility of component from view */
    hide() {
        this._hidden = true;
        this.ref.detectChanges();
    }

    /** Enable visibility of component from view */
    show() {
        this._hidden = false;
        this.ref.detectChanges();
    }

    _getWidth() {
        return this.el.nativeElement.scrollWidth;
    }
}
