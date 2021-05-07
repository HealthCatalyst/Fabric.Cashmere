import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActiveModal} from './active-modal';
import {ModalService} from './modal.service';
import {CommonModule} from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ModalFooterComponent} from './modal-footer.component';

describe('hc-modal-footer', () => {
    let footerComponent: ModalFooterComponent;
    let footerFixture: ComponentFixture<ModalFooterComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, BrowserAnimationsModule, BrowserModule, DragDropModule],
            declarations: [ModalFooterComponent],
            providers: [ActiveModal, ModalService]
        }).compileComponents();
    });

    beforeEach(() => {
        footerFixture = TestBed.createComponent(ModalFooterComponent);
        footerComponent = footerFixture.componentInstance;
        footerFixture.detectChanges();
    });

    it('should create an footer component', () => {
        expect(footerComponent).toBeTruthy();
    });
});
