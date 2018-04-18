import { Component, HostBinding, Input, ElementRef, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'hc-navbar-link',
    templateUrl: './navbar-link.component.html'
})
export class NavbarLinkComponent {
    @HostBinding('class') hostClass = 'navbar-item';
    @Input() active?: boolean;
    @Input() uri: string;
    @Input() linkText: string;
    @Input() exact: boolean = false;
    hidden: boolean = false;

    constructor( private el: ElementRef, private ref: ChangeDetectorRef ) {
    }

    hide() { this.hidden = true; this.ref.detectChanges(); }
    show() { this.hidden = false; this.ref.detectChanges(); }

    getWidth() { return this.el.nativeElement.scrollWidth; }
}
