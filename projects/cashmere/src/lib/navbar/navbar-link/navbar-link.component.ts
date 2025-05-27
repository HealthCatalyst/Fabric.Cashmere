import {ChangeDetectorRef, Component, ElementRef, Input, ViewEncapsulation} from '@angular/core';
import {parseBooleanAttribute} from '../../util';

/** Primary navigation links */
@Component({
    selector: 'hc-navbar-link',
    templateUrl: './navbar-link.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class NavbarLinkComponent {
    _active: boolean | null;

    /** Forces active state. Overrides router state when set; to remove the override set to null. *Default is `null`.* */
    @Input()
    get active(): boolean | null {
        return this._active;
    }
    set active(value: boolean | null) {
        this._active = value !== null ? parseBooleanAttribute(value): null;
    }

    /** RouterLink uri. See https://angular.io/api/router/RouterLink */
    @Input()
    uri: string;

    /** The text to display. This can also optionally be the contents within the element */
    @Input()
    linkText: string;

    /** Sets the RouterLinkActive options to match the url exactly to set active state. *Default is false.*
     * See https://angular.io/api/router/RouterLinkActive#description
     */
    @Input()
    exact = false;

    _hidden = false;

    constructor(private el: ElementRef, private ref: ChangeDetectorRef) {}

    /** Disable visibility of component from view */
    hide(): void {
        this._hidden = true;
        this.ref.detectChanges();
    }

    /** Enable visibility of component from view */
    show(): void {
        this._hidden = false;
        this.ref.detectChanges();
    }

    _getWidth(): number {
        return this.el.nativeElement.scrollWidth;
    }
}
