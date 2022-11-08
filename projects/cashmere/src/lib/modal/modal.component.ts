import {AfterContentInit, Component, ContentChild, HostBinding, Input, ViewEncapsulation} from '@angular/core';
import { parseBooleanAttribute } from '../util';
import { ModalBodyComponent } from './modal-body.component';
import { ModalFooterComponent } from './modal-footer.component';
import { ModalHeaderComponent } from './modal-header.component';

@Component({
    selector: 'hc-modal',
    template: `
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements AfterContentInit {
    @HostBinding('class.hc-modal-content')
    _modalWrapperClass = true;
    private _tight = false;

    /** If true, condense the default padding on all elements and reduce the title font size. *Defaults to `false`.*  */
    @Input()
    get tight(): boolean {
        return this._tight;
    }
    set tight(value: boolean) {
        this._tight = parseBooleanAttribute(value);
    }

    /* For resizable modals - dynamically set the min-height based on whether the modal has a header, footer, and/or body */
    @HostBinding('style.min-height')
    _modalMinHeight = 'auto';

    /** Checks for header/footer/body */
    @ContentChild(ModalHeaderComponent)
    _modalHeader: ModalHeaderComponent;

    @ContentChild(ModalBodyComponent)
    _modalBody: ModalBodyComponent;

    @ContentChild(ModalFooterComponent)
    _modalFooter: ModalFooterComponent;

    ngAfterContentInit(): void {
        let minHeight = 0;

        if ( this._modalHeader ) {
            minHeight += 55;
            this._modalMinHeight = minHeight + 'px';
        }
        if ( this._modalBody ) {
            minHeight += 120;
            this._modalMinHeight = minHeight + 'px';
        }
        if ( this._modalFooter ) {
            minHeight += 55;
            this._modalMinHeight = minHeight + 'px';
        }
    }
}
