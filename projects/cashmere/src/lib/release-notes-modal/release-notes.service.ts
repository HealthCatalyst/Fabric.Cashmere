import { HcModal } from '../modal/modal';
import { Injectable } from '@angular/core';
import { ModalOptions } from '../modal/modal-options';
import { ModalService } from '../modal';
import { ReleaseNotesModalComponent } from './release-notes-modal.component';
import { IReleaseNotesModalData, ReleaseNote, ReleaseNotesModalData } from './release-notes.model';

/** Inject this service and call `open()` to get a Cashmere-standard modal for release notes. */
@Injectable()
export class ReleaseNotesService {
    constructor(private modalService: ModalService) {}

    /** Open the release notes modal
     * @param data Configuration data for the modal. See ReleaseNotesModalData class for details.
     * @param modalOptions Options for the modal. See ModalOptions class for details.
     * @returns A reference to the opened modal.
    */
    open(data: IReleaseNotesModalData, modalOptions?: ModalOptions): HcModal<unknown> {
        const mergedModalOptions = Object.assign({ size: 'lg'}, modalOptions);
        const modalData = Object.assign(new ReleaseNotesModalData(), data);
        modalData.releaseNotes = modalData.releaseNotes.map(rn => new ReleaseNote(rn.version, rn.notesHTML, rn.releaseMonth, rn.releaseYear, rn.releaseDay));
        modalData.releaseNotes[0].isOpen = true; // open the first release notes by default
        mergedModalOptions.data = modalData;

        return this.modalService.open(ReleaseNotesModalComponent, mergedModalOptions);
    }
}
