import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {ComponentFixture, TestBed, fakeAsync, flush} from '@angular/core/testing';
import {dispatchEvent} from '../utils/dispatch-events';
import {ActiveModal} from './active-modal';
import {ModalService} from './modal.service';
import {CommonModule} from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ModalOverlayComponent} from './modal-overlay.component';

describe('hc-modal-overlay', () => {
    let overlayComponent: ModalOverlayComponent;
    let overlayFixture: ComponentFixture<ModalOverlayComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, BrowserAnimationsModule, BrowserModule, DragDropModule],
            declarations: [ModalOverlayComponent],
            providers: [ActiveModal, ModalService]
        }).compileComponents();
    });

    beforeEach(() => {
        overlayFixture = TestBed.createComponent(ModalOverlayComponent);
        overlayComponent = overlayFixture.componentInstance;
        overlayFixture.detectChanges();
    });

    it('should create an overlay component', () => {
        expect(overlayComponent).toBeTruthy();
    });

    describe('on calling _ignoreEscapeKey', () => {
        // Check the default value of the property
        it('should ensure that _ignoreEscapeKey is set to false by default', () => {
            expect(overlayComponent._ignoreEscapeKey).toBe(false);
        });

        // Convert the 'ignoreEscapeKey' property to true
        it('should ensure that _ignoreEscapeKey is set to false by default', () => {
            overlayComponent._ignoreEscapeKey = true;
            overlayFixture.detectChanges();
            expect(overlayComponent._ignoreEscapeKey).toBe(true);
        });

        xit('should ensure clicking the escape key will not exit the modal when _ignoreEscapeKey is set to false', fakeAsync(() => {
            const keyEvent = new KeyboardEvent('keydown', { key: 'Escape' });

            dispatchEvent(document.body, keyEvent);
            overlayFixture.detectChanges();
            flush();

            expect(document.querySelector('.hc-modal')).toBeNull();
        }));
    });
});
