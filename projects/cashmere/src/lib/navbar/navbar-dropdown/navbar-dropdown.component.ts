import { ChangeDetectorRef, Component, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';

/** Primary navigation links */
@Component({
    selector: 'hc-navbar-dropdown',
    templateUrl: './navbar-dropdown.component.html',
    styleUrls: ['./navbar-dropdown.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarDropdownComponent {
    // TODO:
    // do we need the active?
    // do we need our own styling?


    /** (optional) forces active state *Default is `null`.* */
    @Input()
    active?: boolean = false;

    /** The text to display. This can also optionally be the contents within the element */
    @Input()
    dropdownTitle: string;

    // /** Sets the RouterLinkActive options to match the url exactly to set active state. *Default is false.*
    //  * See https://angular.io/api/router/RouterLinkActive#description
    //  */
    // @Input()
    // exact: boolean = false;

    _hidden: boolean = false;

    constructor(private el: ElementRef, private ref: ChangeDetectorRef) { }

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
