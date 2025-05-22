import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { ActiveModal } from '../modal/active-modal';
import { ReleaseNotesModalData } from './release-notes.model';

@Component({
    selector: 'hc-release-notes-modal',
    templateUrl: './release-notes-modal.component.html',
    styleUrls: ['./release-notes-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class ReleaseNotesModalComponent implements OnInit {
    public _data: ReleaseNotesModalData;
    constructor(private activeModal: ActiveModal) {}


    _onReleaseOpened(releaseIndex: number, modalBody: ElementRef, accordion: ElementRef): void {
        this._data.releaseNotes.forEach((rn, index) => {
            rn.isOpen = index === releaseIndex;
        });
        // scroll open accordion to the top of the modal body
        setTimeout(() => {
            const top = accordion.nativeElement.offsetTop - modalBody.nativeElement.offsetTop;
            modalBody.nativeElement.scroll({ top: top, behavior: 'smooth' });
        }, 500);
    }

    ngOnInit(): void {
        this._data = this.activeModal.data;
    }

    /** Close the modal */
    close(): void {
        this.activeModal.close(true);
    }
}
